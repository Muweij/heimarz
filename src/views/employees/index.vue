<template>
  <div class="employees-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>当前共有1750条记录</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">普通excel导出</el-button>
          <el-button type="primary" size="small">负责excel导出</el-button>
          <el-button type="primary" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="primary" size="small" @click="addUser()">新增员工</el-button>
        </template>
      </Pagetools>
      <el-card class="box-card">
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" type="index" sortable="" :index="indexFn(index)" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" :formatter="formOfEmploymentFn" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatTime('YYYY年MM月DD日') }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="currentChange" :current-page="page"
          :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
      <add-employee :showDialog.sync="showDialog"></add-employee>
    </div>
  </div>
</template>

<script>
import { getUserListApi, delUserListApi } from "@/api/employee"
import obj from '@/constant/employees'
import addEmployee from './components/add-employee.vue'
export default {
  components: { addEmployee },
  data() {
    return {
      list: [],
      loading: true,
      total: 0,
      page: 1,
      pageSize: 5,
      index: 0,
      showDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      let { data: { rows, total } } = await getUserListApi(this.page, this.pageSize)
      this.list = rows
      this.total = total
      this.loading = false
    },
    currentChange(val) {
      this.page = val
      this.getUserList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    indexFn(index) {
      return index + 1 + (this.page - 1) * this.pageSize
    },
    formOfEmploymentFn(row, column, cellValue, index) {
      const { hireType } = obj
      let result = hireType.find(item => item.id === +cellValue)
      return result ? result.value : '未知'
    },
    del(id) {

      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delUserListApi(id)
          if (this.list.length === 1 && this.page > 1) {
            this.page--
          }
          this.getUserList()
          this.$message.success('删除员工成功')
        })
        .catch(() => {
          console.log('取消了删除')
        })
    },
    addUser() {
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
