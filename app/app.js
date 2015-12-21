'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module("myApp", ["ngRoute","ngMockE2E"]);


myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'views/view1.html'
          })
          }]);



//This will help mocking a back call for our POST
myApp.run(function($httpBackend) {
  //Allows calls to app for file retrieval
  $httpBackend.whenGET(/views\/.*/).passThrough();
  $httpBackend.whenGET(/partials\/.*/).passThrough();

  //Response mock returns Array of Json objects
  $httpBackend.whenPOST('/api/search').respond(function(method, url, data, headers){
      return [200, records, {}];
    });
  var records =[
                    {
                    'source' : 'somewhere',
                    'date' : '',
                    'message' : "MSH|^~\&||GA0000||VAERS PROCESSOR|20010331605||ORU^RO1|20010422GA03|T|2.3.1|||AL|\n"+
                      "PID|||1234^^^^SR~1234-12^^^^LR~00725^^^^MR||Doe^John^Fitzgerald^JR^^^L||20001007|M||2106-3^White^HL70005|123 Peachtree St^APT 3B^Atlanta^GA^30210^^M^^GA067||(678) 555-1212^^PRN|\n"+
                      "NK1|1|Jones^Jane^Lee^^RN|VAB^Vaccine administered by (Name)^HL70063|\n"+
                      "NK1|2|Jones^Jane^Lee^^RN|FVP^Form completed by (Name)-Vaccine provider^HL70063|101 Main Street^^Atlanta^GA^38765^^O^^GA121||(404) 554-9097^^WPN|\n"+
                      "ORC|CN|||||||||||1234567^Welby^Marcus^J^Jr^Dr.^MD^L|||||||||Peachtree Clinic|101 Main Street^^Atlanta^GA^38765^^O^^GA121|(404) 554-9097^^WPN|101 Main Street^^Atlanta^GA^38765^^O^^GA121|\n"+
                      "OBR|1|||^CDC VAERS-1 (FDA) Report|||20010316|\n"+
                      "OBX|1|NM|21612-7^Reported Patient Age^LN||05|mo^month^ANSI|\n"+
                      "OBX|1|TS|30947-6^Date form completed^LN||20010316|\n"+
                      "OBX|2|FT|30948-4^Vaccination adverse events and treatment, if any^LN|1|fever of 106F, with vomiting, seizures, persistent crying lasting over 3 hours, loss of appetite|\n"+
                      "OBX|3|CE|30949-2^Vaccination adverse event outcome^LN|1|E^required emergency room/doctor visit^NIP005|\n"+
                      "OBX|4|CE|30949-2^Vaccination adverse event outcome^LN|1|H^required hospitalization^NIP005|\n"+
                      "OBX|5|NM|30950-0^Number of days hospitalized due to vaccination adverse event^LN|1|02|d^day^ANSI|\n"+
                      "OBX|6|CE|30951-8^Patient recovered^LN||Y^Yes^ HL70239|\n"+
                      "OBX|7|TS|30952-6^Date of vaccination^LN||20010216|\n"+
                      "OBX|8|TS|30953-4^Adverse event onset date and time^LN||200102180900|\n"+
                      "OBX|9|FT|30954-2^Relevant diagnostic tests/lab data^LN||Electrolytes, CBC, Blood culture|\n"+
                      "OBR|2|||30955-9^All vaccines given on date listed in #10^LN|\n"+
                      "OBX|1|CE30955-9&30956-7^Vaccine type^LN|1|08^HepB-Adolescent/pediatric^CVX|\n"+
                      "OBX|2|CE|30955-9&30957-5^Manufacturer^LN|1|MSD^Merck^MVX|\n"+
                      "OBX|3|ST|30955-9&30959-1^Lot number^LN|1|MRK12345|\n"+
                      "OBX|4|CE|30955-9&30958-3^ Route^LN|1|IM^Intramuscular ^HL70162|\n"+
                      "OBX|5|CE|30955-9&31034-2^Site^LN|1|LA^Left arm^ HL70163|\n"+
                      "OBX|6|NM|30955-9&30960-9^Number of previous doses^LN|1|01|\n"+
                      "OBX|7|CE|CE|30955-9&30956-7^Vaccine type^LN|2|50^DTaP-Hib^CVX|\n"+
                      "OBX|8|CE|30955-9&30957-5^ Manufacturer^LN|2|WAL^Wyeth_Ayerst^MVX|\n"+
                      "OBX|9|ST|30955-9&30959-1^Lot number^LN|2|W46932777|\n"+
                      "OBX|10|CE|30955-9&30958-3^ Route^LN|2|IM^Intramuscular^HL70162|"
                  },
                  {
                  'source' : 'elsewhere',
                  'date' : '',
                  'message' : 'MSH|^~\&||GA0000||MA0000|199705221605||VXQ^V01|19970522GA40|T|2.3.1|||AL\n'+
                              'QRD|199705221605|R|I|19970522GA05|||25^RD|^KENNEDY^JOHN^FITZGERALD^JR|VXI^VACCINE INFORMATION^HL70048|^SIIS\n'+
                              'QRF|MA0000||||256946789~19900607~MA~MA99999999~88888888~KENNEDY^JACQUELINE^LEE~BOUVIER~898666725~KENNEDY^JOHN^FITZGERALD~822546618\n'

                },
                  {'source':'not here',
                   'date':'',
                   'message': 'MSH|^~\&||GA0000||VAERS PROCESSOR|20010331605||ORU^R01|20010422GA03|T|2.3.1|||AL|\n'+
                              'PID|||1234^^^^SR~1234-12^^^^LR~00725^^^^MR||Doe^John^Fitzgerald^JR^^^L||20001007|M||2106-3^White^HL70005|123 Peachtree St^APT 3B^Atlanta^GA^30210^^M^^GA067||(678) 555-1212^^PRN|\n'+
                              'NK1|1|Jones^Jane^Lee^^RN|VAB^Vaccine administered by (Name)^HL70063|\n'+
                              'NK1|2|Jones^Jane^Lee^^RN|FVP^Form completed by (Name)-Vaccine provider^HL70063|101 Main Street^^Atlanta^GA^38765^^O^^GA121||(404) 554-9097^^WPN|\n'+
                              'ORC|CN|||||||||||1234567^Welby^Marcus^J^Jr^Dr.^MD^L|||||||||Peachtree Clinic|101 Main Street^^Atlanta^GA^38765^^O^^GA121|(404) 554-9097^^WPN|101 Main Street^^Atlanta^GA^38765^^O^^GA121|\n'+
                              'OBR|1|||^CDC VAERS-1 (FDA) Report|||20010316|\n'+
                              'OBX|1|NM|21612-7^Reported Patient Age^LN||05|mo^month^ANSI|\n'+
                              'OBX|1|TS|30947-6^Date form completed^LN||20010316|\n'+
                              'OBX|2|FT|30948-4^Vaccination adverse events and treatment, if any^LN|1|fever of 106F, with vomiting, seizures, persistent crying lasting over 3 hours, loss of appetite|\n'+
                              'OBX|3|CE|30949-2^Vaccination adverse event outcome^LN|1|E^required emergency room/doctor visit^NIP005|\n'+
                              'OBX|4|CE|30949-2^Vaccination adverse event outcome^LN|1|H^required hospitalization^NIP005|\n'+
                              'OBX|5|NM|30950-0^Number of days hospitalized due to vaccination adverse event^LN|1|02|d^day^ANSI|\n'+
                              'OBX|6|CE|30951-8^Patient recovered^LN||Y^Yes^ HL70239|\n'+
                              'OBX|7|TS|30952-6^Date of vaccination^LN||20010216|\n'+
                              'OBX|8|TS|30953-4^Adverse event onset date and time^LN||200102180900|\n'+
                              'OBX|9|FT|30954-2^Relevant diagnostic tests/lab data^LN||Electrolytes, CBC, Blood culture|\n'+
                              'OBR|2|||30955-9^All vaccines given on date listed in #10^LN|\n'+
                              'OBX|1|CE30955-9&30956-7^Vaccine type^LN|1|08^HepB-Adolescent/pediatric^CVX|\n'+
                              'OBX|2|CE|30955-9&30957-5^Manufacturer^LN|1|MSD^Merck^MVX|\n'+
                              'OBX|3|ST|30955-9&30959-1^Lot number^LN|1|MRK12345|\n'+
                              'OBX|4|CE|30955-9&30958-3^ Route^LN|1|IM^Intramuscular ^HL70162|\n'+
                              'OBX|5|CE|30955-9&31034-2^Site^LN|1|LA^Left arm^ HL70163|\n'+
                              'OBX|6|NM|30955-9&30960-9^Number of previous doses^LN|1|01|\n'+
                              'OBX|7|CE|CE|30955-9&30956-7^Vaccine type^LN|2|50^DTaP-Hib^CVX|\n'+
                              'OBX|8|CE|30955-9&30957-5^ Manufacturer^LN|2|WAL^Wyeth_Ayerst^MVX|\n'+
                              'OBX|9|ST|30955-9&30959-1^Lot number^LN|2|W46932777|\n'+
                              'OBX|10|CE|30955-9&30958-3^ Route^LN|2|IM^Intramuscular^HL70162|\n'+
                              'OBX|11|CE|30955-9&31034-2^Site^LN|2|LA^Left arm^HL70163|\n'+
                              'OBX|12|NM|30955-9&30960-9^Number of previous doses^LN|2|01|\n'+
                              'OBR|3|||30961-7^Any other vaccinations within 4 weeks prior to the date listed in #10|\n'+
                              'OBX|1|CE|30961-7&30956-7^Vaccine type^LN|1|10^IPV^CVX|\n'+
                              'OBX|2|CE|30961-7&30957-5^Manufacturer^LN|1|PMC^Aventis Pasteur ^MVX|\n'+
                              'OBX|3|ST|30961-7&30959-1^Lot number^LN|1|PMC123456|\n'+
                              'OBX|4|CE|30961-7&30958-3^Route^LN|1|SC^Subcutaneaous^HL70162|\n'+
                              'OBX|5|CE|30961-7&31034-2^Site^LN|1|LA^Left arm^HL70163|\n'+
                              'OBX|6|NM|30961-7&30960-9^Number of previous doses^LN|1|01|\n'+
                              'OBX|7|TS|30961-7&31035-9^date given^LN|1|20001216|\n'+
                              'OBX|8|CE|30962-^Vaccinated at^LN||PVT^Private doctor�s office/hospital^NIP009|\n'+
                              'OBX|9|CE|30963-3^Vaccine purchased with^LN||PBF^Public funds^NIP008|\n'+
                              'OBX|10|FT|30964-1^Other medications^LN||None|\n'+
                              'OBX|11|FT|30965-8^Illness at time of vaccination (specify)^LN||None|\n'+
                              'OBX|12|FT|30966-6^Pre-existing physician diagnosed allergies, birth defects, medical conditions^LN||Past conditions convulsions|\n'+
                              'OBX|13|CE|30967-4^Was adverse event reported previously^LN||N^no^NIP009|\n'+
                              'OBR|4||30968-2^Adverse event following prior vaccination in patient^LN|\n'+
                              'OBX|1|TX|30968-2&30971-6^Adverse event^LN||None|\n'+
                              'OBR|5||30969-0^Adverse event following prior vaccination in brother^LN|\n'+
                              'OBX|1|TX||30969-0&30971-6^Adverse event^LN||vomiting, fever, otitis media|\n'+
                              'OBX|2|NM||30969-0&30972-4^Onset age^LN||04|mo^month^ANSI|\n'+
                              'OBX|3|CE||30969-0&30956-7^Vaccine Type ^LN||10^IPV^CVX|\n'+
                              'OBX|4|NM||30969-0&30973-2^Dose number in series^LN||02|\n'+
                              'OBR|6|||30970-8^Adverse event following prior vaccination in sister^LN|\n'+
                              'OBX|1|TX|30970-8&30971-6^Adverse event^LN||None|\n'+
                              'OBR|7||^For children 5 and under|\n'+
                              'OBX|1|NM|8339-4^Body weight at birth^LN||82|oz^ounces^ANSI|\n'+
                              'OBX|2|NM|30974-0^Number of brothers and sisters^LN||2|\n'+
                              'OBR|8|||^Only for reports submitted by manufacturer/immunization project|\n'+
                              'OBX|1|ST|30975-7^Mfr./Imm. Proj. report no.^LN||12345678|\n'+
                              'OBX|2|TS|30976-5^Date received by manufacturer/immunization project^LN||12345678|\n'+
                              'OBX|3|CE|30977-3^15 day report^LN||N^No^HL70136|\n'+
                              'OBX|4|CE|30978-1^Report type^LN||IN^Initial^NIP010|\n'


                  }

                ];
});


