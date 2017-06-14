import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
//import { push } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store';
import { dom } from './config';

import 'classlist-polyfill';
import 'console-polyfill';
import 'babel-polyfill';
import './styles';

const history = createBrowserHistory({
	basename: '/view_doc.html?mode=mode'
});
const store = configureStore(history);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

render(
	<Root store={store} history={history} />,
	document.getElementById(dom.appId)
);
