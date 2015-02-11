angular.module('app', [
    'ui.router',
    'home',
    'restangular',
    'listAssessment',
    'createAssessment'
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









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjcmVhdGUvY3JlYXRlLmpzIiwiaG9tZS9ob21lLmpzIiwibGlzdC9saXN0LmpzIiwiY29tbW9uL2NvbXBvbmVudC9jb2xsYXBzZS5qcyIsImNvbW1vbi9tb2RlbC9Vc2Vycy5qcyIsImNvbW1vbi9zZXJ2aWNlcy9TaW1wbGVTZXJ2aWNlLmpzIiwiY29tbW9uL3NlcnZpY2VzL2NvZGVBc3Nlc3NtZW50c1NlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvZ2l0aHViU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2hvbWUnLFxuICAgICdyZXN0YW5ndWxhcicsXG4gICAgJ2xpc3RBc3Nlc3NtZW50JyxcbiAgICAnY3JlYXRlQXNzZXNzbWVudCdcbl0pXG5cbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXJ0Jyk7XG4gICAgfSlcblxuICAgIC5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncnVuICEhIScpO1xuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24nLFtcbiAgICAnY29tbW9uLlVzZXJzJyxcbiAgICAnY29tbW9uLlNpbXBsZVNlcnZpY2UnLFxuICAgICdjb21tb24uZ2l0aHViJyxcbiAgICAnY29tbW9uLmNvZGVBc3Nlc3NtZW50cycsXG4gICAgJ2NvbW1vbi5jb2xsYXBzZSdcbl0pOyIsImFuZ3VsYXIubW9kdWxlKCdjcmVhdGVBc3Nlc3NtZW50JywgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICdjb21tb24nXG5dKVxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjcmVhdGVBc3Nlc3NtZW50Jywge1xuICAgICAgICAgICAgdXJsOiAnL2NyZWF0ZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NyZWF0ZS9jcmVhdGUudHBsLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3JlYXRlQXNzZXNzbWVudCdcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIC5jb250cm9sbGVyKCdDcmVhdGVDb250cm9sbGVyJywgZnVuY3Rpb24gKGNvZGVBc3Nlc3NtZW50cykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBDcmVhdGVDb250cm9sbGVyJyk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cblxuICAgICAgICB0aGlzLmZvcm1TdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBDcmVhdGVDb250cm9sbGVyLmZvcm1TdWJtaXQoKScsc2VsZik7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50LnRpdGxlPScgKyBzZWxmLmFzc2Vzc21lbnQudGl0bGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQuaW5zdHJ1Y3Rpb25zPScgKyBzZWxmLmFzc2Vzc21lbnQuaW5zdHJ1Y3Rpb25zKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50LnN0YXJ0Q29kZT0nICsgc2VsZi5hc3Nlc3NtZW50LnN0YXJ0Q29kZSk7XG5cbiAgICAgICAgICAgIGNvZGVBc3Nlc3NtZW50c1xuICAgICAgICAgICAgICAgIC5jcmVhdGUoc2VsZi5hc3Nlc3NtZW50KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKG5ld0Fzc2Vzc21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV3QXNzZXNzbWVudCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcblxuICAgIH0pO1xuICAgIC8vaGVyZSB3ZSBjYW4gc2V0IHRoZSBhdHRyaWJ1dGUgcmVwbyB0byB0cnUgaWYgd2Ugd2FudCB0byBnZXQgdGhlIHJlcG9zaXRvcnkgbGlzdCBvZiB0aGUgdXNlciwgZmFsc2Ugd2lsbCBnaXZlIHVzIHVzZXIncyBpbmZvcm1hdGlvbnNcbiAgICAvLy5jb25maWcoZnVuY3Rpb24oY29kZUFzc2Vzc21lbnRzUHJvdmlkZXIpe1xuICAgIC8vICAgIGNvZGVBc3Nlc3NtZW50c1Byb3ZpZGVyLmluaXQoe1xuICAgIC8vICAgICAgICB1cmwgOiAnaHR0cDovL2NvZGVhc3Nlc3NtZW50cy1jaGFybC5yaGNsb3VkLmNvbS8nXG4gICAgLy8gICAgfSk7XG4gICAgLy99KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdob21lJywgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICdjb21tb24nXG5dKVxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzdGFydCcsIHtcbiAgICAgICAgICAgIHVybDogJy9zdGFydCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUvaG9tZS50cGwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnaG9tZSdcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIGZ1bmN0aW9uIChnaXRodWIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luIEhvbWVDb250cm9sbGVyJyk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9ICdFbnRlciB5b3VyIG5hbWUnO1xuICAgICAgICB0aGlzLnVzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluc3RydWN0aW9uc0FyZURpc3BsYXllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIubmFtZS5sZW5ndGggPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JlZXRpbmdzQXJlRGlzcGxheWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlci5uYW1lLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0R2l0SHViSW5mbyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBnaXRodWJcbiAgICAgICAgICAgICAgICAuZ2V0VXNlckRhdGEobmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm87XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdsaXN0QXNzZXNzbWVudCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnY29tbW9uJ1xuXSlcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbGlzdCcsIHtcbiAgICAgICAgICAgIHVybDogJy9saXN0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbGlzdC9saXN0LnRwbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMaXN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdsaXN0J1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLmNvbnRyb2xsZXIoJ0xpc3RDb250cm9sbGVyJywgZnVuY3Rpb24gKGNvZGVBc3Nlc3NtZW50cykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBjb250cm9sbGVyJyk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNvZGVBc3Nlc3NtZW50c1xuICAgICAgICAgICAgLmdldExpc3QoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXNzZXNzbWVudExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29udHJvbGxlciA6IGdldExpc3QoKSA6IHRoZW4nKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFzc2Vzc21lbnRMaXN0ID0gYXNzZXNzbWVudExpc3Q7XG4gICAgICAgICAgICAgICAgLy9zZWxmLmFzc2Vzc21lbnRMaXN0ID0gJ3RvdG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgfSk7XG4gICAgLy9oZXJlIHdlIGNhbiBzZXQgdGhlIGF0dHJpYnV0ZSByZXBvIHRvIHRydSBpZiB3ZSB3YW50IHRvIGdldCB0aGUgcmVwb3NpdG9yeSBsaXN0IG9mIHRoZSB1c2VyLCBmYWxzZSB3aWxsIGdpdmUgdXMgdXNlcidzIGluZm9ybWF0aW9uc1xuICAgIC8vLmNvbmZpZyhmdW5jdGlvbihjb2RlQXNzZXNzbWVudHNQcm92aWRlcil7XG4gICAgLy8gICAgY29kZUFzc2Vzc21lbnRzUHJvdmlkZXIuaW5pdCh7XG4gICAgLy8gICAgICAgIHVybCA6ICdodHRwOi8vY29kZWFzc2Vzc21lbnRzLWNoYXJsLnJoY2xvdWQuY29tLydcbiAgICAvLyAgICB9KTtcbiAgICAvL30pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGRldjEgb24gMTEvMDIvMTUuXG4gKi9cbi8vXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGNvbGxhcHNlQnV0dG9uRGlyZWN0aXZlKGNvbGxhcHNlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdCA6ICdFQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21tb24vY29tcG9uZW50L2NvbGxhcHNlQnV0dG9uLnRwbC5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycykge1xuICAgICAgICAgICAgc2NvcGUuYnV0dG9uID0gY29sbGFwc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIHRvZ2dsZSgpIGNvbGxhcHNlLmlzT3Blbj0nICsgY29sbGFwc2UuaXNPcGVuKTtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZS5pc09wZW4gPSAhY29sbGFwc2UuaXNPcGVuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbGxhcHNlQ2FyZERpcmVjdGl2ZShjb2xsYXBzZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0IDogJ0VBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbW1vbi9jb21wb25lbnQvY29sbGFwc2VDYXJkLnRwbC5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycykge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxhcHNlLmlzT3BlbjtcbiAgICAgICAgICAgIH0sZnVuY3Rpb24obyxuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBlbGVtZW50LmZpbmQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbGxhcHNlRmFjdG9yeSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpc09wZW4gOiBmYWxzZVxuICAgIH07XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdjb21tb24uY29sbGFwc2UnLFtdKVxuICAgIC5kaXJlY3RpdmUoJ2NvbGxhcHNlQnV0dG9uJyxjb2xsYXBzZUJ1dHRvbkRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKCdjb2xsYXBzZUNhcmQnLGNvbGxhcHNlQ2FyZERpcmVjdGl2ZSlcbiAgICAuZmFjdG9yeSgnY29sbGFwc2UnLGNvbGxhcHNlRmFjdG9yeSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5Vc2VycycsIFtdKVxuXG4gICAgLnNlcnZpY2UoJ1VzZXJzJywgZnVuY3Rpb24gKCRodHRwKSB7XG5cbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgJGh0dHAucG9zdCgnL3VzZXInLCB1c2VyKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZpbmRCeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3VzZXIvJyArIG5hbWUpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5TaW1wbGVTZXJ2aWNlJywgW10pXG5cbiAgICAuc2VydmljZSgnU2ltcGxlU2VydmljZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB0aGlzLnNheUhlbGxvID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hlbGxvJztcbiAgICAgICAgICAgIHJldHVybiAnSGVsbG8sICcgKyBuYW1lO1xuICAgICAgICB9O1xuXG4gICAgfSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGRldjEgb24gMTAvMDIvMTUuXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCdjb21tb24uY29kZUFzc2Vzc21lbnRzJyxbJ3Jlc3Rhbmd1bGFyJ10pXG5cbiAgICAvLy5wcm92aWRlcignY29kZUFzc2Vzc21lbnRzJyxmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKXtcbiAgICAgICAgLy92YXIgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3QvJztcbiAgICAgICAgLy9cbiAgICAgICAgLy90aGlzLmluaXQgPSBmdW5jdGlvbihuZXdVcmwpe1xuICAgICAgICAvLyAgICB1cmwgPSBuZXdVcmw7XG4gICAgICAgIC8vICAgIC8vUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRSZXF1ZXN0U3VmZml4KCcuanNvbicpO1xuICAgICAgICAvLyAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwodXJsKTtcbiAgICAgICAgLy99O1xuICAgICAgICAvL1xuICAgICAgICAvL3RoaXMuJGdldCA9IGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKXtcbiAgICAgICAgLy8gICAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgICAgIGdldExpc3QgOiBmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgICAgICAgIHZhciBhc3Nlc3NtZW50TGlzdCA9IFJlc3Rhbmd1bGFyLmFsbCgnYXNzZXNzbWVudCcpO1xuICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50TGlzdD0nICsgYXNzZXNzbWVudExpc3QpO1xuICAgICAgICAvLyAgICAgICAgICAgIC8vdmFyIG15TGlzdCA9IGFzc2Vzc21lbnQuZ2V0TGlzdCgpO1xuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ215TGlzdD0nICsgbXlMaXN0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAvL3JldHVybiBteUxpc3Q7XG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGFzc2Vzc21lbnRMaXN0O1xuICAgICAgICAvLyAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgIGNyZWF0ZSA6IGZ1bmN0aW9uKGFzc2Vzc21lbnQpe1xuICAgICAgICAvLyAgICAgICAgICAgIGFzc2Vzc21lbnRMaXN0LnBvc3QoYXNzZXNzbWVudCkudGhlbigpO1xuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICB9O1xuICAgICAgICAvL1xuICAgICAgICAvL307XG4gICAgLy99KTtcbiAgICAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpe1xuICAgICAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwoJ2h0dHA6Ly9jb2RlYXNzZXNzbWVudHMtY2hhcmwucmhjbG91ZC5jb20vJyk7XG4gICAgfSlcbiAgICAuZmFjdG9yeSgnY29kZUFzc2Vzc21lbnRzJyxmdW5jdGlvbihSZXN0YW5ndWxhcil7XG5cbiAgICAgICAgdmFyIGFzc2Vzc21lbnRMaXN0ID0gUmVzdGFuZ3VsYXIuYWxsKCdhc3Nlc3NtZW50Jyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldExpc3QgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vdmFyIG15TGlzdCA9IGFzc2Vzc21lbnQuZ2V0TGlzdCgpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ215TGlzdD0nICsgbXlMaXN0KTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBteUxpc3Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzc2Vzc21lbnRMaXN0LmdldExpc3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGUgOiBmdW5jdGlvbihhc3Nlc3NtZW50KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC50aXRsZT0nICsgYXNzZXNzbWVudC50aXRsZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQuaW5zdHJ1Y3Rpb25zPScgKyBhc3Nlc3NtZW50Lmluc3RydWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQuc3RhcnRDb2RlPScgKyBhc3Nlc3NtZW50LnN0YXJ0Q29kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzc2Vzc21lbnRMaXN0LnBvc3QoYXNzZXNzbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgZGV2MSBvbiAwOS8wMi8xNS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5naXRodWInLFtdKVxuXG4gICAgLmZhY3RvcnkoJ2dpdGh1YicsZnVuY3Rpb24oJGh0dHAsICRxKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1c2VySW5mbztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlckRhdGE6IGZ1bmN0aW9uKG5hbWUpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnSlNPTlAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8nICsgbmFtZSArICc/Y2FsbGJhY2s9SlNPTl9DQUxMQkFDSydcbiAgICAgICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcblxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEluZm8gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlckluZm8pICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlckluZm8gaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuXG4gICAgfSk7IFxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==