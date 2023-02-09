<template>
  <div class="social-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>本月:社保在缴 公积金在缴 增员 减员 入职 离职</span>
        </template>
        <template #right>
          <el-button type="danger" size="small">历史归档</el-button>
          <el-button type="primary" size="small">202302报表</el-button>
        </template>
      </Pagetools>
      <el-card class="boxcard">
        <el-form>
          <div class="department">
            <label class="department-bianti">部门</label>
            <div class="department-liebiao">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    :label="item.id"
                    v-for="item in allRoleList"
                    :key="item.id"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="social">
            <label class="department-bianti">社保城市</label>
            <div class="department-liebiao">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox>北京</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="accumulation">
            <label class="department-bianti">公积金城市</label>
            <div class="department-liebiao">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox>北京</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-form>
      </el-card>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexFn(index)" />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable>
          </el-table-column>
          <el-table-column label="离职时间" prop="leaveTime" sortable>
          </el-table-column>
          <el-table-column
            label="社保城市"
            prop="participatingInTheCity"
            sortable
          />
          <el-table-column
            label="公积金城市"
            prop="providentFundCity"
            sortabl
          />
          <el-table-column
            label="社保基数"
            prop="socialSecurityBase"
            sortable
          />
          <el-table-column
            label="公积金基数"
            prop="providentFundBase"
            sortabl
          />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default>
              <el-button type="text" size="small">查看详情</el-button>
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
import { getDepartments } from '@/api/department'
import { getsocial } from '@/api/social'
export default {
  data() {
    return {
      checkList: [],
      allRoleList: [],
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      selectParams: {},
      index: 0
    }
  },
  created() {
    this.getDepart()
    this.getSocial()
  },
  methods: {
    async getDepart() {
      let { data } = await getDepartments()
      this.allRoleList = data.depts
    },
    async getSocial() {
      try {
        let { data } = await getsocial({ ...this.page, ...this.selectParams })
        this.list = data.rows
        this.page.total = data.total
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
    handleSizeChange(page) {
      this.page.pageSize = page
      this.getSocial()
    },
    currentChange(page) {
      this.page.page = page
      this.getSocial()
    },
    indexFn(index) {
      return index + (this.page.page - 1) * this.page.pageSize + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.boxcard {
  margin-top: 20px;
  .department {
    // height: 155px;
    .department-bianti {
      margin-top: 5px;
      text-align: right;
      float: left;
      width: 100px;
    }
    .department-liebiao {
      position: relative;
      // height: 135px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 14px;
      margin-left: 100px;
    }
  }
  .accumulation {
    height: 60px;
    .department-bianti {
      margin-top: 5px;
      text-align: right;
      float: left;
      width: 100px;
    }
    .department-liebiao {
      position: relative;
      // height: 135px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 14px;
      margin-left: 100px;
    }
  }
  .social {
    height: 60px;
    .department-bianti {
      margin-top: 5px;
      text-align: right;
      float: left;
      width: 100px;
    }
    .department-liebiao {
      position: relative;
      // height: 135px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 14px;
      margin-left: 100px;
    }
  }
}
</style>
