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
            uploadFile: _uploadFile
        };


        /**
         * @param {Object} file
         * @return {Promise}
         * @private
         */
        function _uploadFile(file) {
            let defer = $q.defer(),
                type = file.type ? file.type.split('/')[1] : '',
                returnFile = {
                    name: file.name,
                    type: file.type
                };

            _getPreview(type, file).then(preview => {
                returnFile.preview = _buildPreviewContent(preview);
                returnFile.thumbnail = preview ? '' : _getThumbnail(type);

                defer.resolve(returnFile);
            });

            return defer.promise;
        }

        /**
         * @param {String} type
         * @param {Object} file
         * @return {Promise}
         * @private
         */
        function _getPreview(type, file) {
            let defer = $q.defer(),
                isPreview = true;

            if (FILE_UPLOAD.TYPES.JPG.indexOf(type) >= 0) {
                _readFile(file, isPreview).then(file => {
                    defer.resolve(file);
                });
            } else {
                defer.resolve();
            }

            return defer.promise;
        }

        /**
         * @param {Object} file
         * @param {Boolean} isPreview
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
