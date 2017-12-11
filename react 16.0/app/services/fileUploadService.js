/**
 * @rxdoc service
 * @name fileUploadService
 *
 * @description
 * fileUploadService helps to upload file from UI, get thumbnail or icon related to the type of file
 *
 */

'use strict';

import { FILE_UPLOAD_TYPES, FILE_UPLOAD_ICONS } from './../constants/File_Upload';

/**
 * @param {File} file
 * @return {Promise}
 */
export function uploadFile(file) {
    let type = file.type ? file.type.split('/')[1] : '',
        returnFile = {
            name: file.name,
            type: file.type
        };

    return new Promise(resolve => {
        return _getContent(type, file).then(response => {
            returnFile.preview = _buildPreviewContent(response.preview);
            returnFile.thumbnail = response.preview ? '' : _getThumbnail(type);
            returnFile.content = response.content;

            resolve(returnFile);
        });
    });
}

/**
 * @param {String} type
 * @param {File} file
 * @return {Promise}
 * @private
 */
function _getContent(type, file) {
    let isPreview = true;

    if (FILE_UPLOAD_TYPES.JPG.indexOf(type) >= 0) {
        return new Promise(resolve => {
            return _readFile(file, isPreview).then(file => {
                resolve({preview: file});
            });
        });
    }

    return new Promise(resolve => {
        return _readFile(file).then(content => {
            resolve({content});
        });
    });
}

/**
 * @param {File} file
 * @param {Boolean=} isPreview
 * @return {Promise}
 * @private
 */
function _readFile(file, isPreview) {
    let reader = new FileReader();

    return new Promise(resolve => {
        reader.onload = function() {
           resolve(reader.result);
        };

        if (isPreview) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });
}

/**
 * @param {String} content
 * @returns {String}
 * @private
 */
function _buildPreviewContent(content) {
    return content ? {backgroundImage: content} : '';
}

/**
 * @param {String} type
 * @returns {String} - thumbnail icon class
 * @private
 */
function _getThumbnail(type) {
    let resultType = _.find(_.keys(FILE_UPLOAD_TYPES), key => {
        return !!_isTypeOfFileExist(FILE_UPLOAD_TYPES[key], type);
    });

    return FILE_UPLOAD_ICONS[resultType] || FILE_UPLOAD_ICONS.DEFAULT;
}

/**
 * @param {String} type
 * @param {Array} fileTypes
 * @returns {String|undefined}
 * @private
 */
function _isTypeOfFileExist(fileTypes, type) {
    return _.find(fileTypes, file => {
        return type.indexOf(file) >= 0;
    });
}
