import $http from "@/common/http"

/**
 * 获取全部菜单
 * @param parentId 父级菜单ID
 * @param params 查询参数
 * @returns {*}
 */
 const  findAllMenu = (parentId, params) => $http.get('/menu/list/' + parentId,params)


/**
 * 删除菜单
 * @param id 菜单ID
 * @returns {*}
 */
const deleteMenu = id => $http.post('/menu/delete/' + id)



/**
 * 创建菜单
 * @param data
 * @returns {*}
 */
const createMenu = data => $http.post('/menu/create',data)


/***
 * 更新菜单
 * @param id
 * @param data
 * @returns {*}
 */
const updateMenu = (id, data) =>  $http.post('/menu/update/' + id,data)


/**
 * 获取菜单详情
 * @param id
 * @returns {*}
 */
const getMenu = id => $http.get('/menu/' + id)



/**
 * 隐藏菜单
 * @param id
 * @param params
 * @returns {*}
 */
const updateHidden = (id, params) => $http.post('/menu/updateHidden/' + id,params)



/**
 * 获取菜单树
 * @returns {*}
 */
const fetchTreeList = () => $http.get('/menu/treeList')




const dataApi = {
  findAllMenu, //获取全部菜单
  deleteMenu, //删除菜单
  createMenu, //创建菜单
  updateMenu, //更新菜单
  getMenu,//获取菜单详情
  updateHidden, //修改菜单状态
  fetchTreeList, //获取菜单树

}

export default dataApi

