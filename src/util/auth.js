import Cookies from 'js-cookie'

export const TOKEN_KEY = 'authorization'

export function token() {
    return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
    return Cookies.remove(TOKEN_KEY)
}