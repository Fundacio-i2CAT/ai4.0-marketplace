(function() {
  'use strict';

  angular
    .module('marketplace')
    .controller('PendingProjectController', PendingProjectController);

    PendingProjectController.$inject = ['$log', 'toastr', 'ProjectFactory', 'LocalStorageFactory', 'ImageProviderFactory', 'LiteralFactory', '$state'];

    function PendingProjectController($log, toastr, ProjectFactory, LocalStorageFactory, ImageProviderFactory, LiteralFactory, $state) {
      var vm = this;

      //table sorting
      vm.sortType = 'created_at';
  		vm.sortReverse = true;

      //table pagination
  		vm.viewby = 10;
  		vm.currentPage = 1;
  		vm.itemsPerPage = vm.viewby;
  		vm.maxSize = 10;
  		vm.numPages;
  		vm.pageNumberOptions = [{value: 3, name: "3"}, {value: 5, name: "5"}, {value: 10, name: "10"}, {value: 30, name: "30"}];


  		vm.setPage = function(pageNum){
  			vm.currentPage = pageNum;
  		}

  		vm.pageChanged = function(){
  			$log.log('pagina cambiada a...',vm.currentPage);
  		}

  		vm.setItemsPerPage = function(num) {
  			vm.itemsPerPage = num.value;
  			vm.currentPage = 1;
  			vm.numPages=Math.ceil(vm.allPendingProviderProjects.length/num.value);
  			$log.log(num);
  		};



      vm.getPendingProviderProjectsByPartnerId = function () {
        ProjectFactory.getPendingProviderProjectsByPartnerId().then(function (response){
          if (response.data.status != 200) {
            toastr.error('Hi ha hagut un error al obtenir els projectes pendents...', 'Hi ha un problema');
          } else {
            vm.allPendingProviderProjects = response.data.response.result;

            // provprojets table pagination
  					vm.totalItems = vm.allPendingProviderProjects.length;
  					vm.numPages = Math.ceil(vm.allPendingProviderProjects.length/vm.viewby.value);
  					vm.pageNumberOptions.push({value: vm.totalItems, name: "Tots"});

            if (vm.allPendingProviderProjects.length > 0) {
              toastr.info("Té " + vm.allPendingProviderProjects.length + " projectes(s) per confirmar");
            }
          }
        }, function (error){});
      };

      vm.getPendingProviderProjectsByPartnerId();

      vm.getImage = function (name) {
  			return ImageProviderFactory.getServiceImage(name);
  		};

      vm.getLiteralStatus = function(status){
  			return LiteralFactory.getLiteralStatus(status);
  		};

  		vm.getStatusClass = function(status){
  			return LiteralFactory.getStatusClass(status);
  		};

      vm.confirmProviderProject = function (srv) {
  			/////////////////////////////////////////////////////////////////////
  			ProjectFactory.confirmProviderProject(srv).then(function(response){
  				if (response.status === 200) {
  					$log.log('project is confirmed!!');
            toastr.success("El Projecte s'ha confirmat correctament", 'Confirmació projecte');
            $state.reload();

  				} else {
  					toastr.error("No s'ha pogut confirmar el Servei...", 'Error de Confirmació');
  				}
  			});
  		};


    }
})();
