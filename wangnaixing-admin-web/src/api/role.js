import $http from "@/common/http";

/**
 * 获取角色列表
 * @param params
 * @returns {*}
 */
const fetchList = params => $http.get('/role/list',params)

/**
 * 创建角色
 * @param data
 * @returns {*}
 */
const createRole = data => $http.post('/role/create',data)

/**
 * 更新角色
 * @param id
 * @param data
 * @returns {*}
 */
export const updateRole = (id, data) => $http.post('/role/update/' + id,data)


/**
 * 更新角色状态
 * @param id
 * @param params
 * @returns {*}
 */
export const updateStatus = (id, params) => $http.post('/role/updateStatus/' + id,params)


/**
 * 删除角色
 * @param data
 * @returns {*}
 */
const deleteRole = data => $http.post('/role/delete',data)


/**
 * 获取全部角色
 * @returns {*}
 */
const fetchAllRoleList = () => $http.get('/role/listAll')



/**
 * 获取角色菜单
 * @param roleId
 * @returns {*}
 */
export const listMenuByRole = roleId => $http.get('/role/listMenu/'+roleId)



/**
 * 获取角色对应资源
 * @param roleId
 * @returns {*}
 */
export const listResourceByRole = roleId => $http.get('/role/listResource/'+roleId)



/**
 * 分配菜单
 * @param data
 * @returns {*}
 */
export const allocMenu = data => $http.post('/role/allocMenu',data)



/**
 * 分配资源
 * @param data
 * @returns {*}
 */
const allocResource = data => $http.post('/role/allocResource',data)

const dataApi = {
  fetchList, //获取角色列表
  createRole, // 创建角色
  updateRole, // 更新角色
  updateStatus, //更新角色状态
  deleteRole, //删除角色
  fetchAllRoleList, //获取全部角色
  listMenuByRole, //获取角色菜单
  listResourceByRole, //获取角色对应资源
  allocMenu,// 分配菜单
  allocResource //分配资源

}

export default dataApi;
