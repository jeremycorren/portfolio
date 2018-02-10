import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { getDetail, getStocks } from '../reducers/index';

let Detail = ({ detail, stocks }) => {
	if (detail != null) {
		return (
			<div className='card'>
				<div className='card-body'>
					<h4 className='card-title'>
						<a href={detail.website} className='card-link'>{detail.companyName}</a>
					</h4>
					<h6 className='subtitle mb-2 text-muted'>{detail.industry}</h6>
					<ul className='card-text'>
						<li>
							<strong>Primary Exchange: </strong>
							{detail.primaryExchange}
						</li>
						<li>
							<strong>Market Capitalization: </strong> 
							{formatCurrency(detail.marketCap)}
						</li>
						<li>
							<strong>Price-to-Earnings Ratio: </strong> 
							{detail.peRatio}
						</li>
					</ul>
					<p className='card-text'>{detail.description}</p>
				</div>
			</div>
		);
	} else if (stocks.length > 0) {
		return <div>Select a security to view its detail.</div>;
	} else {
		return null;
	}
};

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
		currency: 'USD'
	}).format(num);
}