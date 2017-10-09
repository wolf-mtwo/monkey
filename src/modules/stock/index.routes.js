import express from 'express';
import { Stock } from '../../components/stock';

const stock = new Stock();

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
  app.use('/', router);
};
