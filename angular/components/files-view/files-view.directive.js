/**
 * @rxdoc directive
 * @name filesView
 *
 * @description
 * filesView is a UI Component that allows to display, download, remove files.
 * Component is displayed a thumbnail and name of a file.
 * Also, you can configure remove, download file.
 *
 * Example:
 * <files-view files="files"></files-view>
 *
 * Configuration:
*       files: '=' - should be an array of files
*       removeFile: '&?' - by default OFF, add remove-file="callback(data)" to make it ON and remove item
*          from parent scope. If you don't need to remove file from parent scope just pass remove-file="true"
*       removeFiles: '=' - true/false, remove files
*       download: '&?' - by default OFF, add download="callback(data)" to make it ON and download from parent scope
 */
(function () {
    'use strict';

    angular.module('app').directive('filesView', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: 'components/files-view/files-view.directive.html',

                scope: {},

                bindToController: {
                    files: '=',
                    removeFile: '&',
                    downloadFile: '&'
                },

                controllerAs: 'filesViewCtrl',

                controller: function () {
                    let self = this;

                    self.$onInit = function() {
                        self.files = self.files || [];

                        self.downloadFile = (function () {
                            let _downloadFile = self.downloadFile;

                            return function (index) {
                                let file = self.files[index];

                                _downloadFile({index})
                                    .then(function (path) {
                                        $timeout(() => {
                                            let a = document.createElement('a');
                                            document.body.appendChild(a);
                                            a.style.display = 'none';
                                            a.href = path;
                                            a.download = file.name;
                                            a.click();
                                            document.body.removeChild(a);
                                        }, 0);
                                    })
                                    .catch(angular.noop);
                            }
                        }());
                    };
                }
            };
        });
})();
