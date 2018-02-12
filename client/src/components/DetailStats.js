import React from 'react';


const DetailStats = ({ detail }) => {
	const stats = [];

	let marketCap;
	if (detail.marketCap) {
		marketCap = (
			<li key={detail.marketCap}>
				<strong>Market Capitalization: </strong> 
				{formatCurrency(detail.marketCap)}
			</li>
		);
		stats.push(marketCap);
	}

	let totalRevenue;
	if (detail.totalRevenue) {
		totalRevenue = (
			<li key={detail.totalRevenue}>
				<strong>Total Revenue: </strong> 
				{formatCurrency(detail.totalRevenue)}
			</li>
		);
		stats.push(totalRevenue);
	}

	let netIncome;
	if (detail.netIncome) {
		netIncome = (
			<li key={detail.netIncome}>
				<strong>Net Income: </strong> 
				{formatCurrency(detail.netIncome)}
			</li>
		);
		stats.push(netIncome);
	}

	let peRatio;
	if (detail.peRatio) {
		peRatio = (
			<li key={detail.peRatio}>
				<strong>Price-to-Earnings Ratio: </strong> 
				{detail.peRatio}
			</li>
		);
		stats.push(peRatio);
	}

	return (
		<ul className='card-text'>
			{stats}
		</ul>
	);
};

export default DetailStats;

const formatCurrency = (num) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 3
	}).format(num).split('.')[0];
};