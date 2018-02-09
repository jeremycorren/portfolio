const express = require('express');
const bodyParser = require('body-parser');
const id = require('uuid/v4');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

let database = [];

router.get('/', function(req, res, next) {
  res.json(database);
});

router.post('/', function(req, res, next) {
	const stock = req.body;
	database.push({
		symbol: stock.symbol,
		price: stock.latestPrice,
		changePercent: stock.changePercent,
		marketCap: stock.marketCap,
		peRatio: stock.peRatio
	});
	res.json(database);
});

router.post('/delete', function(req, res, next) {
	const { symbol } = req.body;
	database = database.filter(stock => {
		return stock.symbol !== symbol;
	});
	res.json(database);
});

module.exports = router;
