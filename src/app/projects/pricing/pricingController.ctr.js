(function () {
  'use strict';

  angular
    .module('marketplace')
    .controller('PricingController', PricingController);

    PricingController.$inject = ['$log', 'ProjectFactory', '$translate'];

    function PricingController($log, ProjectFactory, $translate) {
      var vm = this;
      vm.consumeHistory;
      vm.noConsumption = false;
      vm.showEmptyData = false;
      vm.consumeHistory = [];

      vm.getConsumptionData = function (dates, srv) {
        if (!dates) return;
        if (dates.initial == null || dates.initial == undefined || dates.final == null || dates.final == undefined) return;

        var initial = angular.element('#initial').val();
        var final = angular.element('#final').val();

        ProjectFactory.getConsumptionData(initial, final, srv).then(function(response){
          if (response.status == 404) {
            vm.noConsumption = true;
            vm.backMessage = ($translate.use()=='CAT') ? response.data.message.ca : response.data.message.es
          }
          if (response.data.lapses && response.data.lapses.length>0) {
            vm.consumeHistory = response.data;
          }
          if (response.data.lapses && response.data.lapses.length === 0) {
            vm.showEmptyData = true;
          }
        }, function (error){
          $log.log(error);
        });
      };



    }
})();
