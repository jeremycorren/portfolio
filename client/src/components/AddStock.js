import React from 'react';
import { connect } from 'react-redux';
import { addStock } from '../actions/index.js';

let AddStock = ({ dispatch }) => {
	let input;
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				if (!input.value.trim()) {
					return;
				}
				fetch(`https://api.iextrading.com/1.0/stock/${input.value}/quote`)
  				.then(res => res.json())
  				.then(data => {
  					dispatch(addStock(data));
  				});
				input.value = '';
			}
		}>
			<input
				className='form-control'
				placeholder='Search securities...'
				ref={node => input = node}
				style={{width: '170px'}}
			/>
			<button className='btn btn-info mt-2'>
				Add to Portfolio
			</button>
		</form>
	);
};

AddStock = connect()(AddStock);

export default AddStock;