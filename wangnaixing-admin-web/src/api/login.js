import $http from '@/common/http'

/**
 * 登录接口
 * @param username 用户名
 * @param password 密码
 * @returns
 */
 const login =(username, password)=> $http.post('/admin/login',{username,password})

/**
 * 获取用户信息
 * @returns
 */
const getAdminInfo = () => $http.get('/admin/info')


/**
 * 登出接口
 * @returns
 */
const logout= ()=> $http.post('/admin/logout')



/**
 * 获取用户列表
 * @param params
 * @returns {*}
 */
const findAll = params=> $http.get('/admin/list',params)



/**
 * 创建用户信息
 * @param data
 * @returns
 */
const  createAdmin = data =>  $http.post('/admin/register',data)



/**
 * 更新用户信息
 * @param id
 * @param data
 * @returns
 */
const updateAdmin = (id, data) =>  $http.post('/admin/update/',data)


/**
 * 更新用户状态
 * @param id
 * @param params
 * @returns {*}
 */
const  updateAdminStatus = (id, params) =>  $http.post('/admin/updateStatus/'+id,params)



/**
 * 删除用户信息
 * @param id
 * @returns {*}
 */
const deleteAdmin = id => $http.post('/admin/delete/'+id)


/**
 * 获取用户角色
 * @param id
 * @returns {*}
 */
const getRoleByAdmin = id => $http.get('/admin/role/' + id)


/***
 * 分配角色
 * @param data
 * @returns {*}
 */
const allocRole = data => $http.post('/admin/role/update',data)



const dataApi = {
  login, //登录
  logout, //退出
  getAdminInfo, //获取用户信息
  findAll, //查询全部用户信息
  createAdmin, //创建用户信息
  updateAdmin, //修改用户信息
  updateAdminStatus,  //更新用户状态
  deleteAdmin, //删除用户信息
  getRoleByAdmin, //根据用户获取角色
  allocRole, //分配角色
}

export default dataApi
