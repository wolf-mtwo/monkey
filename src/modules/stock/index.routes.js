import express from 'express';
import { Stock } from '../../components/stock';
import { Premarket } from '../../components/premarket';

const stock = new Stock();
const premarket = new Premarket();

/* GET home page. */
module.exports = (app) => {
  let router = express.Router();
  router.get('/stock', (req, res, next) => {
    stock.getInformation()
    .then((data) => {
      res.json(data.body);
    })
    .catch((err) => {
      next(err);
    });
  });

  router.get('/oportunidades', (req, res, next) => {
    stock.findOpportunities()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
  });

  router.get('/symbol/:symbol/premarket', (req, res, next) => {
    if (!req.params) {
        throw new Error('symbol is undefined');
    }
    const symbol = req.params.symbol;
    premarket.get(symbol)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
  });
  app.use('/', router);
};
