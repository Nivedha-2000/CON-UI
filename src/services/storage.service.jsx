import Cookies from 'js-cookie';

const cookie = Cookies;

export const setCookies = (key, data) => {
    cookie.set(key, data)
}
export const getCookies = (key) => {
    return cookie.get(key);
}

export const isSignedIn = () => {
    return cookie.get('cred')
}

export const clearCookies = () => {
    const cookies = cookie.get();
    for(const key in cookies) {
        cookie.remove(key)
    }
}