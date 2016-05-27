(function() {

    var app = angular.module('store', ['ngRoute', 'ngAnimate']);

    app.controller('MainController', function($scope) {
            this.image = 'images/background.png';
        })
        .controller('galleryController', function($scope) {
            this.images = images;
            $scope.cards = [
                {
                    headline: "Beach",
                    image: '/images/1.jpg',
                    content: 'this is a beautiful beach'
                },
                {
                    headline: "snow",
                    image: '/images/1.jpg',
                    content: 'this is a beautiful ski slope'
                },
                {
                    headline: "field",
                    image: '/images/1.jpg',
                    content: 'this is a beautiful field'
                }
            ]
        })
        .service('RestService', function($http) {
            var getAllUsers = function() {
                var request = {
                    method: 'GET',
                    url: '/users'
                };
                return $http(request);
            };
            var registerUser = function(userJson) {
                var request = {
                    method: 'POST',
                    url: '/reg',
                    data: userJson
                };
                return $http(request);
            };
            var deleteUser = function(userJson) {
                var request = {
                    method: 'POST',
                    url: '/delete',
                    data: userJson
                };
                return $http(request);
            }
            var login = function(user) {
                var request = {
                    method: 'POST',
                    url: '/login',
                    data: user
                };
                return $http(request);
            }

            return {
                login: login,
                getAllUsers: getAllUsers,
                registerUser: registerUser,
                deleteUser: deleteUser
            };
        })
        .controller('formController', function($scope, RestService) {
            $scope.user = {};
            $scope.toLogin = {};
            $scope.users = {};
            $scope.getAllUsers = function() {
                RestService.getAllUsers()
                    .then(function(response) {
                        $scope.users = response.data;
                        $scope.$apply;
                    })
            }
            $scope.loginCall = function() {
                console.log($scope.toLogin)
                RestService.login($scope.toLogin)
                    .then(function successCallback(response) {
                        alert('OK');
                        $scope.toLogin = {};
                        console.log(response.data)
                    });
            };
            $scope.submitForm = function() {
                $scope.error = "";
                RestService.registerUser($scope.user)
                    .then(function successCallback(response) {
                        console.log('OK');
                        $scope.user = {};
                        $scope.getAllUsers();
                    });
            };
            $scope.delete = function() {
                $scope.error = "";
                RestService.deleteUser($scope.user)
                    .then(function(data) {
                        console.log(data.data);
                        $scope.getAllUsers();
                        $scope.user = {};
                    })
                    .catch(function(data) {
                        $scope.error = data.data;
                    });
            }
        });

    var images = [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg'
    ];

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/gallery', {
                templateUrl: 'views/gallery.html',
                controller: 'galleryController',
                controllerAs: 'gallery'
            })
            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'formController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'formController'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/home'
            })
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    });
})();
