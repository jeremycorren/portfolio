import React, { Component } from 'react';

class Stock extends Component {
	render() {
		const { symbol, price, changePercent, onBtnClick } = this.props;
		return (
			<tr>
				<td>
					<button
						className='btn btn-danger'
						onClick={() => onBtnClick(symbol)}
					>
					</button>
				</td>
				<td>{symbol}</td>
				<td>{price}</td>
				<td>{formatPercent(changePercent)}</td>
			</tr>
		);
	}
}

const formatPercent = (percent) => 
	Number.parseFloat(percent * 100).toFixed(2);

export default Stock;