<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="medium" @click="dialogVisible = true">新增角色</el-button>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="180" :index="indexFn(index)">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button type="success" size="medium">分配权限</el-button>
                  <el-button type="primary" size="medium" @click="editRoleDetails(row.id)">编辑</el-button>
                  <el-button type="danger" size="medium" @click="del(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="currentChange" :current-page="page"
              :page-sizes="[1, 2, 3, 4, 5]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyForm.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="showTitle" :visible="dialogVisible" @close="closeDialog()">
        <el-form ref="roleForm" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="1-50个字符"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="1-50个字符"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="submitRole()">确 定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, delRole, addRole, getdelRole, editRoleDeta } from '@/api/setting'
import { getCompany } from '@/api/company'
export default {
  data() {
    return {
      activeName: 'role',
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 5,
      index: 0,
      loading: true,
      showTitle: '新增角色',
      dialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      companyForm: {

      },
      rules: {
        name: [{

          required: true,
          message: '角色名称不能为空',
          trigger: ['blur', 'change']

        }],
        description: [{

          required: true,
          message: '角色描述不能为空',
          trigger: ['blur', 'change']

        }]
      }
    }
  },
  created() {
    this.getRole()
    this.getCompanyxinxi()
  },
  methods: {
    async getCompanyxinxi() {
      let { data } = await getCompany(this.$store.state.user.userInfo.companyId)
      this.companyForm = data
    },
    async getRole() {
      let {
        data: { rows, total }
      } = await getRoleList(this.page, this.pageSize)
      this.tableData = rows
      this.total = total
      this.loading = false
    },
    currentChange(val) {
      this.page = val
      this.getRole()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRole()
    },
    indexFn(index) {
      return index + 1 + (this.page - 1) * this.pageSize
    },
    del(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delRole(id)
          if (this.tableData.length === 1 && this.page > 1) {
            this.page--
          }
          this.getRole()
        })
        .catch(() => {
          console.log('取消了删除')
        })
    },
    closeDialog() {
      this.dialogVisible = false
      this.$refs.roleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    submitRole() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          await editRoleDeta(this.form)
          this.$message.success('编辑角色成功')
        } else {
          await addRole(this.form)
          this.$message.success('新增角色成功')
        }
        this.closeDialog()
        this.getRole()
      })

    },
    async editRoleDetails(id) {
      this.showTitle = '编辑角色'
      this.dialogVisible = true
      let { data } = await getdelRole(id)
      this.form = data

    }
  }
}
</script>

<style scoped>
.box-card {
  padding: 0px 30px;
  font-size: 14px;
}
</style>
