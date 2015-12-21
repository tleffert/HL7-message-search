myApp.filter('highlight',
    function($sce) {
        return function(str, terms) {
            //only want to attempt to highlight results if there is a search term
            if(terms && str){
                // want to separate the terms so that we can search for each individually
                var termList = terms.split(',');
                var lines = str.split('\n');
                var line;
                var textToReturn='';
                   var tempList = [];
                   for(var termIndex in termList) {
                        var emptyRegex = new RegExp('^\\s$');

                        if(termList[termIndex]) {
                            tempList.push(termList[termIndex]);
                        }
                   }
                   termList = tempList;
                    for(line in lines) {
                        //search for term, but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                        var regex = new RegExp('(' + termList.join('|') + ')', 'gi');
                        //applying the highlight to the case match
                        textToReturn += '<span>'
                        textToReturn +=lines[line].replace(regex, '<span class="highlight">$&</span>');
                        textToReturn += '</span></br>'

                    }
                //need to specify that we has trusted html being sent back to the html bind.
                return $sce.trustAsHtml(textToReturn);
            } else if(str) {
                var lines = str.split('\n');

               for(var line in lines) {
                   //search for term, but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                   //applying the highlight to the case match
                   textToReturn += '<span>' + lines[line] + '</span></br>';

               }
               return $sce.trustAsHtml(textToReturn);
            }
            //need to specify that we has trusted html being sent back to the html bind.
            return $sce.trustAsHtml(str);
        };
});

myApp.filter('filterMultiple',
    function($sce) {
        return function(messages,terms) {
           var match = false;
           var matches = [];


            if(terms && messages) {

               var termList = terms.split(',');
               var tempList = termList;
                var tempList = [];
                  for(var termIndex in termList) {
                       var emptyRegex = new RegExp('^\\s$');

                       if(termList[termIndex]) {
                           tempList.push(termList[termIndex]);
                       }
                  }
                  termList = tempList;
               for(var messageIndex in messages) {
                var message = messages[messageIndex].message.split('\n');
                    match = false;
                    for(var line in message) {
                        //search for term, but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                        var regex = new RegExp('(' + termList.join('|') + ')', 'gi');
                        //applying the highlight to the case match
                        match = match || regex.test(message[line]);
                    }
                    if(match) {
                        matches.push(messages[messageIndex]);
                    }
                }
            } else {
                return messages;
            }

        return matches;

        };
});