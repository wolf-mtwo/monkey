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
    .get(`https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`)
    .send();
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
