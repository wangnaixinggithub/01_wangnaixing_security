import auth from '@/utils/auth'
import dataApi from "../../api/login"

const user = {
  state: {
    token: auth.getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    /**
     * 登录方法
      * @param userInfo 登录的用户模型
     */
    Login({ commit }, userInfo) {


      const username = userInfo.username.trim()

      return new Promise((resolve, reject) => {

        dataApi.login(username, userInfo.password).then(response => {
          const data = response.data

          //1、调用登录API得到JWT
          const tokenStr = data.tokenHead + data.token

          //2、JWT存入Token
          auth.setToken(tokenStr)

          //3、更新Store 存入Token
          commit('SET_TOKEN', tokenStr)
          resolve()

        }).catch(error => {

          reject(error)

        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {

        dataApi.getAdminInfo().then(response => {
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组

            commit('SET_ROLES', data.roles)
          } else {

            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)

          resolve(response)
        }).catch(error => {

          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {

      return new Promise((resolve, reject) => {

        dataApi.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          auth.removeToken()
          resolve()

        }).catch(error => {

          reject(error)

        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {

        commit('SET_TOKEN', '')
        auth.removeToken()

        resolve()
      })
    }
  }
}

export default user
