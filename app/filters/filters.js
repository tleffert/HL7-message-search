
//Angular filter that will highlight a list of search terms
//USAGE ex: <div ng-repeat="message in messages | highlight:<searchtermlist>"></div>
myApp.filter('highlight',
    function($sce) {
        return function(str, terms) {
            //only want to attempt to highlight results if there is a search term
            if(terms && str){
                // want to separate the terms so that we can search for each individually
                var termList = terms.split(',');
                var message = str.split('\n');
                var textToReturn='';
                   var tempList = [];

                   //checking for empty strings, they need to be removed from list of terms to search for
                   for(var termIndex in termList) {
                        if(termList[termIndex]) {
                            tempList.push(termList[termIndex]);
                        }
                   }
                  termList = tempList;
                    //Where the actual highlighting occurs, just wraps the match in a span
                    for(var segmentIndex in message) {
                        //search for terms using 'or' logic ('|'), but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                        var regex = new RegExp('(' + termList.join('|') + ')', 'gi');
                        //applying the highlight to the case match
                        textToReturn += '<span class="segment-block"><p>'
                        textToReturn +=message[segmentIndex].replace(regex, '<span class="highlight">$&</span>');
                        textToReturn += '</p></span>'

                    }
                //need to specify that we has trusted html being sent back to the html bind.
                return $sce.trustAsHtml(textToReturn);
            } else if(str) {
                //If there are no terms (case is initial load more often than not) still want to dress the message up a bit for readability

                var message = str.split('\n');

               for(var segmentIndex in message) {
                   //search for term, but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                   //applying the highlight to the case match
                   textToReturn += '<span class="segment-block"><p>' + message[segmentIndex] + '</p></span>'

               }
               return $sce.trustAsHtml(textToReturn);
            }
            //need to specify that we has trusted html being sent back to the html bind.
            return $sce.trustAsHtml(str);
        };
});

//Angular filter that filters a list of results, based off of allowing multiple search terms
//USAGE ex: <div ng-repeat="message in messages | filterMultiple:<searchtermlist>"></div>
myApp.filter('filterMultiple',
    function($sce) {
        return function(messages,terms) {
           var match = false;
           var matches = [];


            if(terms && messages) {

               var termList = terms.split(',');
               var tempList = termList;
                var tempList = [];

                //checking for empty strings, they need to be removed from list of terms to search for
                  for(var termIndex in termList) {
                       if(termList[termIndex]) {
                           tempList.push(termList[termIndex]);
                       }
                  }
                  termList = tempList;

               for(var messageIndex in messages) {
                var message = messages[messageIndex].message.split('\n');
                    match = false;

                    //Looking for the search terms in each message using 'or' logic
                    for(var line in message) {
                        //search for terms using 'or' logic ('|'), but do it globally-ignorecase ('is' matches 'is' and 'this' and 'THIS')
                        var regex = new RegExp('(' + termList.join('|') + ')', 'gi');
                        //applying 'or' logic to determin to show message
                        match = match || regex.test(message[line]);
                    }
                    //if a message contains atleast one of the terms add to results list to hand back to page
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