import $http from "@/common/http"


/**
 * 获取资源集合
 * @param params
 * @returns {*}
 */
const fetchList = params => $http.get('/resource/list',params)

/**
 * 创建资源
 * @param data
 * @returns {*}
 */
 const createResource = data =>  $http.post('/resource/create',data)


/**
 * 更新资源
 * @param id
 * @param data
 * @returns {*}
 */
 const updateResource = (id, data) => $http.post('/resource/update/' + id,data)


/**
 * 删除资源
 * @param id
 * @returns {*}
 */
const deleteResource = id =>  $http.post('/resource/delete/' + id)


/**
 * 获取全部资源
 * @returns
 */
const fetchAllResourceList = ()=>  $http.get('/resource/listAll')


const  dataApi  = {
  fetchList, //获取资源集合
  createResource, //创建资源
  updateResource,  //更新资源
  deleteResource, //删除资源
  fetchAllResourceList, //获取全部资源

}

export default dataApi
