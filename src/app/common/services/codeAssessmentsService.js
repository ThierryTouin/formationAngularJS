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











