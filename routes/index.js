const express = require('express');
const bodyParser = require('body-parser');
const id = require('uuid/v4');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

let database = [];

router.get('/get', function(req, res, next) {
  res.json(database);
});

router.post('/add', function(req, res, next) {
	const { quote, company } = req.body;
	
	let isDuplicate = false;
	database.forEach(s => {
		if (s.companyName === company.companyName) {
			isDuplicate = true;
		}
	});

	if (!isDuplicate) {
		database.push({
			symbol: quote.symbol,
			companyName: quote.companyName,
			industry: company.industry,
			website: company.website,
			primaryExchange: quote.primaryExchange,
			price: quote.latestPrice,
			changePercent: quote.changePercent,
			marketCap: quote.marketCap,
			peRatio: quote.peRatio,
			description: company.description,
		});
	}
	res.json({ stocks: database, isDuplicate });
});

router.post('/delete', function(req, res, next) {
	const { symbol } = req.body;
	database = database.filter(stock => {
		return stock.symbol !== symbol;
	});
	res.json(database);
});

module.exports = router;
