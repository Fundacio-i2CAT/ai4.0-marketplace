(function (){
  'use strict';

  angular
    .module('marketplace')
    .controller('OwnProjectController', OwnProjectController);

    OwnProjectController.$inject = ['OwnProjectFactory', 'toastr'];

    function OwnProjectController(OwnProjectFactory, toastr) {
      var vm = this;
      vm.text = 'OwnProjectController';

      vm.getAllOwnProjects = function() {
        OwnProjectFactory.getAllOwnProjects().then(function(response){
          vm.allMyProjects = response;
        }, function (error){
          console.log(error);
        })
      };

      vm.getAllOwnProjects();


    }
})();
