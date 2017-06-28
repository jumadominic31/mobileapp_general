

angular.module('starter.controllers', [])

.service('fuelstation',function(){
     this.userid      = "";
     this.username      = "";
     this.password      = "";
     this.fullname      = "";
     this.stationid     = "";
     this.station       = "";
     this.vehregno      = "";
     this.amount        = "";
     this.volume        = "";
     this.fueltype      = ["Diesel", "Petrol"];
     this.payment       = ["Cash", "MPesa"];
     this.ftype         = ""; //fuel type filled
     this.pmethod       = ""; //payment method used
     this.companyname   = "NUCLEUR INVESTMENTS LTD";
     this.companyaddr   = "NAIROBI";
     this.date          = "";
     this.time          = "";
     this.summ_amt      = ""; //Daily summary amount
     this.summ_cash     = ""; //Daily summary cash amount
     this.summ_mpesa    = ""; //Daily summary MPesa amount
     this.summ_volume   = ""; //Daily summary volume
     this.summ_diesel   = ""; //Daily summary diesel volume
     this.summ_petrol   = ""; //Daily summary petrol volume
     this.rate_diesel   = ""; //Daily petrol fuel selling rate
     this.url           = "https://avanettech.co.ke/fuelstapp/api";
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, fuelstation) {

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

  $scope.fs  = fuelstation;

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
  $scope.url=$scope.fs.url;
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
.controller('BrowseCtrl',function($scope,$window,$http,$ionicSideMenuDelegate,$ionicHistory,$ionicLoading,$ionicPopup,fuelstation){

        $scope.fs = fuelstation;

        $scope.url = $scope.fs.url;

        $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
        });
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.doLogin = function() {
                if(this.username && this.password){
                        if (this.username == "test" && this.password == "test"){
                                $window.location.href="#/app/sale"
                        }
                        else {
                                 var alertPopup = $ionicPopup.alert({
                                        title: 'Login Failed',
                                        template:'<center>Please enter correct username/password</center>'
                                });
                        }

                        /*console.log($scope.url+"login.php?id="+this.uname+"&fname="+this.password);
                        $ionicLoading.show({template: 'Logging-in'});
                        //$scope.b.agentname = this.uname;
                        $http.get($scope.url+"login.php?id="+this.uname+"&fname="+this.password).success(function(response){
                                $scope.login = response[0];
                                $ionicLoading.hide();
                                console.log($scope.login);
                                if($scope.login.status == "Success"){
                                        $scope.fs.userid    = $scope.login.userid;
                                        $scope.fs.username  = $scope.login.username;
                                        $scope.fs.fullname  = $scope.login.fullname;
                                        $scope.fs.stationid = $scope.login.stationid;
                                        $scope.fs.station   = $scope.login.station;
                                        $window.location.href="#/app/sale"
                                }
                                else {
                                        var alertPopup = $ionicPopup.alert({
                                                title: 'Login Failed',
                                                template: '<center> Invalid Username or Password </center>'
                                        });
                                }
                        }).error(function(data){
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                        title: '<center> No network connection </center>'
                                });
                        });
                }
                else {
                        var alertPopup = $ionicPopup.alert({
                                title: 'Login Failed',
                                template:'<center>Please enter correct username/password</center>'
                        });*/
                }
        }
})


//Sale details
.controller('SaleCtrl',['$rootScope','$scope','$http','$filter','$location','$window','fuelstation', '$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state', function($rootScope,$scope,$http,$filter,$location,$window,fuelstation,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {

        $scope.fs           = fuelstation;

        $scope.url          = $scope.fs.url;
        $scope.stationid    = $scope.fs.stationid;
        //$scope.station      = $scope.fs.station;
        $scope.fueltype     = $scope.fs.fueltype;
        $scope.payment      = $scope.fs.payment;
        $scope.fs.rate      = 100;
        $scope.fs.station   = "Kakamega";
        $scope.rate         = $scope.fs.rate;
        $scope.station      = $scope.fs.station;

        $scope.makesale = function(){
        if (this.vehregno && this.amount && this.ftype && this.pmethod ) {
                $scope.fs.vehregno  = this.vehregno;
                $scope.fs.amount    = this.amount;
                $scope.fs.ftype     = this.ftype;
                $scope.fs.pmethod   = this.pmethod;
                $scope.fs.volume    = this.amount/$scope.rate;
                $scope.volume       = $scope.fs.volume;

                //START OF BOOKING
                //$scope.printer = "Booking...";

                $scope.fs.receipt = "KZN59909480";
                $scope.receipt = $scope.fs.receipt;

                var alertPopup = $ionicPopup.alert({
                    title: 'Sales complete',
                    template: 'Receipt no      :'+$scope.receipt+
                    '<br> Amount (KShs)  :'+this.amount+
                    '<br> Volume (l) :'+$scope.volume
                });

                //$scope.printer="Sale completed";
                $window.location.href="#/app/salesumm";

            /*console.log(1);
            var geturl = $scope.url+"book.php?Busid="+$scope.bus.selectedbus+"&date="+$scope.bus.dt+"&fare="+$scope.bus.busfare+"&fromTown="+$scope.bus.sour+"&toTown="+$scope.bus.dest+"&user_id="+$scope.bus.agent_id+"&pass_name="+$scope.bus.passname;
            $http.get(geturl).success(function(response){
                console.log(geturl);
                console.log(response);
                var checkst = response[0];
                console.log(checkst.status);
                if(checkst.status == "success"){
                    $scope.bus.tikno = checkst.ticket;

                    $scope.bus.totfare = checkst.busfare;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Ticket has been booked',
                        template: 'Ticket no      :'+checkst.ticket+
                        '<br> Fare amount     :'+checkst.busfare+
                        '<br> Date of Journey :'+checkst.Date_of_Journey
                    });
                    $scope.print();
                }

                if(checkst.status == "failure"){
                    console.log('succ');
                    var alertPopup = $ionicPopup.alert({
                        title: 'Booking Failure',
                        template: '<center> You cannot book the vehicle now </center>'
                    });
                    $scope.printer="Retry";

                }
            }).error(function(data){

                var alertPopup = $ionicPopup.alert({
                    title: 'Network problem',
                    template: '<center> Kindly retry again </center>'
                });
                $scope.printer="Retry";

            }); */


            //END OF BOOKING
    }
    else{
       var alertPopup = $ionicPopup.alert({
                    title: 'Make sale',
                    template: '<center> Please fill in the missing information </center>'
                  });
    }
  }

}])


//Print sale receipt
.controller('SalesummCtrl',['$rootScope','$scope','$http','$location','$window','fuelstation','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,fuelstation,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {

        $scope.fs           = fuelstation;

        $scope.printer      = "Print";

        $scope.url          = $scope.fs.url;
        $scope.companyname  = $scope.fs.companyname;
        $scope.companyaddr  = $scope.fs.companyaddr;
        $scope.station      = $scope.fs.station;
        $scope.receipt      = $scope.fs.receipt;
        $scope.vehregno     = $scope.fs.vehregno;
        $scope.amount    = $scope.fs.amount;
        $scope.ftype     = $scope.fs.ftype;
        $scope.pmethod   = $scope.fs.pmethod;
        $scope.volume    = $scope.fs.volume;

        $scope.$on('$ionicView.enter', function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
        });
     

        $scope.cancel = function(){
            $window.location.href="#/app/sale";
        }

        $scope.caller = function(){

            $scope.printer="printing..";
              /* var jsonn = {func:"sum",dater:$scope.dater,source:$scope.source,busname:$scope.busname,busaddress:$scope.busaddress,destination:$scope.destination,
              busfare:$scope.st.busfare,firstname:$scope.st.fn,lastname:$scope.st.ln,mobile:$scope.st.mbn,
              idn:$scope.st.idn,ticket:$scope.st.tikno,total:$scope.total,seat:$scope.st.tkts,busid:$scope.st.bbname,agent:$scope.st.agentname};

              console.log(jsonn);
               cordova.plugins.Keyboard.justprint(jsonn);*/
            $scope.printer="Printed";
        }
  });
}])

//Daily Summary
.controller('DailysummCtrl',['$rootScope','$scope','$http','$location','$window','fuelstation','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,fuelstation,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {

        $scope.fs           = fuelstation;

        $scope.fs.summ_amt     = 10000;
        $scope.fs.summ_cash    = 8000;
        $scope.fs.summ_mpesa   = 2000;
        $scope.fs.summ_volume  = 150;
        $scope.fs.summ_petrol  = 70;
        $scope.fs.summ_diesel  = 80;

        $scope.$on('$ionicView.enter', function() { //+
            //$scope.loading =true;
            //$scope.notfound = false;
            //$scope.nloading=false;
            $scope.printer = "Print";

        $scope.cancel = function(){
            $window.location.href="#/app/sale";
        }

        $scope.url          = $scope.fs.url;
        $scope.companyname  = $scope.fs.companyname;
        $scope.companyaddr  = $scope.fs.companyaddr;
        $scope.station      = $scope.fs.station;
        $scope.summ_amt     = $scope.fs.summ_amt;
        $scope.summ_cash    = $scope.fs.summ_cash;
        $scope.summ_mpesa   = $scope.fs.summ_mpesa;
        $scope.summ_volume  = $scope.fs.summ_volume;
        $scope.summ_petrol  = $scope.fs.summ_petrol;
        $scope.summ_diesel  = $scope.fs.summ_diesel;
        $scope.loading      = false;
        $scope.notfound     = false;
        $scope.loading      = true;

  /*var geturl ="http://www.avanettech.co.ke/avttms/app/agent_date.php?agent_id="+$scope.st.agent_id;
     console.log(geturl);   
       $http.get(geturl).success(function(response){     
              if(response[0]){
                  if(response[0].status = "success"){
                      //Results go here
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
            });*/
        
        $scope.caller = function(){

            /*var json = {func:"booksum",nob:$scope.nob,tfc:$scope.tfc,agent:$scope.st.agentname,busname:this.busname,busaddress:this.busaddress};
            console.log(json);
            $scope.printer = "Printing ..";
            cordova.plugins.Keyboard.justprint(json);*/
            $scope.printer = "Printed";
         }
      
      })

}])