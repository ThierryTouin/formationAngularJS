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








