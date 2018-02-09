const stocks = (state = [], action) => {
	switch (action.type) {
		case 'ADD_STOCK':
			const { type, ...rest } = action;
			return [...state, rest];
		case 'REMOVE_STOCK':
			return [...state].filter(stock => {
				return stock.symbol !== action.symbol;
			});
		default:
			return state;
	}
};

export default stocks;