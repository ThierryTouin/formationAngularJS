angular.module('home', [
    'ui.router',
    'common'
])
    .config(function ($stateProvider) {
        $stateProvider.state('start', {
            url: '/start',
            templateUrl: 'home/home.tpl.html',
            controller: 'HomeController',
            controllerAs: 'home'
        });
    })

    .controller('HomeController', function (github) {

        var self = this;

        this.instructions = 'Enter your name';
        this.user = {
            name: ''
        };
        this.instructionsAreDisplayed = function () {
            return this.user.name.length === 0;
        };
        this.greetingsAreDisplayed = function () {
            return this.user.name.length > 0;
        };
        this.getGitHubInfo = function (name) {
            github
                .getUserData(name)
                .then(function(userInfo) {
                    self.userInfo = userInfo;
                })
                .catch(function(err) {
                    console.log(err);
                });

        };
    });
