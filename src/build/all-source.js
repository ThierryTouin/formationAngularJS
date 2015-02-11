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
angular.module('common',[
    'common.Users',
    'common.SimpleService',
    'common.github',
    'common.codeAssessments',
    'common.collapse'
]);
angular.module('createAssessment', [
    'ui.router',
    'common'
])
    .config(function ($stateProvider) {
        $stateProvider.state('createAssessment', {
            url: '/create',
            templateUrl: 'create/create.tpl.html',
            controller: 'CreateController',
            controllerAs: 'createAssessment'
        });
    })

    .controller('CreateController', function (codeAssessments) {

        console.log('in CreateController');

        var self = this;



        this.formSubmit = function () {

            console.log('in CreateController.formSubmit()',self);

            console.log('assessment.title=' + self.assessment.title);
            console.log('assessment.instructions=' + self.assessment.instructions);
            console.log('assessment.startCode=' + self.assessment.startCode);

            codeAssessments
                .create(self.assessment)
                .then(function(newAssessment) {
                    console.log(newAssessment);
                })
                .catch(function(err) {
                    self.error = err;
                    console.log(err);
                });

        };

    });
    //here we can set the attribute repo to tru if we want to get the repository list of the user, false will give us user's informations
    //.config(function(codeAssessmentsProvider){
    //    codeAssessmentsProvider.init({
    //        url : 'http://codeassessments-charl.rhcloud.com/'
    //    });
    //});

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
        console.log('in HomeController');
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
                    self.error = err;
                    console.log(err);
                });

        };
    });

angular.module('listAssessment', [
    'ui.router',
    'common'
])
    .config(function ($stateProvider) {
        $stateProvider.state('list', {
            url: '/list',
            templateUrl: 'list/list.tpl.html',
            controller: 'ListController',
            controllerAs: 'list'
        });
    })

    .controller('ListController', function (codeAssessments) {

        console.log('in controller');

        var self = this;

        codeAssessments
            .getList()
            .then(function(assessmentList) {
                console.log('controller : getList() : then');
                self.assessmentList = assessmentList;
                //self.assessmentList = 'toto';
            })
            .catch(function(err) {
                self.error = err;
                console.log(err);
            });


    });
    //here we can set the attribute repo to tru if we want to get the repository list of the user, false will give us user's informations
    //.config(function(codeAssessmentsProvider){
    //    codeAssessmentsProvider.init({
    //        url : 'http://codeassessments-charl.rhcloud.com/'
    //    });
    //});

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
angular.module('common.Users', [])

    .service('Users', function ($http) {

        this.create = function (user) {
            $http.post('/user', user);
        };

        this.findByName = function (name) {
            return $http.get('/user/' + name)
                .then(function (response) {
                    return response.data;
                });
        };

    });
angular.module('common.SimpleService', [])

    .service('SimpleService', function () {

        this.sayHello = function (name) {
            if (!name)
                return 'Hello';
            return 'Hello, ' + name;
        };

    });
/**
 * Created by dev1 on 10/02/15.
 */
angular.module('common.codeAssessments',['restangular'])

    //.provider('codeAssessments',function(RestangularProvider){
        //var url = 'http://localhost/';
        //
        //this.init = function(newUrl){
        //    url = newUrl;
        //    //RestangularProvider.setRequestSuffix('.json');
        //    RestangularProvider.setBaseUrl(url);
        //};
        //
        //this.$get = function(Restangular){
        //    return {
        //        getList : function(){
        //            var assessmentList = Restangular.all('assessment');
        //            console.log('assessmentList=' + assessmentList);
        //            //var myList = assessment.getList();
        //            //console.log('myList=' + myList);
        //            //return myList;
        //            return assessmentList;
        //        },
        //        create : function(assessment){
        //            assessmentList.post(assessment).then();
        //        }
        //    };
        //
        //};
    //});
    .config(function(RestangularProvider){
        RestangularProvider.setBaseUrl('http://codeassessments-charl.rhcloud.com/');
    })
    .factory('codeAssessments',function(Restangular){

        var assessmentList = Restangular.all('assessment');

        return {
            getList : function(){
                //var myList = assessment.getList();
                //console.log('myList=' + myList);
                //return myList;
                return assessmentList.getList();
            },
            create : function(assessment){
                console.log('assessment.title=' + assessment.title);
                console.log('assessment.instructions=' + assessment.instructions);
                console.log('assessment.startCode=' + assessment.startCode);
                return assessmentList.post(assessment);
            }
        };

    });












/**
 * Created by dev1 on 09/02/15.
 */
angular.module('common.github',[])

    .factory('github',function($http, $q){

        var self = this;
        var userInfo;

        return {
            getUserData: function(name) {


                var defer = $q.defer();


                $http({
                     method: 'JSONP',
                        url: 'https://api.github.com/users/' + name + '?callback=JSON_CALLBACK'
                    }).success(function (response) {
                        console.log(response.data);
                        if (!response.data.message) {
                            userInfo = response.data;
                            defer.resolve(userInfo);
                        } else {
                            defer.reject(response.data);
                        }

                    }).error(function (err) {
                        console.log(err);
                        defer.reject(err);
                    });
                    return defer.promise;


                },
            getInfo : function() {
                if (userInfo)    {
                    return userInfo;
                } else {
                    throw new Error('userInfo is not defined');
                }

            }
        };


    }); 









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjcmVhdGUvY3JlYXRlLmpzIiwiaG9tZS9ob21lLmpzIiwibGlzdC9saXN0LmpzIiwiY29tbW9uL2NvbXBvbmVudC9jb2xsYXBzZS5qcyIsImNvbW1vbi9tb2RlbC9Vc2Vycy5qcyIsImNvbW1vbi9zZXJ2aWNlcy9TaW1wbGVTZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL2NvZGVBc3Nlc3NtZW50c1NlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvZ2l0aHViU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2hvbWUnLFxuICAgICdyZXN0YW5ndWxhcicsXG4gICAgJ2xpc3RBc3Nlc3NtZW50JyxcbiAgICAnY3JlYXRlQXNzZXNzbWVudCcsXG4gICAgJ25nTWVzc2FnZXMnXG5dKVxuXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9zdGFydCcpO1xuICAgIH0pXG5cbiAgICAucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3J1biAhISEnKTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uJyxbXG4gICAgJ2NvbW1vbi5Vc2VycycsXG4gICAgJ2NvbW1vbi5TaW1wbGVTZXJ2aWNlJyxcbiAgICAnY29tbW9uLmdpdGh1YicsXG4gICAgJ2NvbW1vbi5jb2RlQXNzZXNzbWVudHMnLFxuICAgICdjb21tb24uY29sbGFwc2UnXG5dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY3JlYXRlQXNzZXNzbWVudCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnY29tbW9uJ1xuXSlcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY3JlYXRlQXNzZXNzbWVudCcsIHtcbiAgICAgICAgICAgIHVybDogJy9jcmVhdGUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjcmVhdGUvY3JlYXRlLnRwbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDcmVhdGVDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2NyZWF0ZUFzc2Vzc21lbnQnXG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAuY29udHJvbGxlcignQ3JlYXRlQ29udHJvbGxlcicsIGZ1bmN0aW9uIChjb2RlQXNzZXNzbWVudHMpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaW4gQ3JlYXRlQ29udHJvbGxlcicpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuXG5cbiAgICAgICAgdGhpcy5mb3JtU3VibWl0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gQ3JlYXRlQ29udHJvbGxlci5mb3JtU3VibWl0KCknLHNlbGYpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC50aXRsZT0nICsgc2VsZi5hc3Nlc3NtZW50LnRpdGxlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50Lmluc3RydWN0aW9ucz0nICsgc2VsZi5hc3Nlc3NtZW50Lmluc3RydWN0aW9ucyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC5zdGFydENvZGU9JyArIHNlbGYuYXNzZXNzbWVudC5zdGFydENvZGUpO1xuXG4gICAgICAgICAgICBjb2RlQXNzZXNzbWVudHNcbiAgICAgICAgICAgICAgICAuY3JlYXRlKHNlbGYuYXNzZXNzbWVudClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihuZXdBc3Nlc3NtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0Fzc2Vzc21lbnQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICB9KTtcbiAgICAvL2hlcmUgd2UgY2FuIHNldCB0aGUgYXR0cmlidXRlIHJlcG8gdG8gdHJ1IGlmIHdlIHdhbnQgdG8gZ2V0IHRoZSByZXBvc2l0b3J5IGxpc3Qgb2YgdGhlIHVzZXIsIGZhbHNlIHdpbGwgZ2l2ZSB1cyB1c2VyJ3MgaW5mb3JtYXRpb25zXG4gICAgLy8uY29uZmlnKGZ1bmN0aW9uKGNvZGVBc3Nlc3NtZW50c1Byb3ZpZGVyKXtcbiAgICAvLyAgICBjb2RlQXNzZXNzbWVudHNQcm92aWRlci5pbml0KHtcbiAgICAvLyAgICAgICAgdXJsIDogJ2h0dHA6Ly9jb2RlYXNzZXNzbWVudHMtY2hhcmwucmhjbG91ZC5jb20vJ1xuICAgIC8vICAgIH0pO1xuICAgIC8vfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnaG9tZScsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnY29tbW9uJ1xuXSlcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc3RhcnQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUudHBsLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2hvbWUnXG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZ2l0aHViKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBIb21lQ29udHJvbGxlcicpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSAnRW50ZXIgeW91ciBuYW1lJztcbiAgICAgICAgdGhpcy51c2VyID0ge1xuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnNBcmVEaXNwbGF5ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLm5hbWUubGVuZ3RoID09PSAwO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdyZWV0aW5nc0FyZURpc3BsYXllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIubmFtZS5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEdpdEh1YkluZm8gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgZ2l0aHViXG4gICAgICAgICAgICAgICAgLmdldFVzZXJEYXRhKG5hbWUpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG4gICAgfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbGlzdEFzc2Vzc21lbnQnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2NvbW1vbidcbl0pXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xpc3QnLCB7XG4gICAgICAgICAgICB1cmw6ICcvbGlzdCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xpc3QvbGlzdC50cGwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTGlzdENvbnRyb2xsZXInLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbGlzdCdcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIC5jb250cm9sbGVyKCdMaXN0Q29udHJvbGxlcicsIGZ1bmN0aW9uIChjb2RlQXNzZXNzbWVudHMpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaW4gY29udHJvbGxlcicpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBjb2RlQXNzZXNzbWVudHNcbiAgICAgICAgICAgIC5nZXRMaXN0KClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFzc2Vzc21lbnRMaXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRyb2xsZXIgOiBnZXRMaXN0KCkgOiB0aGVuJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hc3Nlc3NtZW50TGlzdCA9IGFzc2Vzc21lbnRMaXN0O1xuICAgICAgICAgICAgICAgIC8vc2VsZi5hc3Nlc3NtZW50TGlzdCA9ICd0b3RvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgIH0pO1xuICAgIC8vaGVyZSB3ZSBjYW4gc2V0IHRoZSBhdHRyaWJ1dGUgcmVwbyB0byB0cnUgaWYgd2Ugd2FudCB0byBnZXQgdGhlIHJlcG9zaXRvcnkgbGlzdCBvZiB0aGUgdXNlciwgZmFsc2Ugd2lsbCBnaXZlIHVzIHVzZXIncyBpbmZvcm1hdGlvbnNcbiAgICAvLy5jb25maWcoZnVuY3Rpb24oY29kZUFzc2Vzc21lbnRzUHJvdmlkZXIpe1xuICAgIC8vICAgIGNvZGVBc3Nlc3NtZW50c1Byb3ZpZGVyLmluaXQoe1xuICAgIC8vICAgICAgICB1cmwgOiAnaHR0cDovL2NvZGVhc3Nlc3NtZW50cy1jaGFybC5yaGNsb3VkLmNvbS8nXG4gICAgLy8gICAgfSk7XG4gICAgLy99KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBkZXYxIG9uIDExLzAyLzE1LlxuICovXG4vL1widXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBjb2xsYXBzZUJ1dHRvbkRpcmVjdGl2ZShjb2xsYXBzZSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3QgOiAnRUEnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnY29tbW9uL2NvbXBvbmVudC9jb2xsYXBzZUJ1dHRvbi50cGwuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLmJ1dHRvbiA9IGNvbGxhcHNlO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiB0b2dnbGUoKSBjb2xsYXBzZS5pc09wZW49JyArIGNvbGxhcHNlLmlzT3Blbik7XG4gICAgICAgICAgICAgICAgY29sbGFwc2UuaXNPcGVuID0gIWNvbGxhcHNlLmlzT3BlbjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjb2xsYXBzZUNhcmREaXJlY3RpdmUoY29sbGFwc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdCA6ICdFQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21tb24vY29tcG9uZW50L2NvbGxhcHNlQ2FyZC50cGwuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsYXBzZS5pc09wZW47XG4gICAgICAgICAgICB9LGZ1bmN0aW9uKG8sbikge1xuICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uID0gZWxlbWVudC5maW5kKCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjb2xsYXBzZUZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNPcGVuIDogZmFsc2VcbiAgICB9O1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uLmNvbGxhcHNlJyxbXSlcbiAgICAuZGlyZWN0aXZlKCdjb2xsYXBzZUJ1dHRvbicsY29sbGFwc2VCdXR0b25EaXJlY3RpdmUpXG4gICAgLmRpcmVjdGl2ZSgnY29sbGFwc2VDYXJkJyxjb2xsYXBzZUNhcmREaXJlY3RpdmUpXG4gICAgLmZhY3RvcnkoJ2NvbGxhcHNlJyxjb2xsYXBzZUZhY3RvcnkpOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24uVXNlcnMnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdVc2VycycsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyJywgdXNlcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maW5kQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy91c2VyLycgKyBuYW1lKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24uU2ltcGxlU2VydmljZScsIFtdKVxuXG4gICAgLnNlcnZpY2UoJ1NpbXBsZVNlcnZpY2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5zYXlIZWxsbyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuICdIZWxsbyc7XG4gICAgICAgICAgICByZXR1cm4gJ0hlbGxvLCAnICsgbmFtZTtcbiAgICAgICAgfTtcblxuICAgIH0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBkZXYxIG9uIDEwLzAyLzE1LlxuICovXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uLmNvZGVBc3Nlc3NtZW50cycsWydyZXN0YW5ndWxhciddKVxuXG4gICAgLy8ucHJvdmlkZXIoJ2NvZGVBc3Nlc3NtZW50cycsZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcil7XG4gICAgICAgIC8vdmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0Lyc7XG4gICAgICAgIC8vXG4gICAgICAgIC8vdGhpcy5pbml0ID0gZnVuY3Rpb24obmV3VXJsKXtcbiAgICAgICAgLy8gICAgdXJsID0gbmV3VXJsO1xuICAgICAgICAvLyAgICAvL1Jlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0UmVxdWVzdFN1ZmZpeCgnLmpzb24nKTtcbiAgICAgICAgLy8gICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKHVybCk7XG4gICAgICAgIC8vfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy90aGlzLiRnZXQgPSBmdW5jdGlvbihSZXN0YW5ndWxhcil7XG4gICAgICAgIC8vICAgIHJldHVybiB7XG4gICAgICAgIC8vICAgICAgICBnZXRMaXN0IDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgICAgICAgICB2YXIgYXNzZXNzbWVudExpc3QgPSBSZXN0YW5ndWxhci5hbGwoJ2Fzc2Vzc21lbnQnKTtcbiAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudExpc3Q9JyArIGFzc2Vzc21lbnRMaXN0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAvL3ZhciBteUxpc3QgPSBhc3Nlc3NtZW50LmdldExpc3QoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdteUxpc3Q9JyArIG15TGlzdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgLy9yZXR1cm4gbXlMaXN0O1xuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBhc3Nlc3NtZW50TGlzdDtcbiAgICAgICAgLy8gICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICBjcmVhdGUgOiBmdW5jdGlvbihhc3Nlc3NtZW50KXtcbiAgICAgICAgLy8gICAgICAgICAgICBhc3Nlc3NtZW50TGlzdC5wb3N0KGFzc2Vzc21lbnQpLnRoZW4oKTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy99O1xuICAgIC8vfSk7XG4gICAgLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKXtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCdodHRwOi8vY29kZWFzc2Vzc21lbnRzLWNoYXJsLnJoY2xvdWQuY29tLycpO1xuICAgIH0pXG4gICAgLmZhY3RvcnkoJ2NvZGVBc3Nlc3NtZW50cycsZnVuY3Rpb24oUmVzdGFuZ3VsYXIpe1xuXG4gICAgICAgIHZhciBhc3Nlc3NtZW50TGlzdCA9IFJlc3Rhbmd1bGFyLmFsbCgnYXNzZXNzbWVudCcpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRMaXN0IDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvL3ZhciBteUxpc3QgPSBhc3Nlc3NtZW50LmdldExpc3QoKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdteUxpc3Q9JyArIG15TGlzdCk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gbXlMaXN0O1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3Nlc3NtZW50TGlzdC5nZXRMaXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlIDogZnVuY3Rpb24oYXNzZXNzbWVudCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQudGl0bGU9JyArIGFzc2Vzc21lbnQudGl0bGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50Lmluc3RydWN0aW9ucz0nICsgYXNzZXNzbWVudC5pbnN0cnVjdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50LnN0YXJ0Q29kZT0nICsgYXNzZXNzbWVudC5zdGFydENvZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhc3Nlc3NtZW50TGlzdC5wb3N0KGFzc2Vzc21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGRldjEgb24gMDkvMDIvMTUuXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCdjb21tb24uZ2l0aHViJyxbXSlcblxuICAgIC5mYWN0b3J5KCdnaXRodWInLGZ1bmN0aW9uKCRodHRwLCAkcSl7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgdXNlckluZm87XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFVzZXJEYXRhOiBmdW5jdGlvbihuYW1lKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cblxuICAgICAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0pTT05QJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJyArIG5hbWUgKyAnP2NhbGxiYWNrPUpTT05fQ0FMTEJBQ0snXG4gICAgICAgICAgICAgICAgICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUodXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG5cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJbmZvIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJJbmZvKSAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VySW5mbztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJJbmZvIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cblxuICAgIH0pOyBcblxuXG5cblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=