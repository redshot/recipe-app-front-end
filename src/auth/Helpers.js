import cookie from 'js-cookie';

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1 // 1 day expiration
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    });
  }
};

// get from cookie such as stored token
// will be useful when we need to make request to the server with token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.findUser);
  next();
};

// access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');

    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};


/**
 * - This file will help save data in the cookies and localstorage.
 *  - This file will also help authenticate the user
 * - Cookies are small strings of data that are stored directly in the browser
 * - The response sent by the backend after signin will be passed to the methods in this file
 * - window is a top level object in the browser
 * 
 * - const authenticate = (response, next) => {}
 *  - The methods above and below of export const authenticate = (response, next) => {} are just helper methods
 *  - The response argument/parameter is what we get after a successful user signin
 *  - The next argument can be a callback function
 *  - This is going to work like a middleware
 *  - We can utilize the helper methonds in this file once we get the response
 * 
 */