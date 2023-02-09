<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="addPermiss(1, 0)"
            >添加权限</el-button
          >
        </div>
        <el-table border :data="permissionList" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button
                v-if="row.type === 1"
                size="small"
                type="text"
                @click="addPermiss(2, row.id)"
                >添加权限点</el-button
              >
              <el-button size="small" type="text" @click="lookPermiss(row.id)"
                >查看</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="shanchuPermiss(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        :visible="showDialog"
        :title="showDialogTitle"
        @close="showdialogT()"
      >
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              inactive-color="#ff4949"
              active-text="启用"
              active-value="1"
              inactive-text="不启用"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="showdialogT()">取消</el-button>
            <el-button type="primary" @click="submitPermiss">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  reqGetPermissionList,
  reqAddPermission,
  reqUpdatePermission,
  reqDelPermission,
  reqGetPermissionDetail
} from '@/api/permission'
import { recursionDepartsFn } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      list: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  async created() {
    this.ceratedpro()
  },
  computed: {
    showDialogTitle() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },

  methods: {
    showdialogT() {
      this.showDialog = false
      this.formData = {
        enVisible: '0',
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      }
    },
    async ceratedpro() {
      const { data } = await reqGetPermissionList()
      const list = recursionDepartsFn(data, '0')
      this.permissionList = list
    },
    addPermiss(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    async submitPermiss() {
      if (this.formData.id) {
        await reqUpdatePermission(this.formData)
        this.$message.success('修改成功')
      } else {
        await reqAddPermission(this.formData)
        this.$message.success('新增成功')
      }

      this.ceratedpro()
      this.showDialog = false
    },
    async shanchuPermiss(id) {
      await reqDelPermission(id)
      this.ceratedpro()
    },
    async lookPermiss(id) {
      let { data } = await reqGetPermissionDetail(id)

      this.formData = data
      console.log(this.formData)
      this.showDialog = true
    }
  }
}
</script>
