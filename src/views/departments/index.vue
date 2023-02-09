<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card" v-loading="loading">
        <treeTools
          :treeNode="company"
          :is-root="true"
          @opendialogVisible="openDialog"
        ></treeTools>
        <el-tree :data="departs" :props="defaultProps">
          <template #default="{ data }">
            <treeTools
              :treeNode="data"
              @delDepartments="getDepartmentsList()"
              @opendialogVisible="openDialog"
              @editialogVisible="editialog"
            ></treeTools>
          </template>
        </el-tree>
      </el-card>
      <addDeptVue
        ref="addDept"
        :dialogVisible.sync="dialogVisible"
        :origindeparts="origindeparts"
        :objnode="objnode"
        @adddept="getDepartmentsList()"
      ></addDeptVue>
    </div>
  </div>
</template>
<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/department'
import addDeptVue from './components/add-dept.vue'
import { recursionDepartsFn } from '@/utils'
export default {
  components: {
    treeTools,
    addDeptVue
  },
  data() {
    return {
      departs: [],
      objnode: {},
      origindeparts: [],
      loading: true,
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: ''
      },
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false
    }
  },
  methods: {
    async getDepartmentsList() {
      let {
        data: { depts, companyName, companyManage }
      } = await getDepartments()
      this.company.name = companyName
      this.company.manager = companyManage
      this.company.id = ''
      this.origindeparts = depts
      this.departs = recursionDepartsFn(depts, '')
      this.loading = false
    },
    openDialog(data) {
      this.dialogVisible = true
      this.objnode = data
    },
    editialog(treeNode) {
      this.dialogVisible = true
      this.objnode = treeNode
      this.$nextTick(() => {
        this.$refs.addDept.getDepartmentsDeatails(this.objnode.id)
      })
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
