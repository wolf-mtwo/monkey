import request from 'superagent';
import cheerio from 'cheerio';
import symbol from './symbol';

export class Monitor {

  constructor() {
    this.symbols = symbol.list;
    this.data = [];
  }

  start() {
    this.show_header();
    this.run();
  }

  run() {
    let symbol = this.symbols.shift();
    if (!symbol) {
      this.show_report();
      return;
    }
    return this.loadBulk(symbol)
    .then((res) => {
      return this.collector(res.text);
    })
    .then((data) => {
      this.caculate(symbol, data[1], data[0]);
      this.run();
    })
    .catch((err) => {
      console.log(err.message);
      this.run();
    });
  }

  caculate(symbol, enterprise, market) {
    let ent = enterprise.value.substring(0, enterprise.value.length - 1);
    let mark = market.value.substring(0, market.value.length - 1);
    ent = parseFloat(ent);
    mark = parseFloat(mark);
    //ent 100
    //mark x
    let porcent = ((mark * 100) / ent);
    let url = this.get_symbol(symbol);
    let info = {
      symbol,
      ent,
      mark,
      porcent,
      url
    };
    this.data.push(info);
    this.print(info);
  }

  PadLeft(value, length) {
    return (value.toString().length < length) ? this.PadLeft(' ' + value, length) :
    value;
  }

  show_report() {
    this.show_header();
    this.data.sort((a, b) => {
      if (b.porcent > a.porcent) {
        return b.porcent;
      }
    });
    this.data.forEach((info) => {
     this.print(info);
    });
  }

  show_header() {
    console.log(`${this.PadLeft('SYMBOL', 6)} ${this.PadLeft('INTERPRICE', 10)} ${this.PadLeft('MARKET', 10)} ${this.PadLeft('%', 10)}`);
  }

  print(info) {
    console.log(`${this.PadLeft(info.symbol, 6)} ${this.PadLeft(info.ent, 10)} ${this.PadLeft(info.mark, 10)} ${this.PadLeft(info.porcent.toFixed(2), 10)}   ${info.url}`);
  }

  loadBulk(symbol) {
    return request
    .get(this.get_symbol(symbol))
    .send();
  }

  get_symbol(symbol) {
    return `https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`;
  }

  collector(html) {
    const $ = cheerio.load(html);
    const tables = $('.table-qsp-stats');
    var items = [];
    $('.table-qsp-stats').each(function(i, elem) {
      $(this).find('tr').each(function(i, elem) {
        var item = {
          key: null,
          value: null
        };
        $(this).find('td').each(function(i, elem) {
          if (!item.key) {
            item.key = $(this).text();
          } else {
            item.value = $(this).text();
          }
        });
        items.push(item);
      });
    });
    return items;
  }
}
