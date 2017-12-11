'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import store from './store';

const history = createBrowserHistory();

import Home_Page from './pages/Home/Home';

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home_Page}/>
        </Router>
    </Provider>,

    document.getElementById('app')
);
