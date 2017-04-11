

angular.module('starter.controllers', [])

.service('bus',function(){
     this.sour = ""; //source
     this.agent_id="";
     this.agentname = "";
     this.busname = "";
     this.busaddress = "";
     this.tikno = "";
     this.dest = ""; // destination
     this.dt = "";   //Starting date
     this.busid = ""; //bus id
     this.tkts = ""; //seats tickets
     this.amt = "";  //  amount
     this.trip = ""; // Trip either round or one
     this.rdt  = ""; // Return date
     this.tflag = "1"; //trip flag
     this.cbusid = ""; // c for cancel
     this.cticket = "";
     this.seat = ""; //seat number
     this.camt = ""; //cancelamount
     this.bname=""; //busname
     this.btype=""; //bustype
     this.bbname = "";
     this.fn = ""; //name
     this.ln = "";
     this.pbusid= "";//print history
     this.pdate ="";
     this.pbusname = "";
     this.ptick = "";//
     this.idn = "";
     this.mbn = "";
     this.busfare="";
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory,bus) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});  $ionicHistory.clearHistory();
   
 // console.log($localStorage.login);
    // $window.location.href="#/app/login";
      
//navigator.app.loadUrl("file:///android_asset/www/index.html");
    
 // $window.location.href="#/app/login";

  $scope.b  = bus;

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.url="http://www.avanettech.co.ke/avttms/app/"
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


//Login
.controller('BrowseCtrl',function($scope,$window,$http,$ionicSideMenuDelegate,$ionicHistory,$ionicLoading,$ionicPopup,bus){
  $scope.b = bus;

  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
});

  $ionicSideMenuDelegate.canDragContent(false);
  $scope.doLogin = function() {
    
      if(this.uname && this.password){    
         console.log($scope.url+"login.php?id="+this.uname+"&pw="+this.password);
     $ionicLoading.show({template: 'Logging-in'});
     $scope.b.agentname = this.uname;
    $http.get($scope.url+"login.php?id="+this.uname+"&pw="+this.password).success(function(response){
      $scope.login = response[0];
      $ionicLoading.hide();
      console.log($scope.login);
      if($scope.login.status == "Success"){
        $scope.b.agent_id = $scope.login.agent_id;

        $window.location.href="#/app/playlists"
      }
      else {
      var alertPopup = $ionicPopup.alert({
     title: 'Login Failed',
     template: '<center> Invalide Username or Password </center>'
   });
      }
    }).error(function(data){
       $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
              title: '<center> No network connection </center>'
               });                      
            });
      }

      else{
       var alertPopup = $ionicPopup.alert({
          title: 'Login Failed',
          template:'<center> Please fill in the missing information </center>'
        });
 // $window.location.href="#/app/playlists"
}
}
 
})


//Journey details
.controller('PlaylistsCtrl',['$rootScope','$scope','$http','$filter','$location','$window','bus', '$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state', function($rootScope,$scope,$http,$filter,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {



 $scope.bus= bus;
 $scope.bus.sour=""
 $scope.bus.dest="";
 $scope.bus.trip="";
 $scope.bus.dt = "";
 $scope.bus.rdt  = "";
  $scope.rdtf =false;
  $scope.dates="";
  $scope.rdates="";
  $scope.spinner1=true;
  $scope.spinner2=false;
 

   $http.get($scope.url+"city.php").success(function(ref){
      $scope.cities = ref;  
      $scope.spinner1  = false;
      console.log($scope.cities);
      });

    $scope.findto = function(){
     $scope.spinner2  = true;
     this.destination = "";
      $http.get($scope.url+"todestination.php?frm="+this.source).success(function(ref){
        $scope.citiess = ref;  
        $scope.spinner2  = false;
        console.log($scope.url+"todestination.php?frm="+$scope.source);
      });

    }

     var secretEmptyKey = '[$empty$]';
       $scope.stateComparator = function (state, viewValue) {
        return viewValue === secretEmptyKey || (''+state).toLowerCase().indexOf((''+viewValue).toLowerCase()) > -1;
      };

      var mindate = new Date();
      $scope.mindt = mindate.getFullYear() + '-' + ('0' + (mindate.getMonth() + 1 )).slice(-2) + '-' + ('0' + mindate.getDate()).slice(-2);
     
        $scope.trip = {
        name: 'one'
      };

      $scope.togg = function(){
        if($scope.trip.name == 'one'){
           $scope.rdtf = false;
        }else{
          $scope.rdtf = true;
        }
      }

      $scope.setdate  = function(sd){
        if(sd){
           var parts = sd.split("-");
           var dts = new Date(
              parseInt(parts[0], 10),      // year
              parseInt(parts[1], 10) - 1,  // month (starts with 0)
              parseInt(parts[2], 10)       // date
            );
         
          dts.setDate(dts.getDate() + 1);
          parts[0] = "" + dts.getFullYear();
          parts[1] = "" + (dts.getMonth() + 1);
          if (parts[1].length < 2) {
            parts[1] = "0" + parts[1];
          }
          parts[2] = "" + dts.getDate();
          if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
          }
          $scope.minrdt = parts.join("-");
         }
        this.rdates  = "";   
      }

       
  
  $scope.search = function(){
      if(this.source == this.destination){
          var alertPopup = $ionicPopup.alert({
                    title: 'Search bus',
                    template: '<center>From & To address cannot be same</center>'
                  });
          console.log($scope.trips);
       }else 
        if( (this.dates && this.source && this.destination) && 
          ( (this.trip.name=="round" && this.rdates && this.dates)||(this.trip.name=="one" && this.dates) ) ){
            var datepick = this.dates;
            var datepicker = $filter('date')(new Date(datepick),'dd-MM-yyyy');
           // console.log(this.trip.name);
            $scope.bus.sour  = this.source;
            $scope.bus.dest  = this.destination;
            $scope.bus.dt    = datepicker;

            if(this.trip.name == "round"){
              var rdatepick = this.rdates;
              //alert("tripename1"+this.trip.name);
              var rdatepicker = $filter('date')(new Date(rdatepick),'dd-MM-yyyy');
              $scope.bus.rdt  = rdatepicker;
            }
            //alert("tripename"+this.trip.name);
            $scope.bus.trip = this.trip.name;
          
              $window.location.href="#/app/search";              
    }else{
       var alertPopup = $ionicPopup.alert({
                    title: 'Search bus',
                    template: '<center> Please fill in the missing information </center>'
                  });
    }
  }

}])

//Listing buses
.controller('SearchCtrl',['$rootScope','$scope','$http','$filter','$location','$window','bus', '$state', function($rootScope,$scope,$http,$filter,$location,$window,bus,$state) {  
    $scope.$on('$ionicView.enter', function() {
  $scope.ss = bus;
  $scope.results = []
   $scope.notfound =false;
   $scope.dataLoaded = false;
   $scope.loading =true;
   $scope.cks = false;
   console.log($scope.ss.tflag);
  
   if($scope.ss.trip == "one"){
      $scope.dater = $scope.ss.dt; 
      console.log('one');
      var geturl = $scope.url+"results.php?triptype=1&ter_from="+$scope.ss.sour+"&tag="+$scope.ss.dest+"&datepicker="+$scope.ss.dt;
      console.log(geturl);
   }else{
   if($scope.ss.trip == "round" && $scope.ss.tflag == "1"){
      $scope.dater = $scope.ss.dt;
      console.log('round and 1'); 
      var geturl = $scope.url+"results.php?triptype=1&ter_from="+$scope.ss.sour+"&tag="+$scope.ss.dest+"&datepicker="+$scope.ss.dt;
   }else{
    console.log('round and 2');
      $scope.dater = $scope.ss.rdt;
      var geturl =  $scope.url+"results.php?triptype=1&ter_from="+$scope.ss.dest+"&tag="+$scope.ss.sour+"&datepicker="+$scope.ss.rdt;
   }
 }
   

       $http.get(geturl).success(function(response,status){     
           
              if(response[0]){
                    $scope.loading =false;
                    $scope.dataLoaded = true;
                    $scope.results = response;
              }else{
                  $scope.loading=false;
                  $scope.dataLoaded=false;
                  $scope.notfound = true;
              }
        
          console.log(geturl);
           }).error(function(data){
            $scope.loading =false;
            $scope.dataLoaded = false;
            $scope.notfound = true;
                });

    
    $scope.seats = function(bid,bbname){
    $scope.ss.busid = bid;
    $scope.ss.bbname = bbname;
    $window.location.href="#/app/seat";       
   }
 });


}])

//Seat Selection
.controller('SeatCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
     
     $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: false
     });

     $scope.$on('$ionicView.enter', function() {
   $scope.book = function(){
     $window.location.href="#/app/book"
    }
   var booked = [];
   $scope.availed = [];
   $scope.st = bus;

   $scope.bstatus={};
   $scope.bstatus.s = "Book Now";

   var available = [];
   $scope.booked = [];$scope.bkdseats="";
   $scope.loading = true; $scope.stear=false;$scope.loadings = false;
   var busfare = "",bppoints = [];
   $scope.busfare = 0;$scope.bpoints = [];

   if($scope.st.trip == "one"){
      var dater = $scope.st.dt; 
   }else{
   if($scope.st.trip == "round" && $scope.st.tflag == "1"){
      var dater = $scope.st.dt;
   }else{
      var dater = $scope.st.rdt;
   }
}
   $http.get("http://www.avanettech.co.ke/avttms/app/view_seat_result.php?bus_id="+$scope.st.busid+"&datepicker="+dater).success(function(response){
        console.log("http://www.avanettech.co.ke/avttms/app/view_seat_result.php?bus_id="+$scope.st.busid+"&datepicker="+dater);
        $scope.fare = response[0].Bus_fare;
        $scope.st.busfare  = $scope.fare;
        $scope.spark = function(){
        $scope.seatstructure1 = response[0].Bus_structure10.split(',').reverse();
        $scope.seatstructure2 = response[0].Bus_structure20.split(',').reverse();
        $scope.seatstructure3 = response[0].Bus_structure30.split(',').reverse();
        $scope.seatstructure4 = response[0].Bus_structure40.split(',').reverse();
        $scope.seatstructure5 = response[0].Bus_structure50.split(',').reverse();
        $scope.bpoints = response[0].Boarding_points.split(',');


        }
       $scope.fires = function(){       
       for(var ck = 0;ck < $scope.seatstructure1.length;ck++){
          if( ($scope.seatstructure1[ck]=='' || $scope.seatstructure1[ck]=='xx') & ($scope.seatstructure2[ck]=='' || $scope.seatstructure2[ck]=='xx') & ($scope.seatstructure3[ck]=='' || $scope.seatstructure3[ck]=='xx') 
           & ($scope.seatstructure4[ck]=='' || $scope.seatstructure4[ck]=='xx') & ($scope.seatstructure5[ck]=='' || $scope.seatstructure5[ck]=='xx') ){
                $scope.seatstructure1.splice(ck,1);
                $scope.seatstructure2.splice(ck,1);
                $scope.seatstructure3.splice(ck,1);
                $scope.seatstructure4.splice(ck,1);
                $scope.seatstructure5.splice(ck,1);
          }
        }
      }
      var cl1 =0,cl2 =0,cl3 =.0,cl4 =0,cl5 =0;
      $scope.removecl = function(){
          for(var cl=0;cl<$scope.seatstructure1.length;cl++){
              if($scope.seatstructure1[cl] == '' || $scope.seatstructure1[cl] == "xx") cl1++;
              if($scope.seatstructure2[cl] == '' || $scope.seatstructure2[cl] == "xx") cl2++; 
              if($scope.seatstructure3[cl] == '' || $scope.seatstructure3[cl] == "xx") cl3++; 
              if($scope.seatstructure4[cl] == '' || $scope.seatstructure4[cl] == "xx") cl4++; 
              if($scope.seatstructure5[cl] == '' || $scope.seatstructure5[cl] == "xx") cl5++;  
          }
          if(cl1 == $scope.seatstructure1.length) $scope.seatstructure1=[];
          if(cl2 == $scope.seatstructure2.length) $scope.seatstructure2=[];
          if(cl3 == $scope.seatstructure3.length) $scope.seatstructure3=[];
          if(cl4 == $scope.seatstructure4.length) $scope.seatstructure4=[];
          if(cl5 == $scope.seatstructure5.length) $scope.seatstructure5=[];

      }

      $scope.spark();$scope.fires();$scope.fires();$scope.fires();$scope.fires();
      $scope.fires();$scope.removecl();$scope.loading = false; $scope.stear=true; 
      $scope.loadings=true; 
        busfare = response[0].Bus_fare;
        $scope.st.busfare = busfare;
        if(response[0].booked_seat != null){
            $scope.booked = response[0].booked_seat.split(',');
         }
        
        $scope.seat = function(s){
          if(s == 'xx') return s;else
          if(s == '')  return  'xx';else
          if($scope.booked.indexOf(s) > -1) return 'booked';
          if($scope.availed.indexOf(s) > -1) return 'availed';
        }

        $scope.bookrow1 = function(s){
           if(s != 'xx' || s != '' || $scope.booked.indexOf(s) == -1 ){
              var temp = $scope.availed.indexOf(s);
              if(temp != -1 ) $scope.availed.splice(temp,1);   
              else $scope.availed.push(s);
             $scope.seatcalc();
          } 
        }
        $scope.bookrow2 = function(s){
            if(s != 'xx' || s != '' || $scope.booked.indexOf(s) == -1){
              var temp = $scope.availed.indexOf(s);
              if(temp != -1 ) $scope.availed.splice(temp,1);  
              else $scope.availed.push(s);
              $scope.seatcalc();
              
          }
        }
        $scope.bookrow3 = function(s){
           if(s != 'xx' || s != '' || $scope.booked.indexOf(s) == -1){
              var temp = $scope.availed.indexOf(s);
              if(temp != -1 )  $scope.availed.splice(temp,1);   
              else $scope.availed.push(s);
             $scope.seatcalc();
          }
        }
        $scope.bookrow4 = function(s){
           if(s != 'xx' || s != '' || $scope.booked.indexOf(s) == -1){
              var temp = $scope.availed.indexOf(s);
              if(temp != -1 ) $scope.availed.splice(temp,1);  
              else $scope.availed.push(s);
              $scope.seatcalc();    
          }
        }
        $scope.bookrow5 = function(s){
           if(s != 'xx' || s != '' || $scope.booked.indexOf(s) == -1){
              var temp = $scope.availed.indexOf(s);
              if(temp != -1 ) $scope.availed.splice(temp,1);   
              else $scope.availed.push(s);
              $scope.seatcalc();
             
          }
        }
     }); 


     $scope.seatcalc = function(){
          $scope.bkdseats = "";
          for(var j=0;j < $scope.availed.length;j++){
              $scope.bkdseats += ','+$scope.availed[j];  
          } 

          $scope.bkdseats = $scope.bkdseats.substr(1);
          $scope.busfare = $scope.availed.length * busfare;
     }

     $scope.booknow = function() {
         $scope.st.amt = $scope.busfare;
         $scope.st.tkts = $scope.bkdseats
         if($scope.busfare < 1){
             var alertPopup = $ionicPopup.alert({
                    title: 'Seat Selection',
                    template: '<center> Please select seat to proceed booking </center>'
                  });
         } 
         else $window.location.href="#/app/book";
     }   
 });
}])


//Print ticket
.controller('BookCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
    $scope.$on('$ionicView.enter', function() {
   $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
  $scope.st = bus;
  var cflag ="";
  $scope.printer="Book";
  $scope.but = false;
  /*/
  $scope.checkid = function(ids){
      if(ids < 5 || ids > 15 ){   
                  var alertPopup = $ionicPopup.alert({
                  title: 'Form submition failure',
                 template:'<center> Id number should be 5 to 15 character </center>'
                });
                  return false;
      }
  }
  $scope.checkmob = function(mbs){
      if(mbs.length < 10 || mbs.length > 13 ){
                  var alertPopup = $ionicPopup.alert({
                  title: 'Form submition failure',
                 template:'<center> Mobile number should be 10 - 13 number</center>'
                });
            return false;
       }
  } */

   $scope.cancel = function(){
      $window.location.href="#/app/playlists";
   } 

  //$scope.tems = [];
  $scope.mbn={};$scope.fn= {};$scope.ln = {};$scope.idn = {};
   $scope.dnarray = $scope.st.tkts.split(',');
   $scope.but = true;

  $scope.caller = function(){

    $scope.fnn = "";$scope.lnn="";$scope.mbnn="";$scope.idnn="";
  for(var i=0;i < $scope.dnarray.length ; i++){
      if($scope.fn[$scope.dnarray[i]] && $scope.ln[$scope.dnarray[i]] && $scope.idn[$scope.dnarray[i]]  && $scope.mbn[$scope.dnarray[i]] ){
            var tempone  =  $scope.idn[$scope.dnarray[i]];
            var tes = (tempone+"").length;
             console.log('tempone'+ tes);
              if(tes < 5 || tes > 15 ){
                  var alertPopup = $ionicPopup.alert({
                  title: 'Form submission failure',
                 template:'<center> Id number should be 5 to 15 character </center>'
                });
                  return false;
              }
              var temptwo = $scope.mbn[$scope.dnarray[i]];
              var tess = (temptwo+"").length;
              console.log('temptwo'+tess); 
              if(tess < 10 || tess > 13 ){
                  var alertPopup = $ionicPopup.alert({
                  title: 'Form submission failure',
                 template:'<center> Mobile number should be 10 - 13 number</center>'
                });
                  return false;
              }
              $scope.fnn += ','+ $scope.fn[$scope.dnarray[i]];
              $scope.lnn  += ','+ $scope.ln[$scope.dnarray[i]];
              $scope.mbnn  += ','+ $scope.mbn[$scope.dnarray[i]];
              $scope.idnn  += ','+ $scope.idn[$scope.dnarray[i]];

        }else{
           var alertPopup = $ionicPopup.alert({
                 title: 'Form submission failure',
                 template: '<center> All details in the form are mandatory </center>'
              });
      
        return false;
       }
  }
    $scope.fnn = $scope.fnn.substr(1);
    $scope.lnn  = $scope.lnn.substr(1);
    $scope.idnn  = $scope.idnn.substr(1);
    $scope.mbnn  = $scope.mbnn.substr(1);

    $scope.st.fn = $scope.fnn;
    $scope.st.ln = $scope.lnn;
    $scope.st.idn = $scope.idnn;
    $scope.st.mbn = $scope.mbnn;
    console.log("success");
     $scope.book(); 
  }
  

 
  console.log('tickets  '+$scope.st.tkts);
  $scope.book = function(){

     $scope.printer="Booking...";
    if($scope.st.trip == "one"){     
          console.log(1);
           var geturl = $scope.url+"booked_seat.php?Busid="+$scope.st.busid+"&dat="+$scope.st.dt+"&seat_id="+$scope.st.tkts+"&fare="+$scope.st.busfare+"&frm="+$scope.st.sour+"&to="+$scope.st.dest+"&agent_id="+$scope.st.agent_id+"&firstname="+$scope.fnn+"&lastname="+$scope.lnn+"&id="+$scope.idnn+"&mob="+$scope.mbnn;     
           $http.get(geturl).success(function(response){ 
           console.log(response); 
            var checkst = response[0];     

            if(checkst.status == "success"){ 
              $scope.st.tikno = checkst.ticket;
                 var alertPopup = $ionicPopup.alert({
                 title: 'Ticket has been booked',
                 template: 'your seat        :'+checkst.SeatNumber+
                '<br>Ticket no      :'+checkst.ticket+'<br> Total amount     :'+checkst.Total_Amount+
                  '<br> Date of Journey :'+checkst.Date_of_Journey
              });                                  
            $scope.print();
             }
            
         if(checkst.status == "failure"){
              console.log('succ');
               var alertPopup = $ionicPopup.alert({
                 title: 'Booking Failure',
                 template: '<center> The seats you have selected is booked justnow </center>'
              });
              $scope.printer="Retry";

            }            
      }).error(function(data){
          
          var alertPopup = $ionicPopup.alert({
                 title: 'Network problem',
                 template: '<center> Kindly retry again </center>'
              });
           $scope.printer="Retry";
                      
      });     
          
    }else{
       if($scope.st.trip == "round" && $scope.st.tflag == "1"){
            console.log(2);
           var geturl = $scope.url+"booked_seat.php?Busid="+$scope.st.busid+"&dat="+$scope.st.dt+"&seat_id="+$scope.st.tkts+"&fare="+$scope.st.busfare+"&frm="+$scope.st.sour+"&to="+$scope.st.dest+"&agent_id="+$scope.st.agent_id+"&firstname="+$scope.fnn+"&lastname="+$scope.lnn+"&id="+$scope.idnn+"&mob="+$scope.mbnn;       
            $http.get(geturl).success(function(response){  
            var checkst = response[0];     
            if(checkst.status == "success"){
             $scope.st.tikno = checkst.ticket; 
               var alertPopup = $ionicPopup.alert({
                 title: 'Ticket has been booked',
                 template: 'your seat :'+checkst.SeatNumber+
                '<br> Ticket no :'+checkst.ticket+'<br> Total amount:'+checkst.Total_Amount+
                  '<br> Date of Journey :'+checkst.Date_of_Journey
              });                     
            $scope.print();
          
             }
            
         if(checkst.status == "failure"){
              console.log('succ');
               var alertPopup = $ionicPopup.alert({
                 title: 'Booking Failure',
                 template: '<center> The seats you have selected is booked justnow </center>'
              });
              $scope.printer="Retry";
            }            
      }).error(function(data){
           var alertPopup = $ionicPopup.alert({
                 title: 'Network problem',
                 template: '<center> Kindly retry again </center>'
              });
           $scope.printer="Retry";
                      
      });
            
          console.log(2);
         }else if($scope.st.tflag == 2){
           console.log(3); 
           var geturl = "http://www.avanettech.co.ke/avttms/app/booked_seat.php?Busid="+$scope.st.busid+"&dat="+$scope.st.rdt+"&seat_id="+$scope.st.tkts+"&fare="+$scope.st.busfare+"&frm="+$scope.st.dest+"&to="+$scope.st.sour+"&agent_id="+$scope.st.agent_id+"&firstname="+$scope.fnn+"&lastname="+$scope.lnn+"&id="+$scope.idnn+"&mob="+$scope.mbnn;
           $http.get(geturl).success(function(response){  
            var checkst = response[0];     
            if(checkst.status == "success"){ 
               $scope.st.tikno = checkst.ticket;
             var alertPopup = $ionicPopup.alert({
                 title: 'Ticket has been booked',
                 template: 'your seat        :'+checkst.SeatNumber+
                '<br>Ticket no      :'+checkst.ticket+'<br> Total amount     :'+checkst.Total_Amount+
                  '<br> Date of Journey :'+checkst.Date_of_Journey
              });                                         
            $scope.print();
             }
            
         if(checkst.status == "failure"){
              console.log('succ');
               var alertPopup = $ionicPopup.alert({
                 title: 'Booking Failure',
                 template: '<center> The seats you have selected is booked justnow </center>'
              });
            }            
      }).error(function(data){
            var alertPopup = $ionicPopup.alert({
                 title: 'Network problem',
                 template: '<center> Kindly retry again </center>'
              });
             $scope.printer="Retry";
                      
      });
          
        }
     }
     console.log(geturl);
    
    $scope.print = function(){
        $scope.printer="Booked";

        $window.location.href="#/app/sum";
  }
}
 
});
}])

//Print ticket
.controller('sumCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
  $scope.st = bus;

   $scope.$on('$ionicView.enter', function() {
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
     

    $scope.busname = "MOYALE RAHA TRANSPORTERS";
    $scope.busaddress = "NAIROBI";
    if($scope.st.trip == "round" &&   $scope.st.tflag==1){
          $scope.nextb = "Next Trip";
          console.log('ne');
       }else{
          $scope.nextb = "Home";
       }

  $scope.total = $scope.st.mbn.split(',').length * $scope.st.busfare;
  $scope.fn = $scope.st.fn.split(','); 
  $scope.ln = $scope.st.ln.split(','); 
  $scope.mob = $scope.st.mbn.split(',');
  $scope.idn = $scope.st.idn.split(',');
   $scope.names = [];
  $scope.ids = [];
  $scope.printer="Print"
  $scope.mobs = [];
   if($scope.st.trip == "round" && $scope.st.tflag == "1"){
        $scope.source = $scope.st.dest;
        $scope.destination = $scope.st.sour;
        $scope.dater=$scope.st.rdt;
        $scope.busfare = $scope.st.busfare;
   }else{ 
        $scope.source = $scope.st.sour;
        $scope.destination = $scope.st.dest;
        $scope.dater=$scope.st.dt;
        $scope.busfare = $scope.st.busfare;
   }

  $scope.dnarray = $scope.st.tkts.split(',');

   for(var i=0;i < $scope.dnarray.length ; i++){
    var temp =$scope.fn[i]+' '+$scope.ln[i];
      $scope.names.push(temp);
      $scope.ids.push($scope.idn[i]);
      $scope.mobs.push($scope.mob[i]);
    } 

   $scope.cancel = function(){   
         if($scope.st.trip == "round" &&   $scope.st.tflag==1){
                $scope.st.tflag=2;
               $window.location.href="#/app/search";
        }else{
           $window.location.href="#/app/playlists";
       }

   } 

   $scope.caller = function(){  
     if(this.busname.length > 30){
       var alertPopup = $ionicPopup.alert({
                    title: 'Print Restriction',
                    template: '<center> Bus name should be less than 32 character </center>'
            });
       return false;
      }
      if(this.busaddress.length > 30){
           var alertPopup = $ionicPopup.alert({
                    title: 'Print Restriction',
                    template: '<center> Bus Address should be less than 32 character </center>'
            });
           return false;
      }
      $scope.printer="printing..";
       var jsonn = {func:"sum",dater:$scope.dater,source:$scope.source,busname:$scope.busname,busaddress:$scope.busaddress,destination:$scope.destination,
      busfare:$scope.busfare,firstname:$scope.st.fn,lastname:$scope.st.ln,mobile:$scope.st.mbn,
      idn:$scope.st.idn,ticket:$scope.st.tikno,total:$scope.total,seat:$scope.st.tkts,busid:$scope.st.bbname,agent:$scope.st.agentname};

      console.log(jsonn);
       cordova.plugins.Keyboard.justprint(jsonn);
      $scope.printer="printed";
      }
  });
}])


.controller('BooksumCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
  $scope.st = bus;
   $scope.$on('$ionicView.enter', function() { //+



  $scope.loading =true;
  $scope.notfound = false;
  $scope.nloading=false;
  $scope.printer = "Print";

    $scope.busname = "MOYALE RAHA TRANSPORTERS";
        $scope.busaddress = "NAIROBI";

   $scope.cancel = function(){
    $window.location.href="#/app/playlists";
   }


  var geturl ="http://www.avanettech.co.ke/avttms/app/agent_date.php?agent_id="+$scope.st.agent_id;
     console.log(geturl);   
       $http.get(geturl).success(function(response){     
              if(response[0]){
                  if(response[0].status = "success"){
                      $scope.nob = response[0].total_seat;
                      $scope.tfc = "KShs. "+response[0].total_fare;
                      $scope.loading =false;
                      $scope.nloading = true;
                  }

              }else{
                  $scope.loading =false;
                  $scope.notfound = true;
              }
        
          console.log(geturl);
           }).error(function(data){
              $scope.loading =false;
              $scope.notfound = true;              
            });
        
        $scope.caller = function(){
        if(this.busname.length > 30){
             var alertPopup = $ionicPopup.alert({
                   title: 'Print Restriction',
                   template: '<center> Bus name should be less than 32 character </center>'
                });
                return false;
             }
          if(this.busaddress.length > 30){
              var alertPopup = $ionicPopup.alert({
                     title: 'Print Restriction',
                     template: '<center> Bus Address should be less than 32 character </center>'
              });
                return false;
            }

            var json = {func:"booksum",nob:$scope.nob,tfc:$scope.tfc,agent:$scope.st.agentname,busname:this.busname,busaddress:this.busaddress};
            console.log(json);
            $scope.printer = "Printing ..";
            cordova.plugins.Keyboard.justprint(json);
            $scope.printer = "Printed";
         }
      
      })

}])

//History Control
.controller('historyCtrl',['$rootScope','$scope','$http','$filter','$location','$window','bus', '$state', function($rootScope,$scope,$http,$filter,$location,$window,bus,$state) {
  $scope.bk = bus;
   $scope.$on('$ionicView.enter', function() { //+ 
  $scope.results = []
   $scope.notfound =false;
   $scope.dataLoaded = false;
   $scope.loading =true;
   $scope.cks = false;

   var geturl ="http://www.avanettech.co.ke/avttms/app/history1.php?agent_id="+$scope.bk.agent_id;
    console.log(geturl);   
       $http.get(geturl).success(function(response){     
           
              if(response[0]){
                    $scope.loading =false;
                    $scope.dataLoaded = true;
                    $scope.results = response;
              }else{
                  $scope.loading=false;
                  $scope.dataLoaded=false;
                  $scope.notfound = true;
              }
        
          console.log(geturl);
           }).error(function(data){
            $scope.loading =false;
            $scope.dataLoaded = false;
            $scope.notfound = true;
                });
}) 

   $scope.cancel = function(v1,v2,v3,v4,v5,v6){
      $scope.bk.cbusid  =v1;
      $scope.bk.cticket =v2;
      $scope.bk.camt = v3.trim().split(',')[0] * v3.split(',').length ;
      $scope.bk.seat = v4;
      $scope.bk.bname = v5;
      $scope.bk.btype = v6;
      $window.location.href="#/app/cancel";
   }
}])



.controller('cancelCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
  $scope.bk = bus;
  $scope.cl=$scope.bk.seat;
  $scope.can = "Cancel"
  $scope.results = [];
  $scope.cancelbutton=true;

   
   $scope.$on('$ionicView.enter', function() { 
     var test = $scope.bk.seat.split(',');
     $scope.clst = $scope.cl;
      $scope.changing = function(du){
          var temp = du.split(',');
          for(var i=0;i<temp.length;i++){
               if(test.indexOf(temp[i]) == -1){
                  var alertPopxup = $ionicPopup.alert({
                    title: 'Ticket Cancellation Failure',
                    template: ' <center> Please, Check seat no! </center>'
                  });
                 return false;
               }
          }
       $scope.clst=du;
       $scope.cancel();
  }
   $scope.cancel = function(){//+$scope.bk.agent_id
     var flag= "no";
        var alertPopup = $ionicPopup.alert({
                    title: 'Conformation',
                    template: '<center> Are you sure to cancel? </center>',
                    buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
                      text: 'Yes',
                      type: 'button-positive',
                      onTap: function(e) {
                        // Returning a value will cause the promise to resolve with the given value.
                       return true;
                      }
                    },{
                    text: 'No',
                    type: 'button-default',
                    onTap: function(e) {
                       // e.preventDefault() will stop the popup from closing when tapped.
                      return false;
                      }
                    }]

                  });           
        alertPopup.then(function(res) {
     if(res) {
       console.log('You are sure'); 
      console.log($scope.cl);
    $scope.can = "cancelling..."
  var geturl ="http://www.avanettech.co.ke/avttms/app/cancel.php?agent_id="+$scope.bk.agent_id+"&bus_id="+$scope.bk.cbusid+"&seat_no="+$scope.clst+"&ticket_id="+$scope.bk.cticket;
    console.log(geturl);   
       $http.get(geturl).success(function(response){     
           
              if(response[0]){
                  if(response[0].status = "success"){
                   
                    var alertPopup = $ionicPopup.alert({
                    title: 'Ticket Cancellation',
                    template: '<center> Ticket has been cancelled </center> <br> <center> Thank you </center>'
                  });
                   $scope.can = "cancelled";
                    $scope.cancelbutton=false;
                  }

              }else{
                  var alertPopup = $ionicPopup.alert({
                    title: 'Ticket Cancellation Failure',
                    template: '<center> please retry again </center>'
                  });
              }
        
          console.log(geturl);
           }).error(function(data){
                var alertPopup = $ionicPopup.alert({
                    title: 'Network problem',
                    template: '<center> Retry again </center>'
                  });             
            });
          
           } else {
       console.log('You are not sure');
     }
   
  });
      }
}); 

    $scope.back = function(){
    $window.location.href="#/app/history"
  }

}])






.controller('historypCtrl',['$rootScope','$scope','$http','$filter','$location','$window','bus', '$state', function($rootScope,$scope,$http,$filter,$location,$window,bus,$state) {
  $scope.bk = bus;
   $scope.$on('$ionicView.enter', function() { //+ 
  $scope.results = []
   $scope.notfound =false;
   $scope.dataLoaded = false;
   $scope.loading =true;
   $scope.cks = false;
  
       var geturl ="http://www.avanettech.co.ke/avttms/app/history1.php?agent_id="+$scope.bk.agent_id;
    console.log(geturl);   
       $http.get(geturl).success(function(response){     
           
              if(response[0]){
                    $scope.loading =false;
                    $scope.dataLoaded = true;
                    $scope.results = response;
              }else{
                  $scope.loading=false;
                  $scope.dataLoaded=false;
                  $scope.notfound = true;
              }
        
          console.log(geturl);
           }).error(function(data){
            $scope.loading =false;
            $scope.dataLoaded = false;
            $scope.notfound = true;
                });
}) 

   $scope.cancel = function(v1,v2,v3,v4){
      $scope.bk.pbusid  =v1;
      $scope.bk.ptick = v2;
      $scope.bk.pdate = v3;
      $scope.bk.pbusname = v4;
      $window.location.href="#/app/printsum";
   }

}])

//Print ticket
.controller('printsumCtrl',['$rootScope','$scope','$http','$location','$window','bus','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,bus,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {
  $scope.st = bus;
  $scope.$on('$ionicView.enter', function() {
     $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
       $ionicLoading.show({template: 'Loading'});
      $scope.busname = "MOYALE RAHA TRANSPORTERS";
    $scope.busaddress = "NAIROBI"
  var geturl = "http://www.avanettech.co.ke/avttms/app/ticket.php?bus_id="+$scope.st.pbusid+"&dat="+$scope.st.pdate+"&ticket="+$scope.st.ptick;
  console.log(geturl);
  $http.get(geturl).success(function(response){

    $scope.str = response;
     $ionicLoading.hide();
  
  $scope.fn = $scope.str.firstname.split(','); 
  $scope.ln = $scope.str.lastname.split(','); 
  $scope.mob = $scope.str.mob.split(',');
  $scope.idn = $scope.str.id.split(',');

  $scope.names = [];
  $scope.ids = [];
  $scope.printer="Print"
  $scope.mobs = [];
        $scope.source = $scope.str.frm;
        $scope.destination = $scope.str.to;
        $scope.dater=$scope.str.dat;
        $scope.busfare = $scope.str.fare;
      $scope.total = $scope.str.mob.split(',').length * $scope.busfare;

  $scope.dnarray = $scope.str.id.split(',');

   for(var i=0;i < $scope.dnarray.length ; i++){
    //console.log($scope.fn[i]+' '+$scope.ln[i]);
    var temp =$scope.fn[i]+' '+$scope.ln[i];
      $scope.names.push(temp);
      $scope.ids.push($scope.idn[i]);
      $scope.mobs.push($scope.mob[i]);
    } 

   $scope.cancel = function(){
        $window.location.href="#/app/playlists";
   } 

   $scope.caller = function(){  
      
      if(this.busname.length > 30){
       var alertPopup = $ionicPopup.alert({
                    title: 'Print Restriction',
                    template: '<center> Bus name should be less than 32 character </center>'
            });
       return false;
      }
      if(this.busaddress.length > 30){
           var alertPopup = $ionicPopup.alert({
                    title: 'Print Restriction',
                    template: '<center> Bus Address should be less than 32 character </center>'
            });
           return false;
      }
      $scope.printer="printing..";

       var jsonn = {func:"sum",dater:$scope.dater,busname:$scope.busname,busaddress:$scope.busaddress,ticket:$scope.st.ptick,source:$scope.source,destination:$scope.destination,
      busfare:$scope.busfare,firstname:$scope.str.firstname,lastname:$scope.str.lastname,mobile:$scope.str.mob,
      idn:$scope.str.id,total:$scope.total,seat:$scope.str.seat_id,busid:$scope.st.pbusname,agent:$scope.st.agentname};
      console.log(jsonn);
       cordova.plugins.Keyboard.justprint(jsonn);
      $scope.printer="printed";
      }
  });
});

}])




.controller('PlaylistCtrl', function($scope, $stateParams) {
});
