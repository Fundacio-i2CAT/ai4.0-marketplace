(function () {
  'use strict';

  angular
    .module('marketplace')
    .controller('PricingController', PricingController);

    PricingController.$inject = ['$log', 'ProjectFactory'];

    function PricingController($log, ProjectFactory) {
      var vm = this;
      vm.consumeHistory;
      vm.noConsumption = false;
      vm.showEmptyData = false;
      vm.consumeHistory = [];

      var mock = {
          "lapses": [
            {
              "delta": "0:04:45.179000",
              "t0": "2017-02-22 11:24:59.392000",
              "t1": "2017-02-22 11:29:44.571000"
            },
            {
              "delta": "2:38:30.465353",
              "t0": "2017-02-23 08:07:54.227000",
              "t1": "2017-02-23 10:46:24.692353"
            },
            {
              "delta": "2:38:30.465353",
              "t0": "2017-02-23 08:07:54.227000",
              "t1": "2017-02-23 10:46:24.692353"
            }
          ],
          "total_minutes": 163.25,
          "total_delta": "2:43:15.644353"
        };

      vm.getConsumptionData = function (dates, srv) {
        if (!dates) return;
        if (dates.initial == null || dates.initial == undefined || dates.final == null || dates.final == undefined) return;

        var initial = angular.element('#initial').val();
        var final = angular.element('#final').val();

        ProjectFactory.getConsumptionData(initial, final, srv).then(function(response){
          if (response.status == 404) {
            vm.noConsumption = true;
          }
          if (response.data.lapses && response.data.lapses.length>0) {
            vm.consumeHistory = response.data;
          }
          if (response.data.lapses && response.data.lapses.length === 0) {
            vm.showEmptyData = true;
          }
        }, function (error){
          console.log(error);
        });
      };



    }
})();
