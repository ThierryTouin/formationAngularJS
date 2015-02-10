angular.module('app', [
    'ui.router',
    'home'
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
    'common.github'
]);
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
 * Created by dev1 on 09/02/15.
 */
angular.module('common.github',[])

    .factory('github',function(){

        var self = this;

        return {
            getUserData: function($http, $q) {

            var userInfo;

            return {
                getUserData: function(name) {
                    var defer = $q.defer();


                    $http({
                        method: 'JSONP',
                        url: 'https://api.github.com/users/' + github.username + '?callback=JSON_CALLBACK'
                    }).success(function (response) {
                        console.log(response);
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

            }

        };
    }); 









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJob21lL2hvbWUuanMiLCJjb21tb24vbW9kZWwvVXNlcnMuanMiLCJjb21tb24vc2VydmljZXMvU2ltcGxlU2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9naXRodWJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwtc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnaG9tZSdcbl0pXG5cbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXJ0Jyk7XG4gICAgfSlcblxuICAgIC5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncnVuICEhIScpO1xuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24nLFtcbiAgICAnY29tbW9uLlVzZXJzJyxcbiAgICAnY29tbW9uLlNpbXBsZVNlcnZpY2UnLFxuICAgICdjb21tb24uZ2l0aHViJ1xuXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2hvbWUnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2NvbW1vbidcbl0pXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgdXJsOiAnL3N0YXJ0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS9ob21lLnRwbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob21lJ1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24gKGdpdGh1Yikge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9ICdFbnRlciB5b3VyIG5hbWUnO1xuICAgICAgICB0aGlzLnVzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluc3RydWN0aW9uc0FyZURpc3BsYXllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIubmFtZS5sZW5ndGggPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JlZXRpbmdzQXJlRGlzcGxheWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlci5uYW1lLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0R2l0SHViSW5mbyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBnaXRodWJcbiAgICAgICAgICAgICAgICAuZ2V0VXNlckRhdGEobmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm87XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24uVXNlcnMnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdVc2VycycsIGZ1bmN0aW9uICgkaHR0cCkge1xuXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy91c2VyJywgdXNlcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maW5kQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy91c2VyLycgKyBuYW1lKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24uU2ltcGxlU2VydmljZScsIFtdKVxuXG4gICAgLnNlcnZpY2UoJ1NpbXBsZVNlcnZpY2UnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdGhpcy5zYXlIZWxsbyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuICdIZWxsbyc7XG4gICAgICAgICAgICByZXR1cm4gJ0hlbGxvLCAnICsgbmFtZTtcbiAgICAgICAgfTtcblxuICAgIH0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBkZXYxIG9uIDA5LzAyLzE1LlxuICovXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uLmdpdGh1YicsW10pXG5cbiAgICAuZmFjdG9yeSgnZ2l0aHViJyxmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlckRhdGE6IGZ1bmN0aW9uKCRodHRwLCAkcSkge1xuXG4gICAgICAgICAgICB2YXIgdXNlckluZm87XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0VXNlckRhdGE6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0pTT05QJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJyArIGdpdGh1Yi51c2VybmFtZSArICc/Y2FsbGJhY2s9SlNPTl9DQUxMQkFDSydcbiAgICAgICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUodXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXRJbmZvIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VySW5mbykgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2VySW5mbyBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICB9KTsgXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9