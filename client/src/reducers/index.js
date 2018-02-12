import { combineReducers } from 'redux';

const stocks = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_STOCKS':
			const nextState = [...state];
			action.stocks.forEach(stock => {
				nextState.push(stock);
			});
			return nextState;
		case 'ADD_STOCK':
			return action.stocks;
		case 'DELETE_STOCK':
			return action.stocks;
		default:
			return state;
	}
};

const detail = (state = null, action) => {
	switch (action.type) {
		case 'SELECT_STOCK':
			return action.stock;
		case 'UPDATE_DETAIL':
			if (state != null) {
				const currentDetail = state;
				const symbols = action.stocks.map(s => s.symbol);
				if (!symbols.includes(currentDetail.symbol)) {
					return null;
				}
			}
			return state;
		case 'CLEAR_DETAIL': console.log('reducer got it')
			return null;
		default:
			return state;
	}
};

const symbolMap = (state = [], action) => {
	switch (action.type) {
		case 'REGISTER_SYMBOLS':
			return action.symbolMap;
		default:
			return state;
	}
};

const isFetching = (state = false, action) => {
	switch (action.type) {
		case 'REQUEST_STOCKS':
			return true;
		case 'REQUEST_FAILURE':
		case 'FETCH_STOCKS':
		case 'ADD_STOCK':
		case 'DELETE_STOCK':
			return false;
		default:
			return state;
	}
};

const errorMessage = (state = null, action) => {
	switch (action.type) {
		case 'REQUEST_FAILURE':
			return action.error;
		case 'REQUEST_STOCKS':
		case 'FETCH_STOCKS':
		case 'ADD_STOCK':
		case 'DELETE_STOCK':
			return null;
		default:
			return state;
	}
};

const reducer = combineReducers({
	stocks,
	detail,
	symbolMap,
	isFetching,
	errorMessage
});

export const getStocks = (state) => state.stocks;
export const getDetail = (state) => state.detail;
export const getSymbolMap = (state) => state.symbolMap;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;

export default reducer;