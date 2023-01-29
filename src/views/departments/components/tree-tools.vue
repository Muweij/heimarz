<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="delepartment">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="!isRoot"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="!isRoot"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartments } from '@/api/department'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delepartment(command) {
      //   添加
      if (command === 'add') {
        this.$emit('opendialogVisible', this.treeNode)
      }
      //   编辑
      if (command === 'edit') {
        this.$emit('editialogVisible', this.treeNode)
      }
      //   删除
      if (command === 'del') {
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await deleteDepartments(this.treeNode.id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$emit('delDepartments')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
