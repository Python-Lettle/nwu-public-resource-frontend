import api from '../index'

export default {
  // 登录
  login: (data: {
    id: number
    password: string
  }) => api.post('http://localhost:8080/user/login', data, {
    baseURL: '/mock/',
  }),

  // 获取权限
  permission: () => api.get('http://localhost:8080/user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('http://localhost:8080/user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
