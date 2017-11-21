import * as config from '@config';

export const init = () => {
  return new Promise((resolve, reject) => {
    if (typeof FB !== 'undefined') {
      console.log('Facebook initialized');
      resolve();
    } else {
      window.fbAsyncInit = () => {
        FB.init({
          appId      : config.facebookAppId,
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });
        console.log('Facebook init', config.facebookAppId);
        FB.AppEvents.logPageView();
        resolve();
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  });
};

//FB JS SDK doesn't handle promises well.
export const login = (scope, resolve, reject) => {
  console.log('Facebook login');
    const options = {
      scope: scope,
    };
    FB.login((response) => {
      response.status === 'connected' ? resolve(response) : reject(response);
    }, options);
};
