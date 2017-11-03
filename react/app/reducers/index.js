'use strict';

import { combineReducers } from 'redux';

import filesReducer from './files';

export default combineReducers({
    uploadFiles: filesReducer
});
