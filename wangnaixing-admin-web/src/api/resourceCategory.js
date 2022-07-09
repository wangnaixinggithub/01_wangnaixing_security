import $http from "@/common/http"

/**
 * 获取全部资源分类
 * @returns {*}
 */
const listAllCate = () =>  $http.get('/resourceCategory/listAll')


/**
 * 创建资源分类
 * @param data
 * @returns {*}
 */
const createResourceCategory = data =>  $http.post('/resourceCategory/create',data)


/**
 * 更新资源分类
 * @param id
 * @param data
 * @returns {*}
 */
const updateResourceCategory = (id, data)  => $http.post('/resourceCategory/update/' + id,data)



/**
 * 删除资源分类
 * @param id
 * @returns {*}
 */
const deleteResourceCategory = id => $http.post('/resourceCategory/delete/' + id)


const dataApi = {
  listAllCate, // 获取全部资源分类
  createResourceCategory, //  创建资源分类
  updateResourceCategory, // 更新资源分类
  deleteResourceCategory // 删除资源分类
}

export default dataApi
