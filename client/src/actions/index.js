const requestStocks = {
	type: 'REQUEST_STOCKS'
};

const requestFailure = (error) => ({
	type: 'REQUEST_FAILURE',
	error: error.toString()
});

export const fetchStocks = () => {
	return (dispatch) => {
		dispatch(requestStocks);
		return fetch('/api/get')
			.then(response => response.json())
			.then(stocks => dispatch({
				type: 'FETCH_STOCKS',
				stocks
			}))
			.catch(error => dispatch(requestFailure(error)))
	};
};

export const addStock = (data) => {
	return (dispatch) => {
		dispatch(requestStocks);
		return fetch('/api/add', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify(data)
		}).then(response => response.json())
			.then(stocks => dispatch({
				type: 'ADD_STOCK',
				stocks
			}))
			.catch(error => dispatch(requestFailure(error)))
	};
};

export const removeStock = (symbol) => {
	return (dispatch) => {
		dispatch(requestStocks);
		return fetch('/api/delete', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify({ symbol })
		}).then(response => response.json())
			.then(stocks => {
				if (stocks.length === 0) {
					dispatch({
						type: 'CLEAR_DETAIL'
					});
				}

				dispatch({
					type: 'CHANGE_DETAIL',
					stocks
				});

				dispatch({
					type: 'DELETE_STOCK',
					stocks
				});
			})
			.catch(error => dispatch(requestFailure(error)))
	};
};

export const selectStock = (stock) => {
	return (dispatch) => {
		dispatch({
			type: 'SELECT_STOCK',
			stock
		});
	};
};