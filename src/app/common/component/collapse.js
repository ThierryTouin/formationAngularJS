/**
 * Created by dev1 on 11/02/15.
 */
//"use strict";

function collapseButtonDirective(collapse) {

    return {
        restrict : 'EA',
        scope: {},
        transclude: true,
        templateUrl: 'common/component/collapseButton.tpl.html',
        link: function(scope,element,attrs) {
            scope.button = collapse;
            scope.toggle = function () {
                console.log('in toggle() collapse.isOpen=' + collapse.isOpen);
                collapse.isOpen = !collapse.isOpen;
            };
        }
    };
}

function collapseCardDirective(collapse) {
    return {
        restrict : 'EA',
        scope: {},
        transclude: true,
        templateUrl: 'common/component/collapseCard.tpl.html',
        link: function(scope,element,attrs) {
            scope.$watch(function(){
                return collapse.isOpen;
            },function(o,n) {
                var section = element.find('section');
                section.toggleClass('open');
            });
        }
    };
}

function collapseFactory() {
    return {
        isOpen : false
    };
}

angular.module('common.collapse',[])
    .directive('collapseButton',collapseButtonDirective)
    .directive('collapseCard',collapseCardDirective)
    .factory('collapse',collapseFactory);