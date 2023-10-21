import Cookies, {CookieAttributes} from 'js-cookie'
export const addCookie = (key: string, value: string, options?: CookieAttributes) : void => {
  options ??= {
    expires: 7
  }

  Cookies.remove(key);
  Cookies.set(key, value, options);
}

export const removeCookie = (key: string) : void => {
  Cookies.remove(key);
}

export const getCookie = (key: string) : string => {
  return Cookies.get(key);
}