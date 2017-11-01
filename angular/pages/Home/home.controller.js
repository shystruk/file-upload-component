(function () {
'use strict';

    angular.module('app').controller('HomeController', function () {
        var self = this;

        /**
         * @param {Array} jobs
         * @param {String} location
         */
        self.setJobs = function (jobs, location) {
            self.jobs = jobs;
            self.location = location;
        }
    });
}());
