import request from '@/utils/request'

/**
 * 获取角色列表
 * @param params
 * @returns {*}
 */
export const fetchList = params => {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}
/**
 * 创建角色
 * @param data
 * @returns {*}
 */
export const createRole = data => {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}
/**
 * 更新角色
 * @param id
 * @param data
 * @returns {*}
 */
export const updateRole = (id, data) => {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}
/**
 * 更新角色状态
 * @param id
 * @param params
 * @returns {*}
 */
export const updateStatus = (id, params) => {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    params: params
  })
}
/**
 * 删除角色
 * @param data
 * @returns {*}
 */
export const deleteRole = data => {
  return request({
    url:'/role/delete',
    method:'post',
    data:data
  })
}
/**
 * 获取全部角色
 * @returns {*}
 */
export const fetchAllRoleList = () => {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

/**
 * 获取角色菜单
 * @param roleId
 * @returns {*}
 */
export const listMenuByRole = roleId => {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

/**
 * 获取角色对应资源
 * @param roleId
 * @returns {*}
 */
export const listResourceByRole = roleId => {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

/**
 * 分配菜单
 * @param data
 * @returns {*}
 */
export const allocMenu = data => {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

/**
 * 分配资源
 * @param data
 * @returns {*}
 */
export const allocResource = data => {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}
