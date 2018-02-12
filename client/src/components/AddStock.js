import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findStock } from '../actions/index.js';
import { getSymbolMap, getStocks } from '../reducers/index';
import * as Message from './Messages';
import { Typeahead } from 'react-bootstrap-typeahead';

class AddStock extends Component {
	constructor(props) {
		super(props);
		this.state = { selected: null };
		this.typeahead = null;
		this.behaviors = { 
			selectHintOnEnter: true,
			minLength: 1,
			maxResults: 10
		};
	}

	render() {
		const { dispatch, symbolMap, stocks } = this.props;
		return (
			<div>
				<h5 
					className='display-4 mb-3'
					style={{fontSize: '2rem'}}
				>
					Build
				</h5>
				<p
					className='lead'
					style={{fontSize: '1.15rem', width: '400px'}}>
					{Message.BUILD_INFO}
				</p>
				<form
					onSubmit={(event) => {
						event.preventDefault();

						const input = this.state.selected;
						if (input == null || (input && !input.length > 0)) {
							alert(Message.VALID_NAME);
							return;
						}
						const inputSymbols = input.map(name => symbolMap[name]);

						const duplicates = [];
						stocks.forEach(stock => {
							inputSymbols.forEach(symbol => {
								if (symbol === stock.symbol) {
									duplicates.push(symbol);
								}
							})
						});

						if (duplicates.length > 0) {
							alert(duplicates + ' are already in your portfolio.');
							this.typeahead.getInstance().clear();
							return;
						}

						inputSymbols.forEach(symbol => {
							dispatch(findStock(symbol));
						});
						
						this.typeahead.getInstance().clear();
					}
				}>
					<div className='mr-2' style={{
						width: '350px',
						display: 'inline-block'
					}}>
						<Typeahead
							multiple
							placeholder={Message.SEARCH}
							onChange={(selected) => this.setState({ selected })}
							options={Object.keys(symbolMap)}
							{...this.behaviors}
							ref={(ref) => this.typeahead = ref}
						/>
					</div>
					<button
						title='Add'
						className='btn btn-info btn-sm mb-1'
					>
						<span 
							className='oi oi-plus' 
							aria-hidden='true'>
						</span>
					</button>
				</form>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	symbolMap: getSymbolMap(state),
	stocks: getStocks(state)
});

AddStock = connect(
	mapStateToProps
)(AddStock);

export default AddStock;