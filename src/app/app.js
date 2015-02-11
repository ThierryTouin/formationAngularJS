angular.module('app', [
    'ui.router',
    'home',
    'restangular',
    'listAssessment',
    'createAssessment',
    'ngMessages'
])

    .config(function ($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/start');
    })

    .run(function () {
        console.log('run !!!');
    });