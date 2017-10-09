import request from 'superagent';

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
}
