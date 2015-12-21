
//Directive that removes the default HL7 syntax from the message

//USAGE ex: <div ng-repeat="message in messages" formathl7="<message>"></div>
myApp.directive('formathl7',
    function($filter,$sce){
        return {
            restrict: 'A',
            scope: { formathl7: '='},
            link: function(scope) {
                var message = scope.formathl7.split('\n');
                var rebuiltMessage = '';

                //Regexs to find '|' and '^' in a message;
                var fieldSeparator = new RegExp('\\|+','g');
                var componentCharJoin = new RegExp('\\^+','g');

                //Replace/removing default HL7 syntax
                for(var segmentIndex in message) {
                        rebuiltMessage += message[segmentIndex].replace(fieldSeparator, ' ').replace(componentCharJoin,',') + '\n';
                    }
               scope.formathl7 = rebuiltMessage;
            }
        };

});
