<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <el-select
        v-model="currentYear"
        @change="changeDate()"
        size="small"
        style="width: 120px; margin-right: 10px"
      >
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px;"
        @change="changeDate()"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date,data }">
        <div class="date-content">
          <span class="text">{{
            data.day
              .split('-')
              .slice(2)
              .join('-')
          }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      currentDate: new Date(),
      currentYear: null, // 当前年份
      currentMonth: null // 当前月份
      //   yearList: [] // 要遍历的年的数组
    }
  },
  computed: {
    yearList() {
      return Array.from(
        new Array(11),
        (item, index) => index + this.currentYear - 5
      )
    }
  },
  watch: {
    currentDate(newValue) {
      this.currentYear = newValue.getFullYear()
      this.currentMonth = newValue.getMonth() + 1
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear() // 得到当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月份
  },
  methods: {
    changeDate() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}`)
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height: auto;
}
::v-deep
  .el-calendar-table__row
  td::v-deep
  .el-calendar-table
  tr
  td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
