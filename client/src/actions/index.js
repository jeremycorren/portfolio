export const addStock = (data) => ({
	type: 'ADD_STOCK',
	symbol: data.symbol,
	price: data.latestPrice,
	changePercent: data.changePercent,
	marketCap: data.marketCap,
	peRatio: data.peRatio
});

export const removeStock = (symbol) => ({
	type: 'REMOVE_STOCK',
	symbol
});