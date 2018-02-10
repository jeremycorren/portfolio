import React from 'react';
import { connect } from 'react-redux';
import { findStock } from '../actions/index.js';
import { getSymbols } from '../reducers/index';
import * as Message from './Messages';

let AddStock = ({ dispatch, symbols }) => {
	let input;
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
					if (!input.value.trim()) {
						return;
					}

					const cleanInput = input.value.toUpperCase();
					if (symbols.includes(cleanInput)) {
						dispatch(findStock(input.value));
					} else {
						alert('Enter a valid symbol.')
					}
					input.value = '';
				}
			}>
				<input
					className='form-control mr-2'
					placeholder='Add a security...'
					ref={node => input = node}
					style={{
						width: '170px',
						display: 'inline-block'
					}}/>
				<button
					title='Add'
					className='btn btn-info btn-sm'
				>
					<span 
						className='oi oi-plus' 
						aria-hidden='true'>
					</span>
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	symbols: getSymbols(state)
});

AddStock = connect(
	mapStateToProps
)(AddStock);

export default AddStock;