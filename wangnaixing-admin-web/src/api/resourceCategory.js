import request from '@/utils/request'

/**
 * 获取全部资源分类
 * @returns {*}
 */
export const listAllCate = () =>  {
  return request({
    url: '/resourceCategory/listAll',
    method: 'get'
  })
}

/**
 * 创建资源分类
 * @param data
 * @returns {*}
 */
export const createResourceCategory = data =>  {
  return request({
    url: '/resourceCategory/create',
    method: 'post',
    data: data
  })
}
/**
 * 更新资源分类
 * @param id
 * @param data
 * @returns {*}
 */
export const updateResourceCategory = (id, data)  =>  {
  return request({
    url: '/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

/**
 * 删除资源分类
 * @param id
 * @returns {*}
 */
export const deleteResourceCategory = id => {
  return request({
    url: '/resourceCategory/delete/' + id,
    method: 'post'
  })
}
