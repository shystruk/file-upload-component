/**
 * @rxdoc service
 * @name fileUploadService
 *
 * @description
 * fileUploadService helps to upload file from UI, get thumbnail or icon related to the type of file
 *
 */
(function () {
'use strict';

    angular.module('app').factory('fileUploadService', function ($q, FILE_UPLOAD) {

        return {
            uploadFile: uploadFile
        };


        /**
         * @param {File} file
         * @return {Promise}
         */
        function uploadFile(file) {
            let defer = $q.defer(),
                type = file.type ? file.type.split('/')[1] : '',
                returnFile = {
                    name: file.name,
                    type: file.type
                };

            _getContent(type, file).then(response => {
                returnFile.preview = _buildPreviewContent(response.preview);
                returnFile.thumbnail = response.preview ? '' : _getThumbnail(type);
                returnFile.content = response.content;

                defer.resolve(returnFile);
            });

            return defer.promise;
        }

        /**
         * @param {String} type
         * @param {File} file
         * @return {Promise}
         * @private
         */
        function _getContent(type, file) {
            let defer = $q.defer(),
                isPreview = true;

            if (FILE_UPLOAD.TYPES.JPG.indexOf(type) >= 0) {
                _readFile(file, isPreview).then(file => {
                    defer.resolve({preview: file});
                });
            } else {
                _readFile(file).then(content => {
                    defer.resolve({content});
                });
            }

            return defer.promise;
        }

        /**
         * @param {File} file
         * @param {Boolean=} isPreview
         * @return {Promise}
         * @private
         */
        function _readFile(file, isPreview) {
            let defer = $q.defer(),
                reader = new FileReader();

            reader.onload = function() {
                defer.resolve(reader.result);
            };

            if (isPreview) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsArrayBuffer(file);
            }

            return defer.promise;
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
            let resultType = _.find(_.keys(FILE_UPLOAD.TYPES), key => {
                return !!_isTypeOfFileExist(FILE_UPLOAD.TYPES[key], type);
            });

            return FILE_UPLOAD.ICONS[resultType] || FILE_UPLOAD.ICONS.DEFAULT;
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
    });
})();
