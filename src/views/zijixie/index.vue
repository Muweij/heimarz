<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card" v-loading="loading">
        <treeTools
          :company="company"
          :fals="false"
          @opendialogVisible="openDialog"
        ></treeTools>
        <el-tree :data="departs" :props="defaultProps">
          <template #default="{ data }">
            <treeTools
              :company="data"
              @opendialogVisible="openDialog"
            ></treeTools>
          </template>
        </el-tree>
      </el-card>
      <addDeptVue
        ref="addDept"
        :objnode="objnode"
        :dialogVisible.sync="dialogVisible"
      ></addDeptVue>
    </div>
  </div>
</template>
<script>
//引用组件
import treeTools from './components/tree-tools.vue'
//引用组件
import addDeptVue from './components/add-dept.vue'
//引用树状数据接口
import { getDepartments } from '@/api/department'
//引用树状处理的方法
import { recursionDepartsFn } from '@/utils'
export default {
  components: {
    treeTools,
    addDeptVue
  },
  data() {
    return {
      //树状处理的数据
      departs: [],
      objnode: {},
      //没有处理的数据
      origindeparts: [],
      //转圈圈
      loading: true,
      //第一行的公司名
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: ''
      },
      //映射关系
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false
    }
  },
  methods: {
    //获取数据，对数据进行树状处理
    async getDepartmentsList() {
      let {
        data: { depts, companyName, companyManage }
      } = await getDepartments()
      //把获取的公司数据存起来
      this.company.name = companyName
      this.company.manager = companyManage
      this.company.id = ''
      //把获取没有处理的数据存起来
      this.origindeparts = depts
      //对数据进行处理
      this.departs = recursionDepartsFn(depts, '')
      this.loading = false
    },
    // 子组件点击添加新部门时触发
    openDialog(data) {
      this.dialogVisible = true
      this.objnode = data
    }
  },
  created() {
    this.getDepartmentsList()
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url('~@/assets/common/add-circle.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      background: url('~@/assets/common/minus-circle.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before {
      background: url('~@/assets/common/user-filling.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
