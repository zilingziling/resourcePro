import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'core-js/features/array/from'; // <- at the top of your entry point
import 'core-js/features/array/flat'; // <- at the top of your entry point
import 'core-js/features/set';        // <- at the top of your entry point
import 'core-js/features/promise';    // <- at the top of your entry point
import 'core-js/features/symbol';    // <- at the top of your entry point
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import 'babel-polyfill';
import './index.css';
import App from './layout/App';
import 'core-js';
import promise from 'es6-promise';
import History from './utils/history';
import * as Utils from './utils/utils';
import * as serviceWorker from './serviceWorker';
import './components/FlashMultiscreen/FlashEvent';

import './setupProxy';
window._guider = {
	History,Utils
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
