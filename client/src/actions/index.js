const requestStocks = () => ({
	type: 'REQUEST_STOCKS'
});

const requestFailure = (error) => ({
	type: 'REQUEST_FAILURE',
	error: error.toString()
});

const registerSymbols = (symbolMap) => ({
	type: 'REGISTER_SYMBOLS',
	symbolMap
});

export const fetchSymbols = () => {
	return (dispatch) => {
		fetch('https://api.iextrading.com/1.0/ref-data/symbols')
			.then(res => res.json())
			.then(data => {
				const symbolMap = {};
				data.filter(stock => stock.isEnabled)
						.forEach(stock => symbolMap[stock.name] = stock.symbol);
				dispatch(registerSymbols(symbolMap));
			});
	}
};

export const findStock = (input) => {
	return (dispatch) => {
		fetch(`https://api.iextrading.com/1.0/stock/${input}/batch?types=quote,company,financials,chart`)
			.then(res => res.json())
			.then(data => {
				dispatch(addStock(data));
			});
	}
}

const addStock = (data) => {
	return (dispatch) => {
		dispatch(requestStocks());
		return fetch('/api/add', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify(data)
		}).then(response => response.json())
			.then(data => {
				const { stocks } = data;
				dispatch({
					type: 'ADD_STOCK',
					stocks
				});
			})
			.catch(error => dispatch(requestFailure(error)))
	};
};

export const fetchStocks = () => {
	return (dispatch) => {
		dispatch(requestStocks());
		return fetch('/api/get')
			.then(response => response.json())
			.then(stocks => dispatch({
				type: 'FETCH_STOCKS',
				stocks
			}))
			.catch(error => dispatch(requestFailure(error)))
	};
};

export const removeStock = (symbol) => {
	return (dispatch) => {
		dispatch(requestStocks());
		return fetch('/api/delete', {
			method: 'post',
			headers: new Headers({
				'content-type': 'application/json'
			}),
			body: JSON.stringify({ symbol })
		}).then(response => response.json())
			.then(stocks => {
				dispatch({
					type: 'UPDATE_DETAIL',
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

export const clearDetail = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_DETAIL'
		});
	};
};