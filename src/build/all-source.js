angular.module('app', [
    'ui.router',
    'home',
    'restangular',
    'listAssessment',
    'createAssessment',
    'ng-messages'
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
    'common.codeAssessments'
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









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjcmVhdGUvY3JlYXRlLmpzIiwiaG9tZS9ob21lLmpzIiwibGlzdC9saXN0LmpzIiwiY29tbW9uL21vZGVsL1VzZXJzLmpzIiwiY29tbW9uL3NlcnZpY2VzL1NpbXBsZVNlcnZpY2UuanMiLCJjb21tb24vc2VydmljZXMvY29kZUFzc2Vzc21lbnRzU2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9naXRodWJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2hvbWUnLFxuICAgICdyZXN0YW5ndWxhcicsXG4gICAgJ2xpc3RBc3Nlc3NtZW50JyxcbiAgICAnY3JlYXRlQXNzZXNzbWVudCcsXG4gICAgJ25nLW1lc3NhZ2VzJ1xuXSlcblxuICAgIC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvc3RhcnQnKTtcbiAgICB9KVxuXG4gICAgLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdydW4gISEhJyk7XG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NvbW1vbicsW1xuICAgICdjb21tb24uVXNlcnMnLFxuICAgICdjb21tb24uU2ltcGxlU2VydmljZScsXG4gICAgJ2NvbW1vbi5naXRodWInLFxuICAgICdjb21tb24uY29kZUFzc2Vzc21lbnRzJ1xuXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2NyZWF0ZUFzc2Vzc21lbnQnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2NvbW1vbidcbl0pXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NyZWF0ZUFzc2Vzc21lbnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvY3JlYXRlJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY3JlYXRlL2NyZWF0ZS50cGwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3JlYXRlQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjcmVhdGVBc3Nlc3NtZW50J1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLmNvbnRyb2xsZXIoJ0NyZWF0ZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoY29kZUFzc2Vzc21lbnRzKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2luIENyZWF0ZUNvbnRyb2xsZXInKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblxuXG4gICAgICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIENyZWF0ZUNvbnRyb2xsZXIuZm9ybVN1Ym1pdCgpJyxzZWxmKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQudGl0bGU9JyArIHNlbGYuYXNzZXNzbWVudC50aXRsZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC5pbnN0cnVjdGlvbnM9JyArIHNlbGYuYXNzZXNzbWVudC5pbnN0cnVjdGlvbnMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnQuc3RhcnRDb2RlPScgKyBzZWxmLmFzc2Vzc21lbnQuc3RhcnRDb2RlKTtcblxuICAgICAgICAgICAgY29kZUFzc2Vzc21lbnRzXG4gICAgICAgICAgICAgICAgLmNyZWF0ZShzZWxmLmFzc2Vzc21lbnQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obmV3QXNzZXNzbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdBc3Nlc3NtZW50KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgfSk7XG4gICAgLy9oZXJlIHdlIGNhbiBzZXQgdGhlIGF0dHJpYnV0ZSByZXBvIHRvIHRydSBpZiB3ZSB3YW50IHRvIGdldCB0aGUgcmVwb3NpdG9yeSBsaXN0IG9mIHRoZSB1c2VyLCBmYWxzZSB3aWxsIGdpdmUgdXMgdXNlcidzIGluZm9ybWF0aW9uc1xuICAgIC8vLmNvbmZpZyhmdW5jdGlvbihjb2RlQXNzZXNzbWVudHNQcm92aWRlcil7XG4gICAgLy8gICAgY29kZUFzc2Vzc21lbnRzUHJvdmlkZXIuaW5pdCh7XG4gICAgLy8gICAgICAgIHVybCA6ICdodHRwOi8vY29kZWFzc2Vzc21lbnRzLWNoYXJsLnJoY2xvdWQuY29tLydcbiAgICAvLyAgICB9KTtcbiAgICAvL30pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2hvbWUnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2NvbW1vbidcbl0pXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgdXJsOiAnL3N0YXJ0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS9ob21lLnRwbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob21lJ1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24gKGdpdGh1Yikge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gSG9tZUNvbnRyb2xsZXInKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gJ0VudGVyIHlvdXIgbmFtZSc7XG4gICAgICAgIHRoaXMudXNlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zQXJlRGlzcGxheWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlci5uYW1lLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ncmVldGluZ3NBcmVEaXNwbGF5ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLm5hbWUubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRHaXRIdWJJbmZvID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGdpdGh1YlxuICAgICAgICAgICAgICAgIC5nZXRVc2VyRGF0YShuYW1lKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSB1c2VySW5mbztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuICAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2xpc3RBc3Nlc3NtZW50JywgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICdjb21tb24nXG5dKVxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsaXN0Jywge1xuICAgICAgICAgICAgdXJsOiAnL2xpc3QnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdsaXN0L2xpc3QudHBsLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2xpc3QnXG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAuY29udHJvbGxlcignTGlzdENvbnRyb2xsZXInLCBmdW5jdGlvbiAoY29kZUFzc2Vzc21lbnRzKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2luIGNvbnRyb2xsZXInKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY29kZUFzc2Vzc21lbnRzXG4gICAgICAgICAgICAuZ2V0TGlzdCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihhc3Nlc3NtZW50TGlzdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250cm9sbGVyIDogZ2V0TGlzdCgpIDogdGhlbicpO1xuICAgICAgICAgICAgICAgIHNlbGYuYXNzZXNzbWVudExpc3QgPSBhc3Nlc3NtZW50TGlzdDtcbiAgICAgICAgICAgICAgICAvL3NlbGYuYXNzZXNzbWVudExpc3QgPSAndG90byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICB9KTtcbiAgICAvL2hlcmUgd2UgY2FuIHNldCB0aGUgYXR0cmlidXRlIHJlcG8gdG8gdHJ1IGlmIHdlIHdhbnQgdG8gZ2V0IHRoZSByZXBvc2l0b3J5IGxpc3Qgb2YgdGhlIHVzZXIsIGZhbHNlIHdpbGwgZ2l2ZSB1cyB1c2VyJ3MgaW5mb3JtYXRpb25zXG4gICAgLy8uY29uZmlnKGZ1bmN0aW9uKGNvZGVBc3Nlc3NtZW50c1Byb3ZpZGVyKXtcbiAgICAvLyAgICBjb2RlQXNzZXNzbWVudHNQcm92aWRlci5pbml0KHtcbiAgICAvLyAgICAgICAgdXJsIDogJ2h0dHA6Ly9jb2RlYXNzZXNzbWVudHMtY2hhcmwucmhjbG91ZC5jb20vJ1xuICAgIC8vICAgIH0pO1xuICAgIC8vfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlVzZXJzJywgW10pXG5cbiAgICAuc2VydmljZSgnVXNlcnMnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlcicsIHVzZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmluZEJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdXNlci8nICsgbmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlNpbXBsZVNlcnZpY2UnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdTaW1wbGVTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuc2F5SGVsbG8gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiAnSGVsbG8nO1xuICAgICAgICAgICAgcmV0dXJuICdIZWxsbywgJyArIG5hbWU7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgZGV2MSBvbiAxMC8wMi8xNS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5jb2RlQXNzZXNzbWVudHMnLFsncmVzdGFuZ3VsYXInXSlcblxuICAgIC8vLnByb3ZpZGVyKCdjb2RlQXNzZXNzbWVudHMnLGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpe1xuICAgICAgICAvL3ZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdC8nO1xuICAgICAgICAvL1xuICAgICAgICAvL3RoaXMuaW5pdCA9IGZ1bmN0aW9uKG5ld1VybCl7XG4gICAgICAgIC8vICAgIHVybCA9IG5ld1VybDtcbiAgICAgICAgLy8gICAgLy9SZXN0YW5ndWxhclByb3ZpZGVyLnNldFJlcXVlc3RTdWZmaXgoJy5qc29uJyk7XG4gICAgICAgIC8vICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCh1cmwpO1xuICAgICAgICAvL307XG4gICAgICAgIC8vXG4gICAgICAgIC8vdGhpcy4kZ2V0ID0gZnVuY3Rpb24oUmVzdGFuZ3VsYXIpe1xuICAgICAgICAvLyAgICByZXR1cm4ge1xuICAgICAgICAvLyAgICAgICAgZ2V0TGlzdCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGFzc2Vzc21lbnRMaXN0ID0gUmVzdGFuZ3VsYXIuYWxsKCdhc3Nlc3NtZW50Jyk7XG4gICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2Vzc21lbnRMaXN0PScgKyBhc3Nlc3NtZW50TGlzdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgLy92YXIgbXlMaXN0ID0gYXNzZXNzbWVudC5nZXRMaXN0KCk7XG4gICAgICAgIC8vICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbXlMaXN0PScgKyBteUxpc3QpO1xuICAgICAgICAvLyAgICAgICAgICAgIC8vcmV0dXJuIG15TGlzdDtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gYXNzZXNzbWVudExpc3Q7XG4gICAgICAgIC8vICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgY3JlYXRlIDogZnVuY3Rpb24oYXNzZXNzbWVudCl7XG4gICAgICAgIC8vICAgICAgICAgICAgYXNzZXNzbWVudExpc3QucG9zdChhc3Nlc3NtZW50KS50aGVuKCk7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgIH07XG4gICAgICAgIC8vXG4gICAgICAgIC8vfTtcbiAgICAvL30pO1xuICAgIC5jb25maWcoZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcil7XG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnaHR0cDovL2NvZGVhc3Nlc3NtZW50cy1jaGFybC5yaGNsb3VkLmNvbS8nKTtcbiAgICB9KVxuICAgIC5mYWN0b3J5KCdjb2RlQXNzZXNzbWVudHMnLGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKXtcblxuICAgICAgICB2YXIgYXNzZXNzbWVudExpc3QgPSBSZXN0YW5ndWxhci5hbGwoJ2Fzc2Vzc21lbnQnKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0TGlzdCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy92YXIgbXlMaXN0ID0gYXNzZXNzbWVudC5nZXRMaXN0KCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbXlMaXN0PScgKyBteUxpc3QpO1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIG15TGlzdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXNzZXNzbWVudExpc3QuZ2V0TGlzdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZSA6IGZ1bmN0aW9uKGFzc2Vzc21lbnQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3Nlc3NtZW50LnRpdGxlPScgKyBhc3Nlc3NtZW50LnRpdGxlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC5pbnN0cnVjdGlvbnM9JyArIGFzc2Vzc21lbnQuaW5zdHJ1Y3Rpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXNzZXNzbWVudC5zdGFydENvZGU9JyArIGFzc2Vzc21lbnQuc3RhcnRDb2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXNzZXNzbWVudExpc3QucG9zdChhc3Nlc3NtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBkZXYxIG9uIDA5LzAyLzE1LlxuICovXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uLmdpdGh1YicsW10pXG5cbiAgICAuZmFjdG9yeSgnZ2l0aHViJyxmdW5jdGlvbigkaHR0cCwgJHEpe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHVzZXJJbmZvO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRVc2VyRGF0YTogZnVuY3Rpb24obmFtZSkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG5cbiAgICAgICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdKU09OUCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLycgKyBuYW1lICsgJz9jYWxsYmFjaz1KU09OX0NBTExCQUNLJ1xuICAgICAgICAgICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SW5mbyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh1c2VySW5mbykgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlckluZm87XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2VySW5mbyBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cbiAgICB9KTsgXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9