import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'tree-table' }
    },
    {
      path: 'leaveApproval/:id',
      name: 'leaveApproval',
      component: () => import('@/views/approvals/components/leaveApproval'),
      meta: { title: '审批', icon: 'tree-table' },
      hidden: true
    },
    {
      path: 'salaryApproval/:id',
      name: 'salaryApproval',
      component: () => import('@/views/approvals/components/salaryApproval'),
      meta: { title: '审批', icon: 'tree-table' },
      hidden: true
    },
    {
      path: 'enterApproval/:id',
      name: 'enterApproval',
      component: () => import('@/views/approvals/components/enterApproval'),
      meta: { title: '审批', icon: 'tree-table' },
      hidden: true
    },
    {
      path: 'quitApproval/:id',
      name: 'quitApproval',
      component: () => import('@/views/approvals/components/quitApproval'),
      meta: { title: '审批', icon: 'tree-table' },
      hidden: true
    },
    {
      path: 'overtimeApproval/:id',
      name: 'overtimeApproval',
      component: () => import('@/views/approvals/components/overtimeApproval'),
      meta: { title: '审批', icon: 'tree-table' },
      hidden: true
    }
  ]
}
