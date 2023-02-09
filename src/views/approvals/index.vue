<template>
  <div class="approvals-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>当前审批中本月审批通过本月审批驳回</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">流程设置</el-button>
        </template>
      </Pagetools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="审批类型" prop="processName" sortable />
          <el-table-column label="申请人" prop="username" sortable />
          <el-table-column
            label="当前审批人"
            prop="procCurrNodeUserName"
            sortable
          />
          <el-table-column label="审批发起时间" prop="procApplyTime" sortable>
            <template slot-scope="scope">
              <span>
                {{ scope.row.procApplyTime | formatTime('YYYY年MM月DD日') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="审批状态" prop="process_state" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.processState === '0'" class="rovalsState">
                <em class="sub" />已提交
              </span>
              <span v-if="scope.row.processState === '1'" class="rovalsState">
                <em class="stay" />审批中
              </span>
              <span v-if="scope.row.processState === '2'" class="rovalsState">
                <em class="adopt" />审批通过
              </span>
              <span v-if="scope.row.processState === '3'" class="rovalsState">
                <em class="reject" />审批不通过
              </span>
              <span v-if="scope.row.processState === '4'" class="rovalsState">
                <em class="revoke" />撤销
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="pushdao(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :current-page="page.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getApprovalList } from '@/api/approvals'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  created() {
    this.getApproval()
  },
  methods: {
    // indexFn(index) {
    //   return index + (this.page.page - 1) * this.page.pageSize + 1
    // },
    async getApproval() {
      let { data } = await getApprovalList({ year: 2018, ...this.page.page })
      this.list = data.rows
      this.page.total = data.total
    },
    handleSizeChange() {},
    currentChange() {},
    pushdao(obj) {
      let processName = obj.processName
      switch (processName) {
        case '工资':
          this.$router.push({
            path: '/approvals/salaryApproval/' + obj.processId
          })
          break
        case '入职':
          this.$router.push({
            path: '/approvals/enterApproval/' + obj.processId
          })
          break
        case '请假':
          this.$router.push({
            path: '/approvals/leaveApproval/' + obj.processId
          })
          break
        case '离职':
          this.$router.push({
            path: '/approvals/quitApproval/' + obj.processId
          })
          break
        case '加班':
          this.$router.push({
            path: '/approvals/overtimeApproval/' + obj.processId
          })
      }
      // $router.push(`approvals/leaveApproval/${scope.row.id}`)
    }
  }
}
</script>

<style></style>
