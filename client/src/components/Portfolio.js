import React, { Component } from 'react';
import { Filler, TableHeader } from './Misc';
import Stock from './Stock';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as Message from './Messages';
import { getStocks, getIsFetching, getErrorMessage } from '../reducers/index';

class Portfolio extends Component {
	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const { fetchStocks } = this.props;
		fetchStocks();
	}

	render() {
		const { stocks, isFetching, errorMessage, removeStock } = this.props;

		if (isFetching && !stocks.length) {
			return <Filler message={Message.LOADING} />;
		} else if (!stocks.length && !errorMessage) { 
			return <Filler color={'grey'} message={Message.EMPTY}/>;
		} else if (errorMessage) {
			return <Filler color={'#d9534f'} message={Message.ERR} />;
		} else {
			return (
				<table className='table table-hover table-sm mt-3'>
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
			);
		}
	}
}

const mapStateToProps = (state) => ({
	stocks: getStocks(state),
	isFetching: getIsFetching(state),
	errorMessage: getErrorMessage(state)
});

Portfolio = connect(
	mapStateToProps,
	actions
)(Portfolio)

export default Portfolio;