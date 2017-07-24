var app = angular.module("adminApp", ["ui.router", "ngStorage"]);

////////////////////////////////Page Views Count///////////////////////////////////

// app.run(function($rootScope, PageViews) {
//   $rootScope.$on('$stateChangeStart', function(e, toState) {
//     PageViews.add(toState.name);
//     $rootScope.stateName = toState.name;
//     $rootScope.pageViews = PageViews.get(toState.name);
//   });
// });

// app.factory('PageViews', function() {
//   localStorage.views = localStorage.views || '{}';
//   return {
//     add: function(stateName) {
//     var views = JSON.parse(localStorage.views);
//     console.log(views);
//     views[stateName] = views[stateName] || 0;
//     ++views[stateName];
//     localStorage.views = JSON.stringify(views);
//     },
//     get: function(stateName) {
//       var views = JSON.parse(localStorage.views);
//       return views[stateName] || 0;
//     }
//   };
// });



// //////////////////// Root Scope for this application /////////////////////////

app.run(['$rootScope', function($rootScope){

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
        console.log("in statechangestart");
        if(toState.resolve){
            $rootScope.isLoading = true;
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams){
        console.log("in stateChangeSuccess");
        if(toState.resolve){
            $rootScope.isLoading = false;
        }
    });

}]);



/////////////////////////////////End page Views Count////////////////////////////

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
  
    

    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
  
   $urlRouterProvider.otherwise('/');



   $stateProvider  
        // HOME STATES AND NESTED VIEWS ========================================
        .state('index', {
            url: '/',
            templateUrl: 'auth/login.html',
            controller: 'loginController'
            // resolve: {
            //       checkUserLoginStatus: checkUserLoginStatus
            //   }
        })
        
        // .state('logout', {
        //     url: '/logout',
        //     controller: 'logoutController',
        //     resolve: {
        //           checkUserLogout: checkUserLogout
        //       }
            
        // })
        
        .state('home', {
            url: '/view',
            templateUrl: 'view/home.html',
            controller: 'mainController',
            resolve:{
                userdetails: function(Data, $localStorage){
                    return Data.UserDetail($localStorage.storeid);
                }
            }
        })

        .state('home.bulk', {
            url:'/',
            templateUrl:'admin/notification/bulkorder.html',
            controller:'bulkCtrl'
        })

        .state('home.employee', {
            url: '/employee',
            templateUrl: 'employee/upshow.html'
            
        })

        .state('home.employee.details', {
            url:'/',
            templateUrl:'employee/index.html',
            controller: 'empCtrl',
            resolve:{
                allemployees: function(Data){
                    return Data.employeeAllRequest();
                }
            }
        })

        .state('home.employee.manage', {
            url: 'admin/manage/:manageid',
            templateUrl: 'employee/manage.html',
            controller: 'empmangeCtrl'
        })


        .state('home.employeeregistration', {
            url: '/employeeregistration',
            templateUrl: 'auth/register.html',
            controller: 'empRegistrationCtrl'
        })

        .state('home.employeeregistration.success', {
            url: '/employee/create',
            templateUrl: 'employee/reg_success.html',
            controller: 'empRegistrationCtrl'
        })


        .state('home.managerolepermission', {
            url: '/admin/roleNpermission',
            templateUrl: 'admin/permission.html',
            controller: 'manageroleNpermissionsCtrl'
        })

        .state('home.packages', {
            url: '/packages',
            templateUrl: 'package/package.html',
            controller: 'packageCtrl'
        })

        .state('home.packages.details', {
            url: '/',
            templateUrl: 'package/home.html',
            controller: 'packageCtrl'
        })

        .state('home.packages.urlcustomize', {
            url: '/urlcustomize',
            templateUrl: 'package/urlcostomized.html',
            controller: 'packageCtrl'
        })

        .state('home.packages.packagedetails', {
            url: '/package/:packageid',
            templateUrl: 'package/showpackage.html',
            controller: 'packagedetailsCtrl'
        })

        .state('home.packageordering', {
            url: '/packageordering',
            templateUrl: 'package/packageordering.html',
            controller: 'packageOrderingCtrl'
        })

        .state('home.packageordering.package', {
            url: '/package/:packageid',
            templateUrl: 'package/shopackage.html',
            controller: 'packagedetailsCtrl'
        })

        .state('home.vendors', {
            url: '/vendors',
            templateUrl: 'vendor/default.html',
            controller: 'vendorCtrl'
        })

        .state('home.items', {
            url: '/search/item',
            templateUrl: 'items/items.html',
            controller: 'itemsCtrl'
        })

        .state('home.items.details', {
            url: '/',
            templateUrl: 'items/search.html',
            controller: 'itemsCtrl'
        })

        .state('home.items.itemid', {
            url: '/item/:itemid',
            templateUrl: 'item/show.html',
            controller: 'itemdetailsCtrl'
        })
        

        .state('home.categories', {
            url: '/categories',
            templateUrl: 'categories/home.html',
            controller: 'categoriesCtrl'
        })

        .state('home.coupon', {
            url: '/coupon',
            templateUrl: 'coupon/coupon.html',
            controller: 'couponCtrl'
        })

        .state('home.coupon.details', {
            url: '/',
            templateUrl: 'coupon/create_coupon.html',
            controller: 'couponCtrl'
        })

        .state('home.cod', {
            url: '/cod/select',
            templateUrl: 'cod/select_user.html',
            controller: 'cashondeliveryCtrl'
        })

        .state('home.campaign', {
            url: '/campaign',
            templateUrl: 'campaign/upshow.html',
            controller: 'compaignCtrl'
        })

        .state('home.campaign.details', {
            url: '/',
            templateUrl: 'campaign/show.html',
            controller: 'compaignCtrl'
        })

        .state('home.campaign.create', {
            url: '/create',
            templateUrl: 'campaign/create.html',
            controller: 'compaignCtrl'
        })

        .state('home.campaign.upload', {
            url: '/upload',
            templateUrl: 'campaign/upload.html',
            controller: 'compaignCtrl'
        })

        .state('home.panorama', {
            url: '/panorama',
            templateUrl: 'panorama/show.html',
            controller: 'panoramaCtrl'
        })

        .state('home.project', {
            url: '/project',
            templateUrl: 'projects/upshow.html',
            controller: 'projectCtrl'
            // abstract: true
        })

        .state('home.project.details', {
            url: '/',
            templateUrl: 'projects/show.html',
            controller: 'projectCtrl'
        })

        .state('home.project.create', {
            url: '/create',
            templateUrl: 'projects/create.html',
            controller: 'projectCtrl'
        })

        .state('home.project.id', {
            url: '/:id',
            templateUrl: 'projects/upproject.html',
            controller: 'projectCtrl'
        })

        .state('home.project.id.details', {
            url: '/',
            templateUrl: 'projects/project.html',
            controller: 'projectdetailsCtrl'
        })

        .state('home.project.id.ledger', {
            url: '/ledger',
            templateUrl: 'projects/ledger_project.html',
            controller: 'projectledgerCtrl'
        })


}]);

function checkUserLoginStatus(dataservice) {
      return dataservice.getAvengers();
  }

function checkUserLogout(dataservice){
    return dataservice.doLogoutProcess();
}

