import Cookies from "js-cookie"

/**
 * 设置Cookies值
 * @param key
 * @param value
 * @param expires
 * @returns {*}
 */
const setCookie = (key,value,expires) => Cookies.set(key, value,{ expires: expires})

/**
 * 根据Key获取Cookies值
 * @param key
 * @returns {*}
 */
const  getCookie = key => Cookies.get(key)

export default {
  setCookie,
  getCookie
}
