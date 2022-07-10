import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

/**
 * 获取Token信息
 * @returns
 */
const getToken = () => Cookies.get(TokenKey)

/**
 * 设置Token信息
 * @param token
 * @returns
 */
const setToken = token => Cookies.set(TokenKey, token)

/**
 * 移除Token信息
 * @returns =
 */
const removeToken = () => Cookies.remove(TokenKey)


let auth =  {
  getToken,
  setToken,
  removeToken

}

export default auth
