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
