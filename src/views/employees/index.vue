<template>
  <div class="employees-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>当前共有{{ total }}条记录</span>
        </template>
        <template #right>
          <el-button type="primary" size="small" @click="handleDownload()"
            >普通excel导出</el-button
          >
          <el-button type="primary" size="small">复杂excel导出</el-button>
          <el-button
            type="primary"
            size="small"
            @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button type="primary" size="small" @click="addUser()"
            >新增员工</el-button
          >
        </template>
      </Pagetools>
      <el-card class="box-card">
        <el-table v-loading="loading" border :data="list">
          <el-table-column
            label="序号"
            type="index"
            sortable=""
            :index="indexFn(index)"
          />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
            :formatter="formOfEmploymentFn"
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatTime('YYYY年MM月DD日') }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
      <add-employee :showDialog.sync="showDialog"></add-employee>
    </div>
  </div>
</template>

<script>
import { getUserListApi, delUserListApi } from '@/api/employee'
import obj from '@/constant/employees'
import addEmployee from './components/add-employee.vue'
import { formatTime } from '@/filter'
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
      let {
        data: { rows, total }
      } = await getUserListApi(this.page, this.pageSize)
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
    },
    async handleDownload() {
      const {
        data: { rows }
      } = await getUserListApi(1, this.total)
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '姓名',
          '手机号',
          '入职日期',
          '聘用形式',
          '转正日期',
          '工号',
          '部门'
        ]
        const headers = {
          姓名: 'username',
          手机号: 'mobile',
          入职日期: 'timeOfEntry',
          聘用形式: 'formOfEmployment',
          转正日期: 'correctionTime',
          工号: 'workNumber',
          部门: 'departmentName'
        }
        const data = this.formatJson(rows, tHeader, headers)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '员工列表',
          autoWidth: true,
          bookType: 'xlsx',
          multiHeader,
          merges
        })
      })
    },
    formatJson(rows, tHeader, headerasRelations) {
      //创建一个一级空数组
      let arr = []
      // 对接口传递的数据进行遍历
      rows.forEach((item, index) => {
        //创建一个二级空数组
        let theaderarr = []
        // 对中文的表头进行遍历
        tHeader.forEach(key => {
          // 把中文表头在中英文对照中找到英文存到englishKey中
          let englishKey = headerasRelations[key]
          // 解构常量文件夹中的聘用形式常量
          let { hireType } = obj
          // 判断中英文对照中找到英文englishKey是否是聘用形式
          if ('formOfEmployment' === englishKey) {
            // 将请求来的数字对比常量文件夹，赋值客户能看懂的词语
            let obj = hireType.find(
              item => item.id === +rows[index][englishKey]
            )
            rows[index][englishKey] = obj ? obj.value : '未知'
          }
          // 判断中英文对照中找到英文englishKey是否是入职日期、转正日期
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            // 将请求来的时间进行时间格式化处理
            rows[index][englishKey] = formatTime(
              rows[index][englishKey],
              'YYYY年MM月DD日'
            )
          }
          // 将处理好的数据添加二级空数组中
          theaderarr.push(rows[index][englishKey])
        })
        // 将处理好的二级数组添加到一级空数组中
        arr.push(theaderarr)
      })
      return arr
    }
  }
}
</script>

<style></style>
