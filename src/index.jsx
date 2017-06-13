import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { dom } from './config';

import 'classlist-polyfill';
import 'babel-polyfill';
import './styles';

ReactDOM.render(
	<App />,
	document.getElementById(dom.appId)
);
