(function (){
  'use strict';

  angular
    .module('marketplace')
    .controller('OwnProjectController', OwnProjectController);

    OwnProjectController.$inject = ['OwnProjectFactory', 'toastr'];

    function OwnProjectController(OwnProjectFactory, toastr) {
      var vm = this;
      vm.text = 'OwnProjectController';
      vm.allMyActiveProjects = [];
      vm.allMyInactiveProjects = [];
      //sortin table
      vm.sortType = 'created_at';
  		vm.sortReverse = true;



      vm.getAllOwnProjects = function() {
        OwnProjectFactory.getAllOwnProjects().then(function(response){
          activeProjects(response.result);
        }, function (error){
          console.log(error);
        })
      };

      vm.getAllOwnProjects();
      /**
      * split all projects in active/unactive project lists scope variables
      * @param {objectArray} list all myProjects
      */
      function activeProjects(list) {
        angular.forEach(list, function (each){
          if (each.activated === true) {
            vm.allMyActiveProjects.push(each);
          } else if (each.activated === false) {
            vm.allMyInactiveProjects.push(each);
          }
        });
      }

    }
})();
