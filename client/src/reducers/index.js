import { combineReducers } from 'redux';

let stocks = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_STOCKS':
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

stocks = combineReducers({
	stocks
});

export default stocks;