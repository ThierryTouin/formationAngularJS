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
                    self.error = err;
                    console.log(err);
                });

        };
    });

angular.module('common',[
    'common.Users',
    'common.SimpleService',
    'common.github'
]);
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









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjb21tb24vbW9kZWwvVXNlcnMuanMiLCJjb21tb24vc2VydmljZXMvU2ltcGxlU2VydmljZS5qcyIsImNvbW1vbi9zZXJ2aWNlcy9naXRodWJTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ2hvbWUnXG5dKVxuXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9zdGFydCcpO1xuICAgIH0pXG5cbiAgICAucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3J1biAhISEnKTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnaG9tZScsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnY29tbW9uJ1xuXSlcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc3RhcnQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUudHBsLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2hvbWUnXG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZ2l0aHViKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gJ0VudGVyIHlvdXIgbmFtZSc7XG4gICAgICAgIHRoaXMudXNlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zQXJlRGlzcGxheWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlci5uYW1lLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ncmVldGluZ3NBcmVEaXNwbGF5ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLm5hbWUubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRHaXRIdWJJbmZvID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGdpdGh1YlxuICAgICAgICAgICAgICAgIC5nZXRVc2VyRGF0YShuYW1lKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSB1c2VySW5mbztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuICAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2NvbW1vbicsW1xuICAgICdjb21tb24uVXNlcnMnLFxuICAgICdjb21tb24uU2ltcGxlU2VydmljZScsXG4gICAgJ2NvbW1vbi5naXRodWInXG5dKTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlVzZXJzJywgW10pXG5cbiAgICAuc2VydmljZSgnVXNlcnMnLCBmdW5jdGlvbiAoJGh0dHApIHtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvdXNlcicsIHVzZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmluZEJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdXNlci8nICsgbmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnY29tbW9uLlNpbXBsZVNlcnZpY2UnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdTaW1wbGVTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuc2F5SGVsbG8gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiAnSGVsbG8nO1xuICAgICAgICAgICAgcmV0dXJuICdIZWxsbywgJyArIG5hbWU7XG4gICAgICAgIH07XG5cbiAgICB9KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgZGV2MSBvbiAwOS8wMi8xNS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbi5naXRodWInLFtdKVxuXG4gICAgLmZhY3RvcnkoJ2dpdGh1YicsZnVuY3Rpb24oJGh0dHAsICRxKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1c2VySW5mbztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlckRhdGE6IGZ1bmN0aW9uKG5hbWUpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuXG4gICAgICAgICAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnSlNPTlAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8nICsgbmFtZSArICc/Y2FsbGJhY2s9SlNPTl9DQUxMQkFDSydcbiAgICAgICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcblxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEluZm8gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlckluZm8pICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlckluZm8gaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuXG4gICAgfSk7IFxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==