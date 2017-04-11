// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
.state('app.seat', {
      url: '/seat',
      views: {
        'menuContent': {
          templateUrl: 'templates/seat.html',
          controller: 'SeatCtrl'
        }
      }
    })
.state('app.book', {
      url: '/book',
      views: {
        'menuContent': {
          templateUrl: 'templates/book.html',
          controller: 'BookCtrl'
        }
      }
    })
.state('app.booksum', {
      url: '/booksum',
      views: {
        'menuContent': {
          templateUrl: 'templates/booksum.html',
          controller: 'BooksumCtrl'
        }
      }
    })
.state('app.bdetails', {
      url: '/bdetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/bdetails.html',
          controller: 'bdetailsCtrl'
        }
      }
    })
.state('app.sum', {
      url: '/sum',
      views: {
        'menuContent': {
          templateUrl: 'templates/sum.html',
          controller: 'sumCtrl'
        }
      }
    })
  .state('app.browse', {
      url: '/browse',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.history', {
      url: '/history',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })

    .state('app.printsum', {
      url: '/printsum',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/printsum.html',
          controller: 'printsumCtrl'
        }
      }
    })
    
    .state('app.historyp',{
      url: '/historyp',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/historyp.html',
          controller: 'historypCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.cancel', {
    url: '/cancel',
   views: {
      'menuContent': {
        templateUrl: 'templates/cancel.html',
        controller: 'cancelCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});
