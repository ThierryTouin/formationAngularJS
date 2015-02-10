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
