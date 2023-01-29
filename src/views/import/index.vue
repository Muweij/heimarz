<template>
    <div>
        <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload"></UploadExcel>
    </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { batchUserListApi } from '@/api/employee'
export default {
    components: {
        UploadExcel
    },
    data() {
        return {}
    },
    methods: {
        handleSuccess({ results, header }) {
            if (this.$route.query.type === 'user') {
                this.BarchEmployees(results, header)
            }
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: '请不要上传大于1Mb的文件',
                type: 'warning'
            })
        },
        async BarchEmployees(results, header) {
            const userRelation = {
                入职日期: 'timeOfEntry',
                手机号: 'mobile',
                姓名: 'username',
                转正日期: 'correctiomTime',
                工号: 'workNumber'
            }
            let arr = []
            results.forEach(item => {
                let obj = {}
                for (let key in item) {
                    let englishKey = userRelation[key]
                    if (['correctiomTime', 'timeOfEntry'].includes(englishKey)) {
                        obj[englishKey] = this.formatDate(item[key], '-')
                    }
                    obj[englishKey] = item[key]
                }
                arr.push(obj)
            })
            await batchUserListApi(arr)
            this.$message.success('批量导入成功')
            this.$router.push('/employees')

        },
        formatDate(numb, format) {
            const time = new Date((numb) * 24 * 3600000 + 1)
            time.setYear(time.getFullYear() - 70)
            const year = time.getFullYear() + ''
            const month = time.getMonth() + 1 + ''
            const date = time.getDate() + ''
            if (format && format.length === 1) {
                return year + format + month + format + date
            }
            return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
        }
    }
}
</script>
<style>

</style>
