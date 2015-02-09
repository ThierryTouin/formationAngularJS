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

    .controller('HomeController', function () {
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
        this.githubQuery = function () {
            return this.getUserData(this.user.name);
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
        var user;

        return {
            getUserData: function(username) {
                if (username.length > 2) {
                    $http({
                        method: 'JSONP',
                        url: 'https://api.github.com/users/' + github.username + '?callback=JSON_CALLBACK'
                    }).success(function (response) {
                        console.log(response);
                        user = response.data;
                    }).error(function (err) {
                        console.log(err);
                    });
                } else {
                    message = "username too short 3 char at least !!!";
                }
            },
            getUser: function() {
                return user;
            }
        };
    });









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJob21lL2hvbWUuanMiLCJjb21tb24vbW9kZWwvVXNlcnMuanMiLCJjb21tb24vc2VydmljZXMvU2ltcGxlU2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9naXRodWJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwtc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnaG9tZSdcbl0pXG5cbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3N0YXJ0Jyk7XG4gICAgfSlcblxuICAgIC5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncnVuICEhIScpO1xuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdjb21tb24nLFtcbiAgICAnY29tbW9uLlVzZXJzJyxcbiAgICAnY29tbW9uLlNpbXBsZVNlcnZpY2UnLFxuICAgICdjb21tb24uZ2l0aHViJ1xuXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2hvbWUnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2NvbW1vbidcbl0pXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3N0YXJ0Jywge1xuICAgICAgICAgICAgdXJsOiAnL3N0YXJ0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS9ob21lLnRwbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob21lJ1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9ICdFbnRlciB5b3VyIG5hbWUnO1xuICAgICAgICB0aGlzLnVzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluc3RydWN0aW9uc0FyZURpc3BsYXllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIubmFtZS5sZW5ndGggPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JlZXRpbmdzQXJlRGlzcGxheWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlci5uYW1lLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2l0aHViUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyRGF0YSh0aGlzLnVzZXIubmFtZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlVzZXJzJywgW10pXG5cbiAgICAuc2VydmljZSgnVXNlcnMnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlcicsIHVzZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmluZEJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdXNlci8nICsgbmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlNpbXBsZVNlcnZpY2UnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdTaW1wbGVTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuc2F5SGVsbG8gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiAnSGVsbG8nO1xuICAgICAgICAgICAgcmV0dXJuICdIZWxsbywgJyArIG5hbWU7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgZGV2MSBvbiAwOS8wMi8xNS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5naXRodWInLFtdKVxuXG4gICAgLmZhY3RvcnkoJ2dpdGh1YicsZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHVzZXI7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFVzZXJEYXRhOiBmdW5jdGlvbih1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0pTT05QJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJyArIGdpdGh1Yi51c2VybmFtZSArICc/Y2FsbGJhY2s9SlNPTl9DQUxMQkFDSydcbiAgICAgICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJ1c2VybmFtZSB0b28gc2hvcnQgMyBjaGFyIGF0IGxlYXN0ICEhIVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRVc2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuXG5cblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=