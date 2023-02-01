import Layout from '@/layout'
export default {
  path: '/zijixie',
  component: Layout,
  children: [
    {
      path: '',
      name: 'zijixie',
      component: () => import('@/views/zijixie/index'),
      meta: { title: '自己写的', icon: 'table' }
    }
  ]
}
