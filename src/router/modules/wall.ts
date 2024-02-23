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
        activeMenu: '/wall',
      },
    },
    {
      path: 'write',
      name: 'wallWrite',
      component: () => import('@/views/wall/write.vue'),
      meta: {
        title: '编写信息',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/wall',
      },
    },
  ],
}

export default routes
