(function () {
  'use strict';

  angular
    .module('marketplace')
    .controller('PricingController', PricingController);

    PricingController.$inject = ['$http', 'ConnectionFactory'];

    function PricingController($http, ConnectionFactory) {
      var vm = this;

      vm. test = 'PricingController';

      vm.sendDates = function (kkk, srv) {
        console.log(kkk);
        var host = ConnectionFactory.host;
        var url = host+'api/billing/'+srv._id+'?start_date=' + '2017-01-01' + '&end_date=' + '2017-03-01';
        $http.get()
      };



    }
})();
