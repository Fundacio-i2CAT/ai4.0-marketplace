(function (){
  'use strict';

  angular
    .module('marketplace')
    .controller('OwnProjectController', OwnProjectController);

    OwnProjectController.$inject = [];

    function OwnProjectController() {
      var vm = this;
      vm.text = 'OwnProjectController';



    }
})();
