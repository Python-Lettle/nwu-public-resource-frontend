import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/wall',
  component: Layout,
  redirect: '/wall/index',
  name: 'wall',
  meta: {
    title: '信息墙',
  },
  children: [
    {
      path: 'index',
      name: 'wallIndex',
      component: () => import('@/views/wall/index.vue'),
      meta: {
        title: '信息墙主页',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/tab_example',
      },
    },
  ],
}

export default routes
