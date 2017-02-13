(function (){
  'use strict';

  angular
    .module('marketplace')
    .controller('OwnProjectController', OwnProjectController);

    OwnProjectController.$inject = ['OwnProjectFactory', 'toastr'];

    function OwnProjectController(OwnProjectFactory, toastr) {
      var vm = this;
      vm.text = 'OwnProjectController';
      //sortin table
      vm.sortType = 'created_at';
  		vm.sortReverse = true;



      vm.getAllOwnProjects = function() {
        vm.allMyActiveProjects = [];
        vm.allMyInactiveProjects = [];
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

      vm.publishSrvInCatalogue = function(srv) {
          OwnProjectFactory.publishServiceInCatalogue(srv._id).then(function(response){
            console.log(response);
            toastr.info('Servei publicat al Catàleg correctament', 'Publicació de Servei');
            vm.getAllOwnProjects();
          }, function(error){
            console.log(error);
          })
      };

      vm.hideSrvInCatalogue = function(srv) {
          OwnProjectFactory.hideServiceInCatalogue(srv._id).then(function(response){
            console.log(response);
            toastr.info('Servei descatalogat correctament', 'Ocultació de Servei');
            vm.getAllOwnProjects();
          }, function(error){
            console.log(error);
          })
      };

      vm.createAnonymousProject = function(srv) {
        OwnProjectFactory.createAnonymousProject(srv).then(function(response) {
          console.log(response);
        }, function (error) {
          console.log(error);
        });
      }



    }
})();
