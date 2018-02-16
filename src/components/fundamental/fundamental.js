import request from 'superagent';
import cheerio from 'cheerio';

export class Fundamental {

  get(symbol) {
    return this.loadBulk(symbol)
    .then((res) => {
      return this.collector(res.text);
    });
  }

  loadBulk(symbol) {
    return request
    // .get(`http://m.nasdaq.com/symbol/${symbol}/premarket`)
    .get(`https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`)
    .send();
  }

  collector(html) {
    const $ = cheerio.load(html);
    const container = $('.section .item .table-table');
    const values = {
      name: $(container).find($('.table-cell h1')).text(),
      sale: $(container).find($('.last-sale')).text(),
      net: '0',
      pct: '0'
    };
    if ($(container).find($('.green-arrow')).length) {
      values.net = '+' + $(container).find($('.net-change')).text();
      values.pct = '+' + $(container).find($('.pct-change')).text();
    }
    if ($(container).find($('.red-arrow')).length) {
      values.net = '-' + $(container).find($('.net-change')).text();
      values.pct = '-' + $(container).find($('.pct-change')).text();
    }
    return values;
  }
}
