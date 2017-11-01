(function () {
'use strict';

    angular.module('app').directive('fileUpload', function ($q, fileUploadService) {

        return {
            restrict: 'E',
            templateUrl: 'components/file-upload/file-upload.directive.html',

            scope: {},

            controllerAs: 'fileUploadCtrl',

            require: 'fileUpload',

            link: function ($scope, $element, $attrs, $controller) {
                $scope.openUploadDialog = _openUploadDialog;

                setTimeout(() => {
                    angular.element($element.find('input')[0]).bind('change', function (event) {
                        let self = this;

                        $controller.pushFiles(event).then(() => {
                            // allow to upload the same file twice in a row
                            self.value = '';
                        });
                    });
                }, 0);

                function _openUploadDialog() {
                    document.getElementsByClassName('fileUpload')[0].click();
                }
            },

            controller: function () {
                let self = this;

                self.files = [];

                self.pushFiles = _pushFiles;
                self.removeFile = _removeFile;
                self.downloadFile = _downloadFile;


                /**
                 * @param {Object} event
                 * @return {Promise}
                 * @private
                 */
                function _pushFiles(event) {
                    return $q.all(_.each(event.target.files, file => {
                        return _pushFileToScope(file);
                    }));
                }

                /**
                 * @param {Object} file
                 * @returns {Promise}
                 */
                function _pushFileToScope(file) {
                    return fileUploadService.uploadFile(file).then(uploadedFile => {
                        // save original file object which will be send to server
                        uploadedFile.file = file;

                        self.files.push(uploadedFile);
                    });
                }

                /**
                 * @param {Number} index
                 * @private
                 */
                function _removeFile(index) {
                    self.files.splice(index, 1);
                }

                /**
                 * @private
                 */
                function _downloadFile() {
                    // direct path to file
                    return $q.when('https://en.wikipedia.org/wiki/Basketball')
                }
            }
        };
    });
})();
