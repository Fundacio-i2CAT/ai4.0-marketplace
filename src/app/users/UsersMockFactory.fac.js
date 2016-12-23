(function() {
  'use strict';

  angular
    .module('marketplace')
    .factory('UsersMockFacltory', UsersMockFacltory);

    UsersMockFacltory.$inject = [];

    function UsersMockFacltory() {
      var mockUsers =[
        {
            name: 'Obiwan',
            surname: 'Kenovi',
            company: 'Fundació I2cat',
            jobPosition: 'Developer',
            providerRole: true,
            clientRole: false,
            phone: 623456711,
            activated: true,
            address: 'Diagonal, 327',
            mail: 'david@i2cat.net',
            city: 'Barcelona',
            country: 'Espanya',
            cp: 08123,
            description: 'Software Developer at I2cat',
            legal: false
        },
        {
            name: 'Capità',
            surname: 'Enciam',
            company: 'Fundació I2cat',
            jobPosition: 'Developer',
            providerRole: false,
            clientRole: true,
            phone: 639786599,
            activated: false,
            address: 'Valencia, 223',
            mail: 'enciam@i2cat.net',
            city: 'Barcelona',
            country: 'Espanya',
            cp: 08080,
            description: 'Software Engineer at I2cat',
            legal: false
        },
        {
            name: 'Joan',
            surname: 'Fontpineda',
            company: 'Cloud Systems',
            jobPosition: 'Product Manager',
            providerRole: false,
            clientRole: true,
            phone: 639567122,
            activated: true,
            address: 'Aragó 234',
            mail: 'fontpineda@cloudsystems.cat',
            city: 'Barcelona',
            country: 'França',
            cp: 08041,
            description: 'Product Manager at I2cat',
            legal: true
        }
      ];

      return mockUsers;

    }
})();
