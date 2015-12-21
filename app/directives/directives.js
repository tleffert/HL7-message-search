myApp.directive('formathl7',
    function($filter,$sce){
        return {
            restrict: 'A',
            scope: { formathl7: '='},
            link: function(scope) {
                var message = scope.formathl7.split('\n');
                var line;
                var rebuiltMessage = '';

                var fieldSeparator = new RegExp('\\|+','g');
                var componentCharJoin = new RegExp('\\^+','g');

                for(line in message) {
                        rebuiltMessage += message[line].replace(fieldSeparator, ' ').replace(componentCharJoin,',') + '\n';
                    }
               scope.formathl7 = rebuiltMessage;
            }
        };

});
