'use strict';

import { ADD_FILE, REMOVE_FILE } from '../actions/files';

const initialState = {
    files: []
};

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default function filesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FILE:
            return {
                ...state,
                files: [
                    ...state.files,
                    action.file
                ]
            };
        case REMOVE_FILE:
            return {
                ...state,
                files: [
                    ...state.files.slice(0, action.index),
                    ...state.files.slice(action.index + 1)
                ]
            };
        default:
            return state;
    }
}
