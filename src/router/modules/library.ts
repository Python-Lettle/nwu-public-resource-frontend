import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/library',
  component: Layout,
  redirect: '/library/index',
  name: 'library',
  meta: {
    title: '图书馆系统',
  },
  children: [
    {
      path: 'index',
      name: 'libraryIndex',
      component: () => import('@/views/library/index.vue'),
      meta: {
        title: '图书馆主页',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/library',
      },
    },
  ],
}

export default routes
