import React, { Component } from 'react';
import Stock from './Stock';
import { connect } from 'react-redux';
import { removeStock } from '../actions/index.js';

class Portfolio extends Component {
	render() {
		const { stocks, onBtnClick } = this.props;
		if (stocks.length === 0) {
			return <div></div>;
		} else {
			return (
				<div className='row'>
					<div className='col-6'>
						<table className='table table-striped table-sm mt-3'>
							<thead>
								<tr>
									<th scope='col'></th>
									<th scope='col'>Symbol</th>
									<th scope='col'>Price</th>
									<th scope='col'>Change %</th>
								</tr>
							</thead>
							<tbody>
								{stocks.map(stock =>
									<Stock 
										key={stock.symbol}
										{...stock}
										onBtnClick={onBtnClick}
									/>
								)}
							</tbody>
						</table>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	stocks: state
});

const mapDispatchToProps = (dispatch) => ({
	onBtnClick(symbol) {
		dispatch(removeStock(symbol));
	}
});

Portfolio = connect(
	mapStateToProps,
	mapDispatchToProps
)(Portfolio)

export default Portfolio;