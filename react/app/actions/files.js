'use strict';

export const ADD_FILE = 'ADD_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';

/**
 * @param {Object} file
 * @return {Object}
 */
export function addFile(file) {
    return {
        type: ADD_FILE,
        file
    }
}

/**
 * @param {Number} index
 * @return {Object}
 */
export function removeFile(index) {
    return {
        type: REMOVE_FILE,
        index
    }
}
