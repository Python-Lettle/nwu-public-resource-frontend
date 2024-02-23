import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/classroom',
  component: Layout,
  redirect: '/classroom/index',
  name: 'classroom',
  meta: {
    title: '教室占用系统',
  },
  children: [
    {
      path: 'index',
      name: 'classroomIndex',
      component: () => import('@/views/classroom/index.vue'),
      meta: {
        title: '教室占用系统主页',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/classroom',
      },
    },
  ],
}

export default routes
