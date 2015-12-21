'use strict';

myApp.controller('SearchCtrl',
    function(SearchService) {
        var vm = this;

        //Input for search gets bound to this on page
        vm.searchTerm;

        vm.hl7Messages;

        //Method to make call to fetch data to search though
        vm.fetchData = function() {
           SearchService.getSearchResults(vm.searchTerm)
                        //expecting a promise, need to unbundle the data and apply to out varaible to get data to DOM
                        .then(function(data){
                            vm.hl7Messages = data
                        });
        };


        var init =  function() {
        //prefetch the data and let filter handle the matching
            vm.fetchData('');

        }
        init();
});