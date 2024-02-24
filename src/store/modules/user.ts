import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const id = ref(localStorage.id ?? '')
    const token = ref(localStorage.token ?? '')
    const failure_time = ref(localStorage.failure_time ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        // if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
        retn = true
        // }
      }
      return retn
    })

    // 登录
    async function login(data: {
      id: string
      password: string
    }) {
      const res = await apiUser.login(data)
      console.log(res);
      if (res.data.id != undefined) {
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('token', 'loged');
      }
      // localStorage.setItem('failure_time', '')
      // localStorage.setItem('avatar', '')
      // id.value = res.data.data

      // token.value = res.data.token
      // failure_time.value = res.data.failure_time
      // avatar.value = res.data.avatar
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      localStorage.removeItem('avatar')
      id.value = ''
      token.value = ''
      failure_time.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      id,
      token,
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
