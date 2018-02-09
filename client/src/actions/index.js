const receiveStocks = (stocks) => ({
	type: 'RECEIVE_STOCKS',
	stocks
});

export const fetchStocks = () => {
	return (dispatch) => {
		return fetch('/api')
			.then(response => response.json())
			.catch(err => alert('Server error'))
			.then(stocks => dispatch(receiveStocks(stocks)));
	};
};

export const addStock = (data) => {
	return (dispatch) => {
		return fetch('/api', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify(data)
		}).then(response => response.json())
			.then(stocks => {
				dispatch({
					type: 'ADD_STOCK',
					stocks
				})
			});
	};
};

export const removeStock = (symbol) => {
	return (dispatch) => {
		return fetch('/api/delete', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify({ symbol })
		}).then(response => response.json())
			.then(stocks => {
				dispatch({
					type: 'DELETE_STOCK',
					stocks
				})
			});
	};
};