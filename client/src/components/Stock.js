import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectStock } from '../actions/index';

class Stock extends Component {
	render() {
		const { dispatch, onBtnClick, ...stock } = this.props;
		return (
			<tr onClick={() => dispatch(selectStock(stock))}>
				<td style={{textAlign: 'center'}}>
					<button
						className='btn btn-secondary btn-sm'
						style={{
							padding: '.10rem',
    					fontSize: '.575rem',
    					lineHeight: '.5',
    					borderRadius: '.2rem'
						}}
						onClick={(event) => { 
							event.stopPropagation();
							onBtnClick(stock.symbol);
						}
					}>
						<span 
							className='oi oi-minus' 
							aria-hidden='true'></span>
					</button>
				</td>
				<td>{stock.symbol}</td>
				<td>{stock.price}</td>
				<td className={
					stock.changePercent > 0
						? 'text-success'
						: 'text-danger'
				}>
					{formatPercent(stock.changePercent)}
				</td>
			</tr>
		);
	}
}

Stock = connect()(Stock)

const formatPercent = (percent) => 
	Number.parseFloat(percent * 100).toFixed(2);

export default Stock;