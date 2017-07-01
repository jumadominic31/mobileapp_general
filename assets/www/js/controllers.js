

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
     this.rate_diesel   = ""; //Daily diesel fuel selling rate
     this.rate_petrol   = ""; //Daily petrol fuel selling rate
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

        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $scope.fs           = fuelstation;

        var date = new Date();
        $scope.rate_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        $scope.txns_url          = $scope.fs.url+'/txns';
        $scope.rates_url          = $scope.fs.url+'/rates/'+$scope.rate_date;

        $scope.fs.userid    = '1';
        $scope.userid       = $scope.fs.userid;
        $scope.fs.stationid = '1';
        $scope.stationid    = $scope.fs.stationid;

        $scope.fueltype     = $scope.fs.fueltype;
        $scope.payment      = $scope.fs.payment;

        $scope.fs.station   = "Kakamega";
        $scope.station      = $scope.fs.station;

        $http.get($scope.rates_url).
        then(function successCallback(response) {
            //console.log(JSON.stringify(response));
            for (var i = 0; i < response.data.length; i++) {
                var data = response.data[i];
                if (data.fueltype == 'diesel'){
                    $scope.rate_diesel = data.sellprice;
                    $scope.fs.rate_diesel = $scope.rate_diesel;
                    //console.log($scope.rate_diesel);
                } else if (data.fueltype == 'petrol'){
                    $scope.rate_petrol = data.sellprice;
                    $scope.fs.rate_petrol = $scope.rate_petrol;
                    //console.log($scope.rate_petrol);
                }
            }
        }, function errorCallback(response) {
           console.log(response.message);
        });

        $scope.makesale = function(){
        if (this.vehregno && this.amount && this.ftype && this.pmethod ) {
                $scope.fs.vehregno  = this.vehregno;
                $scope.fs.amount    = this.amount;
                $scope.fs.ftype     = this.ftype;
                $scope.fs.pmethod   = this.pmethod;

                //START OF BOOKING
                //$scope.printer = "Booking...";
                //$scope.fs.receipt = "KZN59909480";
                //$scope.printer="Sale completed";

                if (this.ftype == 'Diesel'){
                    $scope.rate = $scope.fs.rate_diesel;
                } else if (this.ftype == 'Petrol'){
                    $scope.rate = $scope.fs.rate_petrol;
                }

                $scope.fs.volume    = Math.round(this.amount/$scope.rate*100)/100;
                $scope.volume       = $scope.fs.volume;

                var txn = {
                        userid:     $scope.userid,
                        stationid:  $scope.stationid,
                        vehregno:   this.vehregno,
                        amount:     this.amount,
                        volume:     $scope.volume,
                        sellprice:  $scope.rate,
                        fueltype:   this.ftype,
                        paymethod:  this.pmethod
                }

                var config = {
                    headers : {
                        'Content-Type': 'application/json;'
                    }
                }

                $http.post($scope.txns_url, txn, config).
                 then(function successCallback(response) {
                    console.log(JSON.stringify(response));
                    $scope.receipt = response.data.receiptno;
                    $scope.fs.receipt = $scope.receipt;
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales complete',
                        template: 'Receipt no      :'+$scope.receipt+
                        '<br> Amount (KShs)  :'+$scope.fs.amount+
                        '<br> Volume (l) :'+$scope.volume
                    });
                    $window.location.href="#/app/salesumm";
                  }, function errorCallback(response) {
                   var alertPopup = $ionicPopup.alert({
                        title: 'Booking Failure',
                        template: '<center> You cannot book the vehicle now </center>'
                    });
                  });
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

        var date = new Date();
        $scope.txnsumm_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        $scope.userid = '1';

        $scope.summ_amt     = 0;
        $scope.summ_cash    = 0;
        $scope.summ_mpesa   = 0;
        $scope.summ_volume  = 0;
        $scope.summ_petrol  = 0;
        $scope.summ_diesel  = 0;

        $scope.txnsumm_url     = $scope.fs.url+'/txns/'+$scope.userid+'/'+$scope.txnsumm_date;





        $scope.$on('$ionicView.enter', function() { //+
            $scope.loading  = true;
            $scope.notfound = false;
            $scope.nloading = false;
            $scope.printer = "Print";

        $scope.cancel = function(){
            $window.location.href="#/app/sale";
        }

        $http.get($scope.txnsumm_url).
        then(function successCallback(response) {
            console.log(JSON.stringify(response));
            for (var i = 0; i < response.data.length; i++) {
                var data = response.data[i];

                if (data.fueltype == 'diesel'){
                    $scope.summ_diesel = $scope.summ_diesel + Math.round(parseFloat(data.total_vol)*100)/100;

                    if (data.paymethod == 'Cash'){
                        $scope.summ_cash = $scope.summ_cash + Math.round(parseFloat(data.total_sales)*100)/100;

                    } else if (data.paymethod == 'MPesa'){
                       $scope.summ_mpesa = $scope.summ_mpesa + Math.round(parseFloat(data.total_sales)*100)/100;

                   }

                } else if (data.fueltype == 'petrol'){
                    $scope.summ_petrol = $scope.summ_petrol + Math.round(parseFloat(data.total_vol)*100)/100;

                    if (data.paymethod == 'Cash'){
                        $scope.summ_cash = $scope.summ_cash + Math.round(parseFloat(data.total_sales)*100)/100;

                    } else if (data.paymethod == 'MPesa'){
                       $scope.summ_mpesa = $scope.summ_mpesa + Math.round(parseFloat(data.total_sales)*100)/100;

                   }
                }
            }
            $scope.summ_amt     = Math.round(($scope.summ_cash + $scope.summ_mpesa)*100)/100;
            $scope.summ_volume  = Math.round(($scope.summ_petrol + $scope.summ_diesel)*100)/100 ;
            $scope.loading =false;
            $scope.nloading = true;
        }, function errorCallback(response) {
           console.log(response.message);
        });


        $scope.companyname  = $scope.fs.companyname;
        $scope.companyaddr  = $scope.fs.companyaddr;
        $scope.station      = $scope.fs.station;
        $scope.fs.summ_amt     = $scope.summ_amt;
        $scope.fs.summ_cash    = $scope.summ_cash;
        $scope.fs.summ_mpesa   = $scope.summ_mpesa;
        $scope.fs.summ_volume  = $scope.summ_volume;
        $scope.fs.summ_petrol  = $scope.summ_petrol;
        $scope.fs.summ_diesel  = $scope.summ_diesel;



        $scope.caller = function(){

            /*var json = {func:"booksum",nob:$scope.nob,tfc:$scope.tfc,agent:$scope.st.agentname,busname:this.busname,busaddress:this.busaddress};
            console.log(json);
            $scope.printer = "Printing ..";
            cordova.plugins.Keyboard.justprint(json);*/
            $scope.printer = "Printed";
         }
      
      })

}])