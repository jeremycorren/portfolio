const express = require('express');
const bodyParser = require('body-parser');

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

	const chartData = chart.map(day => ({ 
		date: day.date,
		price: day.close
	}));

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
		chart: chartData
	});

	res.json({ stocks: database });
});

router.post('/delete', function(req, res, next) {
	const { symbol } = req.body;
	database = database.filter(stock => {
		return stock.symbol !== symbol;
	});
	res.json(database);
});

module.exports = router;
