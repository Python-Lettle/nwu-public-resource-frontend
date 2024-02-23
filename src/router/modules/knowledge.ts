import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/knowledge',
  component: Layout,
  redirect: '/knowledge/index',
  name: 'knowledge',
  meta: {
    title: '知识库',
  },
  children: [
    {
      path: 'index',
      name: 'knowledgeIndex',
      component: () => import('@/views/knowledge/index.vue'),
      meta: {
        title: '知识库主页',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/knowledge',
      },
    },
  ],
}

export default routes
