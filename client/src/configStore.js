import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers/index.js';

const configStore = () => {
	const store = createStore(
		reducer,
		applyMiddleware(logger)
	);
	return store;
};

export default configStore;