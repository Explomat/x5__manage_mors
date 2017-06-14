import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(history, initialState) {
	const enhancer = compose(
		applyMiddleware(thunk, createLogger(), routerMiddleware(history)),
		DevTools.instrument()
	);
	const store = createStore(rootReducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default)
		);
	}

	return store;
}
