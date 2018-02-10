import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectStock } from '../actions/index';

class Stock extends Component {
	render() {
		const { dispatch, onBtnClick, ...stock } = this.props;
		return (
			<tr onClick={() => dispatch(selectStock(stock))}>
				<td>
					<button
						className='btn btn-danger'
						onClick={(event) => { 
							event.stopPropagation();
							onBtnClick(stock.symbol);
						}
					}>
					</button>
				</td>
				<td>{stock.symbol}</td>
				<td>{stock.price}</td>
				<td>{formatPercent(stock.changePercent)}</td>
			</tr>
		);
	}
}

Stock = connect()(Stock)

const formatPercent = (percent) => 
	Number.parseFloat(percent * 100).toFixed(2);

export default Stock;