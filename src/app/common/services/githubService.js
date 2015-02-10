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








