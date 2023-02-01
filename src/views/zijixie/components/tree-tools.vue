<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col :span="20">
      <span>{{ company.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ company.manager }}</el-col>
        <el-col>
          <el-dropdown @command="delepartment">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit" v-if="fals"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item command="del" v-if="fals"
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
export default {
  props: {
    // 父组件传来的数据
    company: {
      type: Object,
      require: true
    },
    //控制编辑部门和删除部门显示和隐藏
    fals: {
      tyoe: Boolean,
      default: true
    }
  },
  methods: {
    delepartment(command) {
      //添加子部门
      if (command === 'add') {
        this.$emit('opendialogVisible', this.company)
      }
      //修改子部门
      if (command === 'edit') {
      }
      //删除子部门
      if (command === 'del') {
      }
    }
  }
}
</script>
