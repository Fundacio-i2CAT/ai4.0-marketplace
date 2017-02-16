(function (){
  'use strict';

  angular
    .module('marketplace')
    .controller('OwnProjectController', OwnProjectController);

    OwnProjectController.$inject = ['OwnProjectFactory', 'toastr', '$log', 'LiteralFactory', 'ngDialog', 'ProjectFactory', '$state', 'ServiceFactory', 'ShareDataFactory'];

    function OwnProjectController(OwnProjectFactory, toastr, $log, LiteralFactory, ngDialog, ProjectFactory, $state, ServiceFactory, ShareDataFactory) {
      var vm = this;
      vm.text = 'OwnProjectController';
      //sortin table
      vm.sortTypeActive = 'created_at';
      vm.sortTypeInactive = 'created_at';
  		vm.sortActiveReverse = true;
      vm.sortInactiveReverse = true;
      vm.isExpanded = false;

      vm.getAllOwnProjects = function() {
        vm.allMyActiveProjects = [],
        vm.allMyInactiveProjects = [],
        vm.allMyProjects = [];
        OwnProjectFactory.getAllOwnProjects().then(function(response){
          splitProjects(response.result);
        }, function (error){
          $log.log(error);
        })
      };

      vm.getAllOwnProjects();

      vm.getAllMyAnonymousProjects = function() {
        OwnProjectFactory.getAllMyAnonymousProjects().then(function(response){
          vm.allAnonymousProjects = response.result;
          // $log.log('allAnonymousProjects:::', vm.allAnonymousProjects);
          setInstancesPerProject(vm.allMyInactiveProjects, vm.allAnonymousProjects);
          setInstancesPerProject(vm.allMyActiveProjects, vm.allAnonymousProjects);
          // $log.log('allMyInactiveProjects:::', vm.allMyInactiveProjects);
        }, function (error){
          $log.log(error);
        });
      };

      vm.getAllMyAnonymousProjects();

      /**
      * split all projects in active/unactive project lists scope variables
      * @param {objectArray} list all myProjects
      */
      function splitProjects(list) {
        angular.forEach(list, function (each){
          if (each.activated === true) {
            vm.allMyActiveProjects.push(each);
          } else if (each.activated === false) {
            vm.allMyInactiveProjects.push(each);
          }
        });
        // $log.log('allMyActiveProjects:::', vm.allMyActiveProjects);
        // $log.log('allMyInactiveProjects:::', vm.allMyInactiveProjects);
      }

      /**
        Assign instances (anonymous projects) to each project
        @param {objectArray} list array of active/inactive projects
        @param {objectArray} list2 array of anonymous projects
      */
      function setInstancesPerProject(list, list2) {
        angular.forEach(list, function (each){
          each.instances = [];
          angular.forEach(list2, function (myProject){
            if (each._id === myProject.services[0].service._id) {
              each.instances.push(myProject);
            }
          });
        });
      }


      vm.publishSrvInCatalogue = function(srv) {
          OwnProjectFactory.publishServiceInCatalogue(srv._id).then(function(response){
            $log.log(response);
            toastr.info('Servei publicat al Catàleg correctament', 'Publicació de Servei');
            vm.getAllOwnProjects();
          }, function(error){
            $log.log(error);
          })
      };

      vm.hideSrvInCatalogue = function(srv) {
          OwnProjectFactory.hideServiceInCatalogue(srv._id).then(function(response){
            toastr.info('Servei descatalogat correctament', 'Ocultació de Servei');
            vm.getAllOwnProjects();
          }, function(error){
            $log.log(error);
          })
      };

      vm.createAnonymousProject = function(srv) {
        OwnProjectFactory.createAnonymousProject(srv).then(function(response) {
          toastr.success('Projecte creat correctament', 'Creació Projecte');

          vm.getAllOwnProjects();
          vm.getAllMyAnonymousProjects();

        }, function (error) {
          $log.log(error);
        });
      };

      vm.getStatusClass = function(status){
  			return LiteralFactory.getStatusClass(status);
  		};

      vm.getLiteralStatus = function(status){
  			return LiteralFactory.getLiteralStatus(status);
  		};

      //confirm message for deleting project as a Client
  		vm.confirmDeleteProject = function(project) {
        ProjectFactory.confirmDeleteProject(project, vm);
  		};

      //close dialog
  		vm.closeDialog = function() {
  			ngDialog.close();
  		};

      vm.deleteProject = function(id){
  			ProjectFactory.deleteProject(id).then(function(response){
  				if(response.status===200){
  					toastr.info("Projecte eliminat correctament", "Eliminar Projecte");
  					$state.reload();
  				} else {
  					toastr.error("No s'ha pogut borrar el projecte");
  				}
  				vm.closeDialog();
  			});
  		};

      //Instantiate service button (as a client), pass the service data and open dialog
  		vm.instantiateService = function(srv) {
  			var service_id = srv.services[0].service._id;
  			ServiceFactory.instantiateService(service_id).then(function(response) {
  				var dataToSend = {
  					json: response.data,
  					service_id: service_id,
  					project_id: srv._id,
  					srv: srv
  				}
  				ShareDataFactory.setData(dataToSend);
  				launchDialog();
  			});
  		};

      //launch dialog
  		function launchDialog () {
  			ngDialog.open({
  				template: 'app/services/instantiateService/instantiateSrv-dialog.tpl.html',
  				className: 'ngdialog-theme-default',
  				controller: 'InstantiateServiceController',
  				controllerAs: 'instancesrv'
  			});
  		}







    }
})();
