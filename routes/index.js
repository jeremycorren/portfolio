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
	const { quote, company, financials, chart } = req.body;
	const report = financials.financials[0];

	let isDuplicate = false;
	database.forEach(s => {
		if (s.companyName === company.companyName) {
			isDuplicate = true;
		}
	});

	const chartData = chart.map(day => ({ 
		date: day.date,
		price: day.close
	}));

	if (!isDuplicate) {
		database.push({
			symbol: quote.symbol,
			companyName: quote.companyName,
			industry: company.industry,
			website: company.website,
			totalRevenue: report.totalRevenue,
			netIncome: report.netIncome,
			price: quote.latestPrice,
			changePercent: quote.changePercent,
			marketCap: quote.marketCap,
			peRatio: quote.peRatio,
			description: company.description,
			chart: chartData
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
