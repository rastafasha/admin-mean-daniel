// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local
  apiUrl: "http://localhost:3000/api",
  apiUrlMedia: 'https://res.cloudinary.com/dmv6aukai/image/upload/v1741218430/articlesApp/uploads',
  urlFrontPage: 'https://articlesapp-jade.vercel.app',
  
  //google
  clientGoogle: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',
  // paypal
  imageURLProductsub: 'https://articlesapp-jade.vercel.app/assets/img/icon-150x150.png',
  clientIdPaypal: 'Aebb_SJ2-L8OrgRAvAERINfyMb7eKrqZ7xPt5JreBd9eYfDjzfDildStuo5Gjcx6GNvWbTZaiwBiMeAf',
  secretPaypal: 'EPrUzIEuBe0CjvIr7AbBfWGEjW2eotI8cq2UHtJ_YsZp47H5K0-QXib6joqRhZ8H14U7sTKg7iGeRi-Y',
  paypalApi: 'https://api-m.sandbox.paypal.com'
  

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
