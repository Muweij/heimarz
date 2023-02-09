<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="assignroleing"
    @close="handleCloseDialog"
    @open="openShowDialog"
  >
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        :label="item.id"
        v-for="item in allRoleList"
        :key="item.id"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="commituser()"
        >确定</el-button
      >
      <el-button size="small" @click="handleCloseDialog()">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getStaffInfo } from '@/api/user'
import { editAssignRolesAPi } from '@/api/employee'
export default {
  props: {
    assignroleing: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      allRoleList: []
    }
  },
  methods: {
    handleCloseDialog() {
      this.checkList = []
      this.$emit('update:assignroleing', false)
    },
    async openShowDialog() {
      const { data: data1 } = await getRoleList(1, 10000)
      this.allRoleList = data1.rows
      const { data: data2 } = await getStaffInfo(this.userId)
      this.checkList = data2.roleIds || []
    },
    async commituser() {
      await editAssignRolesAPi(this.userId, this.checkList)
      this.handleCloseDialog()
    }
  },
  created() {}
}
</script>
