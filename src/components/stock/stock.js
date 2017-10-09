import request from 'superagent';
import config from './config';
import symbol from './symbol';

export class Stock {

  getInformation() {
    const query = {
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'MSFT',
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
      });
    }))
    .then((list) => {
      return list.map((item) => {
        const title = item['Meta Data'];
        const generator = item['Technical Analysis: RSI'];
        const data = generator[Object.keys(generator)[0]];
        return {
          symbol: title['1: Symbol'],
          rsi: data.RSI
        };
      });
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
    .timeout(60000)
    .query(query)
    .send();
  }
}
