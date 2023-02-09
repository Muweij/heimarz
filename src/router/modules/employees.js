import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail'),
      meta: { title: '员工详情' },
      hidden: true
    },
    {
      path: 'print/:id',
      name: 'print',
      component: () => import('@/views/employees/print'),
      meta: { title: '员工打印' },
      hidden: true
    }
  ]
}
