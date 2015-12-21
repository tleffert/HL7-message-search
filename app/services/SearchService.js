'use strict';
myApp.service('SearchService',
    function($http,$q,$log) {
         this.getSearchResults = function(term) {
            var deferred = $q.defer();

            $http.post('/api/search',term)
                .success(function(data) {
                //Formatting our promise on a succesfull call
                    deferred.resolve({
                        messages : data
                        });
                 //If error arises log issues
                    }).error(function(msg,code) {
                        deferred.reject(msg);
                        $log.error(msg,code);
                    });
                return deferred.promise;


        }
});
