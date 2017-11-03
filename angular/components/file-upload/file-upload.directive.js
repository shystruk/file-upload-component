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
                angular.element($element.find('input')[0]).bind('change', function (event) {
                    let self = this;

                    $controller.pushFiles(event).then(() => {
                        // allow to upload the same file twice in a row
                        self.value = '';
                    });
                });
            },

            controller: function () {
                let self = this;

                self.files = [];

                self.pushFiles = pushFiles;
                self.removeFile = removeFile;
                self.downloadFile = downloadFile;


                /**
                 * @param {Object} event
                 * @return {Promise}
                 */
                function pushFiles(event) {
                    return $q.all(_.each(event.target.files, file => {
                        return _pushFileToScope(file);
                    }));
                }

                /**
                 * @param {Number} index
                 */
                function removeFile(index) {
                    self.files.splice(index, 1);
                }

                /**
                 * @param {Number} index
                 * @return {Promise}
                 */
                function downloadFile(index) {
                    let file = self.files[index];

                    // You have two options here
                    // 1. To get content from server
                    // 2. By direct path to file

                    if (file.content) {
                        let blob = new Blob([file.content], { type: file.type });

                        // https://github.com/eligrey/FileSaver.js/
                        saveAs(blob, file.name);

                        return $q.reject();
                    }

                    return $q.when('https://en.wikipedia.org/wiki/Basketball');
                }

                /**
                 * @param {File} file
                 * @returns {Promise}
                 */
                function _pushFileToScope(file) {
                    return fileUploadService.uploadFile(file).then(uploadedFile => {
                        self.files.push(uploadedFile);
                    });
                }
            }
        };
    });
})();
