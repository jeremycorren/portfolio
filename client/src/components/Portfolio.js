import React, { Component } from 'react';
import { Filler, TableHeader } from './Misc';
import Stock from './Stock';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

class Portfolio extends Component {
	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const { fetchStocks } = this.props;
		fetchStocks();
	}

	render() {
		const { stocks, removeStock } = this.props;
		if (stocks.length === 0) {
			return <Filler />;
		} else {
			return (
				<div className='row'>
					<div className='col-6'>
						<table className='table table-striped table-sm mt-3'>
							<TableHeader />
							<tbody>
								{stocks.map(stock =>
									<Stock 
										key={stock.symbol}
										{...stock}
										onBtnClick={removeStock}
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
	stocks: state.stocks
});

Portfolio = connect(
	mapStateToProps,
	actions
)(Portfolio)

export default Portfolio;