<template>
  <div>
    <div class="leavegeren">
      <div class="leaveshen">申请请假</div>
      <div class="leavexinxi">
        <div class="leavr_tupian">
          <img src="@/assets/common/img.jpeg" />
        </div>
        <div class="leavr_xinxi">
          <div class="leave_xingming">{{ Approvallist.username }}</div>
          <div class="leave_bumen">部门:{{ Approvallist.departmentName }}</div>
          <div class="leave_shijian">
            入职时间:{{
              Approvallist.procApplyTime | formatTime('YYYY年MM月DD日')
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="qingjia">
      <div>
        <span>
          申请类型：
        </span>
        <span>{{ procData.processName }}</span>
      </div>
      <div>
        <span> 请假类型：</span>
        <span>事假</span>
      </div>
      <div>
        <span> 申请单位：</span>
        <span>{{ procData.applyUnit }}</span>
      </div>
      <div>
        <span>开始时间：</span>
        <span>{{ procData.startTime }}</span>
      </div>
      <div>
        <span> 结束时间：</span>
        <span>{{ procData.endTime }}</span>
      </div>
      <div>
        <span>请假时长：</span>
        <span>{{ procData.holidayType }}</span>
      </div>
      <div>
        <span> 申请事由：</span>
        <span>{{ procData.reason }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompany } from '@/api/approvals'
export default {
  data() {
    return {
      Approvallist: {},
      procData: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  methods: {
    async getqingjia() {
      let { data } = await getCompany(this.userId)
      this.procData = JSON.parse(data.procData)
      console.log(this.procData)
      this.Approvallist = data
    }
  },
  created() {
    this.getqingjia()
  }
}
</script>

<style lang="scss" scoped>
.leavegeren {
  padding-top: 20px;
  margin: 40px 0 0 40px;
  width: 950px;
  height: 230px;
  .leaveshen {
    height: 60px;
    font-weight: 700;
    font-size: 24px;
  }
  .leavexinxi {
    height: 120px;
    display: flex;
    border-bottom: 1px solid #ccc;

    .leavr_tupian {
      width: 100px;
      height: 100px;
      img {
        width: 100px;
      }
    }
    .leavr_xinxi {
      width: 100%;
      height: 140px;

      .leave_xingming {
        margin: 15px 0;
        font-weight: 700;
      }
      .leave_bumen {
        margin: 15px 0;
      }
      .leave_shijian {
        margin: 15px 0;
      }
    }
  }
}
.qingjia {
  width: 950px;
  height: 350px;
  margin: 10px 0 0 200px;
  div {
    span:nth-child(1) {
      display: inline-block;
      width: 90px;
      font-size: 16px;
      margin: 20px 0;
      color: #acacac;
      border-right: 1px solid #acacac;
    }
    span:nth-child(2) {
      display: inline-block;
      margin-left: 15px;
    }
    // &:nth-child(1) {

    // }
  }
}
</style>
