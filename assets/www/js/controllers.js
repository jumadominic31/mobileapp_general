

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
     //this.url           = "https://avanettech.co.ke/fuelstapp/api";
     this.url           = "http://10.0.2.2:8000/api";
     this.token         = "";
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, fuelstation) {

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

        $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
        });

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.doLogin = function() {
            $scope.username = this.username;
            $scope.fs.username = this.username;

            $scope.login_url = $scope.fs.url+'/user/signin';
            var user = {
                username:   this.username,
                password:   this.password,
            }
            var config = {
                headers : {
                //'X-Requested-With': 'XMLHttpRequest;'
                'Content-Type': 'application/json;'
                }
            }
            $http.post($scope.login_url, user, config).
            then(function successCallback(response) {
            	console.log(JSON.stringify(response));
            	$ionicLoading.show({template: 'Logging-in'});
                $scope.token = response.data.token;
                $scope.fs.token = $scope.token;
                $ionicLoading.hide();
                $window.location.href="#/app/sale";
             }, function errorCallback(response) {
            console.log(JSON.stringify(response));
            var alertPopup = $ionicPopup.alert({
            	title: 'Login Failure',
            	template: '<center>Please enter correct username/password</center>'
            	});
            });
        }
})


//Sale details
.controller('SaleCtrl',['$rootScope','$timeout','$scope','$http','$filter','$location','$window','fuelstation', '$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state', function($rootScope,$timeout,$scope,$http,$filter,$location,$window,fuelstation,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {

        $scope.fs           = fuelstation;
        $scope.token        = $scope.fs.token;
        $scope.username     = $scope.fs.username;

        var date = new Date();
        $scope.rate_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        ///get userid and stationid
        $scope.userdetails_url = $scope.fs.url+'/user/'+$scope.username+'?token='+$scope.token;

        var username = {
            username:   $scope.username
        }
        $http.get($scope.userdetails_url, username).
        then(function successCallback(response) {
            console.log(JSON.stringify(response));
            $scope.userid = response.data[0].id;
            $scope.stationid = response.data[0].stationid;
            $scope.station = response.data[0].station;
            $scope.fs.userid       = $scope.userid;
            $scope.fs.stationid    = $scope.stationid;
            $scope.fs.station      = $scope.station;
            console.log($scope.fs.station);
        }, function errorCallback(response) {
           console.log(JSON.stringify(response));
        });


        ////
        $scope.txns_url          = $scope.fs.url+'/txns?token='+$scope.token;

        //$scope.fs.station   = "Uthiru";


        $scope.fueltype     = $scope.fs.fueltype;
        $scope.payment      = $scope.fs.payment;


        $scope.makesale = function(){

                if (this.vehregno && this.amount && this.ftype && this.pmethod ) {
                        $scope.vehregno  = this.vehregno;
                        $scope.amount    = this.amount;
                        $scope.ftype     = this.ftype;
                        $scope.pmethod   = this.pmethod;

                        $scope.fs.vehregno  = this.vehregno;
                        $scope.fs.amount    = this.amount;
                        $scope.fs.ftype     = this.ftype;
                        $scope.fs.pmethod   = this.pmethod;

                        $scope.rates_url    = $scope.fs.url+'/rates/'+$scope.rate_date+'?token='+$scope.token;
                        console.log($scope.rates_url);
                        $http.get($scope.rates_url).
                        then(function successCallback(response) {
                            console.log(JSON.stringify(response));
                            for (var i = 0; i < response.data.length; i++) {
                                var data = response.data[i];
                                if (data.fueltype == 'diesel'){
                                    $scope.rate_diesel = data.sellprice;
                                    $scope.fs.rate_diesel = $scope.rate_diesel;
                                    console.log($scope.rate_diesel);
                                } else if (data.fueltype == 'petrol'){
                                    $scope.rate_petrol = data.sellprice;
                                    $scope.fs.rate_petrol = $scope.rate_petrol;
                                    console.log($scope.rate_petrol);
                                }
                            }
                            console.log($scope.ftype);
                            if ($scope.ftype == 'Diesel'){
                                $scope.rate = $scope.fs.rate_diesel;
                                console.log($scope.rate);
                            } else if ($scope.ftype == 'Petrol'){
                                $scope.rate = $scope.fs.rate_petrol;
                                console.log($scope.rate);
                            }

                            $scope.volume    = Math.round($scope.amount/$scope.rate*100)/100;
                            $scope.fs.volume = $scope.volume;
                            console.log($scope.rate);
                            console.log($scope.volume);

                        }, function errorCallback(response) {
                           console.log(response);
                        });

                        $timeout( function () {
                            var txn = {
                                    userid:     $scope.userid,
                                    stationid:  $scope.stationid,
                                    vehregno:   $scope.vehregno,
                                    amount:     $scope.amount,
                                    volume:     $scope.volume,
                                    sellprice:  $scope.rate,
                                    fueltype:   $scope.ftype,
                                    paymethod:  $scope.pmethod
                            }

                            var config = {
                                headers : {
                                    'Content-Type': 'application/json;'
                                }
                            }

                             $http.post($scope.txns_url, txn, config).
                             then(function successCallback(response) {
                                console.log(JSON.stringify(response));
                                $scope.receipt = response.data.txn.receiptno;
                                $scope.fs.receipt = $scope.receipt;
                                console.log($scope.receipt);
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Sales complete',
                                    template: 'Receipt no      :'+$scope.receipt+
                                    '<br> Amount (KShs)  :'+$scope.fs.amount+
                                    '<br> Volume (l) :'+$scope.volume
                                });
                                $window.location.href="#/app/salesumm";
                              }, function errorCallback(response) {
                              console.log(JSON.stringify(response));
                               var alertPopup = $ionicPopup.alert({
                                    title: 'Sale transaction failed',
                                    template: '<center> You cannot make the sale now</center>'
                                });
                              });
                              }, 5000);

                             //time
                             $scope.time = 0;
                             //timer callback
                             var timer = function() {
                               if( $scope.time < 5000 ) {
                                  $scope.time += 1000;
                                  $timeout(timer, 1000);
                               }
                             }
                             //run!!
                             $timeout(timer, 1000);
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
        $scope.companyname  = $scope.fs.companyname;
        $scope.companyaddr  = $scope.fs.companyaddr;
        $scope.username       = $scope.fs.username;
        $scope.station      = $scope.fs.station;
        $scope.receipt      = $scope.fs.receipt;
        $scope.vehregno     = $scope.fs.vehregno;
        $scope.amount    = $scope.fs.amount;
        $scope.ftype     = $scope.fs.ftype;
        $scope.pmethod   = $scope.fs.pmethod;
        $scope.volume    = $scope.fs.volume;

        $scope.$on('$ionicView.enter', function() {
            $scope.loading  = true;
            $scope.notfound = false;
            $scope.nloading = false;
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
        });
        $scope.loading =false;
        $scope.nloading = true;
     

        $scope.cancel = function(){
            $window.location.href="#/app/sale";
        }

        $scope.caller = function(){

            $scope.printer="printing..";
            var jsonn = {func:"fuelstsale", companyname:$scope.companyname, companyaddr:$scope.companyaddr,
              station:$scope.station, receipt:$scope.receipt, vehregno:$scope.vehregno, amount:$scope.amount,
              ftype: $scope.ftype, pmethod:$scope.pmethod, volume:$scope.volume, username:$scope.username};
            console.log(jsonn);
            cordova.plugins.Keyboard.justprint(jsonn);
            $scope.printer="Printed";
        }
  });
}])

//Daily Summary
.controller('DailysummCtrl',['$rootScope','$scope','$http','$location','$window','fuelstation','$ionicHistory','$ionicSideMenuDelegate','$ionicLoading','$ionicPopup','$timeout','$state',  function($rootScope,$scope,$http,$location,$window,fuelstation,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$ionicPopup,$timeout,$state) {

        $scope.fs           = fuelstation;
        $scope.token        = $scope.fs.token;
        $scope.url          = $scope.fs.url;

        var date = new Date();
        $scope.txnsumm_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

        $scope.userid       = $scope.fs.userid;
        $scope.username     = $scope.fs.username;

        $scope.summ_amt     = 0;
        $scope.summ_cash    = 0;
        $scope.summ_mpesa   = 0;
        $scope.summ_volume  = 0;
        $scope.summ_petrol  = 0;
        $scope.summ_diesel  = 0;

        $scope.$on('$ionicView.enter', function() { //+
            $scope.loading  = true;
            $scope.notfound = false;
            $scope.nloading = false;
            $scope.printer = "Print";

        $scope.txnsumm_url = $scope.url+'/txns/'+$scope.userid+'/'+$scope.txnsumm_date+'?token='+$scope.token;
        console.log($scope.txnsumm_url);
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
            $scope.companyname  = $scope.fs.companyname;
            $scope.companyaddr  = $scope.fs.companyaddr;
            $scope.station      = $scope.fs.station;
            $scope.fs.summ_amt     = $scope.summ_amt;
            $scope.fs.summ_cash    = $scope.summ_cash;
            $scope.fs.summ_mpesa   = $scope.summ_mpesa;
            $scope.fs.summ_volume  = $scope.summ_volume;
            $scope.fs.summ_petrol  = $scope.summ_petrol;
            $scope.fs.summ_diesel  = $scope.summ_diesel;
        }, function errorCallback(response) {
           console.log(response);
        });

        $scope.cancel = function(){
            $window.location.href="#/app/sale";
        }
        $scope.caller = function(){

            var json = {func:"fuelstdailysumm", companyname:$scope.companyname, companyaddr:$scope.companyaddr,
              station:$scope.station, username:$scope.username, summ_amt:$scope.summ_amt, summ_cash:$scope.summ_cash,
              summ_mpesa:$scope.summ_mpesa, summ_volume:$scope.summ_volume, summ_petrol:$scope.summ_petrol,
              summ_diesel:$scope.summ_diesel};

            $scope.printer = "Printing ..";
            cordova.plugins.Keyboard.justprint(json);
            $scope.printer = "Printed";
         }
      
      })

}])