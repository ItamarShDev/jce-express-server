angular.module('store')
.directive('imageCard', function(){
    return {
        restrict: 'E',
        templateUrl:'/templates/card.html',
        controller: 'galleryController',
        scope: {
            'card': '='
        }
    }
})
