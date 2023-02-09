<template>
  <div>
    <div v-if="showProgress">
      <div>
        <el-progress style="windth:180px" :percentage="percent"></el-progress>
      </div>
    </div>
    <el-upload
      :class="{ disabled: fileComputed }"
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :limit="limitNum"
      :on-remove="handleRemove"
      :http-request="upload"
      :on-change="onChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="800px"
    >
      <img
        style="width:100%; display:block;margin:0 auto"
        :src="dialogImageUrl"
        alt=""
      />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({})
export default {
  props: {
    limitNum: {
      type: Number
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      showProgress: true,
      percent: 0,
      fileList: [
        {
          name: '图片',
          url: ''
        }
      ]
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length >= this.limitNum
    },
    uploadAllSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    upload(file) {
      cos.putObject(
        {
          Bucket: 'mustorage-1316698178' /* 填写自己的 bucket，必须字段 */,
          Region: 'ap-beijing' /* 存储桶所在地域，必须字段 */,
          Key: parseInt(Math.random() * 999999) + file.file.name,
          Body: file.file,
          onProgress: progressData => {
            this.percent = parseInt(progressData.percent * 100)
            setTimeout(() => {
              this.showProgress = false
              this.percent = 0
            }, 2000)
          }
        },
        (err, data) => {
          if (data.statusCode === 200) {
            const fileObj = this.fileList.find(
              item => item.uid === file.file.uid
            )
            fileObj.url = 'https://' + data.Location
            fileObj.status = 'success'
          }
          console.log(err || data)
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      let arr = ['image/ipeg', 'image/gif', 'image/bmp', 'image/png']
      if (!arr.includes(file.type)) {
        this.$message.error('上传的图片格式, 必须是jpg, gif, bmp, png的格式!')
        return false
      }
      if (file.size / 1024 / 1024 >= 5) {
        this.$message.error('上传头像过大, 超过了5M, 必须5M以内')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
