import request from 'superagent';
import _ from 'lodash';
import config from './config';
import symbol from './symbol';

export class Stock {

  getInformation() {
    const query = {
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'AMZN',
      apikey: 'Q71DBI2RESC3LMBM',
      interval: '60min'
    };
    return request
    .get('https://www.alphavantage.co/query')
    .query(query)
    .send();
  }

  findOpportunities() {
    return Promise.all(symbol.list.map((item) => {
      return this.findBySymbol(item)
      .then((data) => {
        return data.body;
      })
      .catch((err) => {
          console.log(err.message);
      });
    }))
    .then((items) => {
      return items.map((item) => {
        try {
          const title = item['Meta Data'];
          const generator = item['Technical Analysis: RSI'];
          const data = generator[Object.keys(generator)[0]];
          return {
            symbol: title['1: Symbol'],
            rsi: data.RSI
          };
        } catch (e) {
          return {
            symbol: 'no funca',
            rsi: 50,
            item
          }
        }
      });
    })
    .then((items) => {
        return _.sortBy(items, ['rsi']);
    });
  }

  findBySymbol(symbol) {
    const query = {
      function: 'RSI',
      symbol,
      apikey: config.API_KEY,
      interval: '60min',
      time_period: 14,
      series_type: 'close'
    };
    return request
    .get('https://www.alphavantage.co/query')
    .timeout({response: 30000})
    .query(query)
    .send();
  }
}
