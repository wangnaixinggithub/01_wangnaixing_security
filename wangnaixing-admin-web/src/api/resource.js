import request from '@/utils/request'

/**
 * 获取资源集合
 * @param params
 * @returns {*}
 */
export const fetchList = params => {
  return request({
    url: '/resource/list',
    method: 'get',
    params: params
  })
}
/**
 * 创建资源
 * @param data
 * @returns {*}
 */
export const createResource = data => {
  return request({
    url: '/resource/create',
    method: 'post',
    data: data
  })
}
/**
 * 更新资源
 * @param id
 * @param data
 * @returns {*}
 */
export const updateResource = (id, data) => {
  return request({
    url: '/resource/update/' + id,
    method: 'post',
    data: data
  })
}
/**
 * 删除资源
 * @param id
 * @returns {*}
 */
export const deleteResource = id => {
  return request({
    url: '/resource/delete/' + id,
    method: 'post'
  })
}
/**
 * 获取全部资源
 * @returns
 */
export const fetchAllResourceList = ()=> {
  return request({
    url: '/resource/listAll',
    method: 'get'
  })
}
