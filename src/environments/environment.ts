// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'escuxame-e370b',
    appId: '1:396212512791:web:b27c8d9ee55c0864eb9452',
    storageBucket: 'escuxame-e370b.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAWunsr0hraJHRq61yVnfYhzOSDTdrzp0A',
    authDomain: 'escuxame-e370b.firebaseapp.com',
    messagingSenderId: '396212512791',
    measurementId: 'G-VNX8VC8K6X',
  },
  production: false,
  spotify: {
    client: '571277da4aa84029a30e8d217b91f359',
    secret: 'be85208c469946578cc9e722b0e1c9c9',
    searchURL: 'https://api.spotify.com/v1/search',
    refreshURL: 'https://accounts.spotify.com/api/token',
    token: 'BQCZaMVlU46s7Gq6abrrBDJlhmi9ddUusoMWCR_6NbOgYRKdvBDevjr_X0ZSFpxZF-mpgSW0nEnMMHUhns4ZxCsIQygQnAitcQ31W8n65BSEMlteSee1IjxzTOO41B7J5plUaeqsS4zFT16gvtdOybApEDLqbKbjcHQ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
