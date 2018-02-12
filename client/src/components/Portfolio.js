import React, { Component } from 'react';
import { Filler, TableHeader } from './Misc';
import Stock from './Stock';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as Message from './Messages';
import * as Selector from '../reducers/index';

class Portfolio extends Component {
	componentDidMount() {		
		this.register();
		this.fetchData();
	}

	register() {
		const { symbolMap, fetchSymbols } = this.props;
		if (symbolMap.length === 0) {
			fetchSymbols();
		}
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
	stocks: Selector.getStocks(state),
	isFetching: Selector.getIsFetching(state),
	errorMessage: Selector.getErrorMessage(state),
	symbolMap: Selector.getSymbolMap(state)
});

Portfolio = connect(
	mapStateToProps,
	actions
)(Portfolio)

export default Portfolio;