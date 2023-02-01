<template>
  <el-dialog
    title="showTitle"
    :visible="dialogVisible"
    width="30%"
    @open="handleopen"
    :before-close="handleClose"
  >
    <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          style="width:80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  computed: {},
  props: {
    objnode: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let checkNameRepeat = (rule, value, callback) => {}
    let checkCodeRepeat = (rule, value, callback) => {}
    return {
      userList: [],
      nodeData: {},
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: ['blur', 'change']
          },
          {
            validator: checkNameRepeat,
            trigger: ['blur']
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: ['blur', 'change']
          },
          {
            validator: checkCodeRepeat,
            trigger: ['blur']
          }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: ['blur', 'change']
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 1,
            max: 300,
            message: '部门介绍要求1-300个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.deptForm.resetFields()
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    handleopen() {}
  }
}
</script>

<style></style>
