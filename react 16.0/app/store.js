'use strict';

import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger({
    colors: {}
});

let initialState = {
    uploadFiles: {
        files: []
    }
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk, promise, loggerMiddleware));
