import React, { Component } from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { getDetail, getStocks } from '../reducers/index';
import { Line } from 'react-chartjs-2';

class Detail extends Component {
	render() {
		const { detail, stocks } = this.props;
		if (detail != null) {
			const { chart } = detail;
			const chartData = {
				labels: chart.map(dataPoint => formatDate(dataPoint.date)),
				datasets: [{
					label: ['Share Price (1m)'],
					backgroundColor: 'rgba(75,192,192,0.4)',
      		borderColor: 'rgba(75,192,192,1)',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
					data: chart.map(dataPoint => dataPoint.price)
				}]
			};

			return (
				<div className='card'>
					<div className='card-body'>
						<h4 className='card-title'>
							<a href={detail.website} className='card-link'>{detail.companyName}</a>
						</h4>
						<h6 className='subtitle mb-2 text-muted'>{detail.industry}</h6>
						<ul className='card-text'>
							<li>
								<strong>Market Capitalization: </strong> 
								{formatCurrency(detail.marketCap)}
							</li>
							<li>
								<strong>Total Revenue: </strong> 
								{formatCurrency(detail.totalRevenue)}
							</li>
							<li>
								<strong>Net Income: </strong> 
								{formatCurrency(detail.netIncome)}
							</li>
							<li>
								<strong>Price-to-Earnings Ratio: </strong> 
								{detail.peRatio}
							</li>
						</ul>
						<p className='card-text'>{detail.description}</p>
						<hr />
						<Line data={chartData} />
					</div>
				</div>
			);
		} else if (stocks.length > 0) {
			return <div>Select a security to view its detail.</div>;
		} else {
			return null;
		}
	}
	
}

const mapStateToProps = (state) => ({
	detail: getDetail(state),
	stocks: getStocks(state)
});

Detail = connect(
	mapStateToProps,
	actions
)(Detail)

export default Detail;

const formatCurrency = (num) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 3
	}).format(num).split('.')[0];
};

const formatDate = (date) => {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
};