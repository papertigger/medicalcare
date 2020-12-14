<template>
  <div class="home page">
    <div class="title">
      <p>故障总数: {{alldata.all_nums}}个</p>
      <p>告警解除:   {{alldata.relieve_nums}}个</p>
      <p>告警启动:  {{alldata.start_nums}}个</p>
      <p>维修中:   {{alldata.repair_nums}}个</p>
    </div>
    <div class="search">
      <p class="text">关键字</p>
      <el-input placeholder="请输入" v-model="form.input" clearable size="mini"> </el-input>
      <p class="search_button">搜索</p>
    </div>
    <div class="screen">
      <div class="box">
        <p class="text">告警级别:</p>
        <el-select
          v-model="form.type"
          :popper-append-to-body="false"
          clearable
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <p class="text">告警状态:</p>
        <el-select
          v-model="form.staus"
          :popper-append-to-body="false"
          clearable
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <p class="text">发生时间:</p>
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          start-placeholder="请选择"
          end-placeholder="请选择"
          :default-time="['12:00:00']"
          size="mini"
        >
        </el-date-picker>
      </div>
      <div class="box">
        <p class="text">省市区:</p>
        <el-select
          :popper-append-to-body="false"
          v-model="form.province"
          filterable
          placeholder="请选择省"
          size="mini"
        >
          <el-option
            v-for="item in provincearr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="form.city"
          :popper-append-to-body="false"
          :disabled="boolcity"
          filterable
          placeholder="请选择市"
          size="mini"
        >
          <el-option
            v-for="item in cityarr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="form.area"
          :popper-append-to-body="false"
          :disabled="boolarea"
          filterable
          placeholder="请选择区"
          size="mini"
        >
          <el-option
            v-for="item in areaarr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="changemessage">
      <div class='operation'>
        <p>批量开启</p>
        <p>批量停止</p>
      </div>
      <p @click="exportToExcel">导出</p>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      class="table"
      tooltip-effect="dark"
      max-height="350"
      style="width: 100%;font-size: 13px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="info in arr"
        :key="info.class"
        :property="info.class"
        :label="info.name"
      >
        <template slot-scope="scope">
          {{ scope.row[scope.column.property].value }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            class="green"
            @click="details(scope.row)"
            >查看详情</el-button
          >
          <el-button
            type="text"
            size="small"
            :class="{ green: !selectEnable(scope.row) }"
            @click="stare(scope.row,scope.$index)"
            >开启</el-button
          >
          <el-button
            type="text"
            :class="{ table_index5: !selectEnable(scope.row) }"
            size="small"
            @click="stop(scope.row,scope.$index)"
            >停止</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="alldata.all_nums"
      >
      </el-pagination>
    </div>
    <div class="detail"  ref="datadetails" v-show="false">
      <div v-for="(item, index, i) in newdetails" :key="i" style="display:flex;justify-content: flex-start;padding-top: 10px;">
        <p style="width:70px;text-align: left;">{{ item.name }}</p>
        <p>{{ item.value?item.value:'--'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "warning",
  data() {
    return {
      boolcity: true /* 市选择是否禁用 */,
      boolarea: true /* 区选择是否禁用 */,
      clickdata: {} /* 点击时获取的数据 */,
      provincearr: [
        {
          value: "北京",
          label: "北京",
        },
        {
          value: "湖南",
          label: "湖南",
        },
      ],
      cityarr: [
        {
          value: "长沙",
          label: "长沙",
        },
      ],
      areaarr: [
        {
          value: "岳麓区",
          label: "岳麓区",
        },
      ],
      options1: [
        {
          value: "选项1",
          label: "设备1",
        },
        {
          value: "选项2",
          label: "设备2",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "告警解除",
        },
        {
          value: "选项2",
          label: "告警启动",
        },
        {
          value: "选项3",
          label: "维修中",
        }
      ],
      currentPage: 1,
      alldata:{
        all_nums:3,/* 故障总数 */
        relieve_nums:2,/* 故障解除数量 */
        start_nums:1,/* 故障启动数量 */
        repair_nums:0,/* 维修中数量 */
      },
      form: {
        input: "",/* 关键字 */
        time: "",/* 时间 */
        staus: "",/* 告警状态 */
        type: "",/* 告警级别 */
        province: "",/*省  */
        city: "",/*市  */
        area: "",/* 区 */
        page:"warning",
        start:"0",/* 数据获取开始下标 */
        limit:"10"/* 一次性获取多少条 */
      },
      arr: [
        {
          name: "告警ID",
          class: "warnning_id",
        },
        {
          name: "告警事件",
          class: "warnning_name",
        },
        {
          name: "告警状态",
          class: "handle",
        },
        {
          name: "IP",
          class: "open_ip",
        },
        {
          name: "设备地址",
          class: "address",
        },
        {
          name: "发生时间",
          class: "start_time",
        },
      /*   {
          name: "协议名称",
          class: "agreement_name",
        },
        {
          name: "开放端口",
          class: "open_port",
        }, */
      /*   {
          name: "服务",
          class: "serve",
        }, */
        {
          name: "启动类型",
          class: "start_type",
        },
        {
          name: "厂商名称",
          class: "company_name",
        },
        {
          name: "联系人名称",
          class: "contacts",
        },
        {
          name: "联系人电话",
          class: "tel",
        }
      ],
      tableData: [
        {
          warnning_id: {
            name: "告警ID",
            value: "102153526583",
          },
          warnning_name: {
            name: "告警事件",
            value: "高限告警",
          },
          address: {
            name: "设备地址",
            value: "湖南省长沙市岳麓区桐梓坡路",
          },
          handle: {
            name: "告警状态",
            value: "告警解除",
          },
          start_time: {
            name: "发生时间",
            value: "2020-11-30 12:02:03",
          },
          endtime: {
            name: "停止时间",
            value: "",
          },
          handletime: {
            name: "处理时间",
            value: "",
          },
          agreement_name:{
            name: "协议名称",
            value: "http",
          },
          
          open_ip:{
            name: "IP",
            value: "218.104.146.37",
          },
          open_port:{
            name: "开放端口",
            value: "12222",
          },
          online_staus:{
            name: "在线状态",
            value: "开",
          },
        /*   serve:{
            name: "服务",
            value: "DNS开放",
          }, */
          start_type:{
            name: "启动类型",
            value: "手动",
          },
          company_name:{
          name: "厂商名称",
          value: "华自科技",
        },
        contacts:{
          name: "联系人名称",
          value: "刘军",
        },
        tel:{
          name: "联系人电话",
          value: "1515257685",
        }
         /*  bool:{
            name: "启用/禁用",
            value: "启用",
          }, */
        },
        {
          warnning_id: {
            name: "告警ID",
            value: "14532662656",
          },
          warnning_name: {
            name: "告警事件",
            value: "低限告警",
          },
          address: {
            name: "设备地址",
            value: "湖南省长沙市长沙县万家丽街道",
          },
          handle: {
            name: "告警状态",
            value: "告警解除",
          },
          start_time: {
            name: "发生时间",
            value: "2020-11-31 10:02:03",
          },
          endtime: {
            name: "停止时间",
            value: "",
          },
          handletime: {
            name: "处理时间",
            value: "",
          },
          agreement_name:{
            name: "协议名称",
            value: "http",
          },
          
          open_ip:{
            name: "IP",
            value: "218.104.146.37",
          },
          open_port:{
            name: "开放端口",
            value: "12222",
          },
          online_staus:{
            name: "在线状态",
            value: "开",
          },
        /*   serve:{
            name: "服务",
            value: "DNS开放",
          }, */
          start_type:{
            name: "启动类型",
            value: "手动",
          },
          company_name:{
          name: "厂商名称",
          value: "华自科技",
        },
        contacts:{
          name: "联系人名称",
          value: "刘军",
        },
        tel:{
          name: "联系人电话",
          value: "1515257685",
        }
        /*   bool:{
            name: "启用/禁用",
            value: "启用",
          }, */
        },
        {
          warnning_id: {
            name: "报警ID",
            value: "15152153144",
          },
          warnning_name: {
            name: "报警事件",
            value: "超高限告警",
          },
          address: {
            name: "设备地址",
            value: "湖南省长沙市芙蓉区火车站",
          },
          handle: {
            name: "是否处理",
            value: "告警启动",
          },
          start_time: {
            name: "发生时间",
            value: "2020-11-30 12:02:03",
          },
          endtime: {
            name: "停止时间",
            value: "2020-11-30 13:02:03",
          },
          handletime: {
            name: "处理时间",
            value: "2020-11-30 13:02:03",
          },
          agreement_name:{
            name: "协议名称",
            value: "http",
          },
          
          open_ip:{
            name: "IP",
            value: "218.104.146.37",
          },
          open_port:{
            name: "开放端口",
            value: "12222",
          },
          online_staus:{
            name: "在线状态",
            value: "开",
          },
        /*   serve:{
            name: "服务",
            value: "DNS开放",
          }, */
          start_type:{
            name: "启动类型",
            value: "手动",
          },
          company_name:{
          name: "厂商名称",
          value: "华自科技",
        },
        contacts:{
          name: "联系人名称",
          value: "刘军",
        },
        tel:{
          name: "联系人电话",
          value: "1515257685",
        }
         /*  bool:{
            name: "启用/禁用",
            value: "启用",
          }, */
        }
      ],
      multipleSelection: [],/* 表格当前数据 */
      newdetails: {} /* 详情 */,
    };
  },
  watch: {
    "form.province": {
      handler(newdata) {
        console.log(newdata);
        this.boolcity = false;
      },
    },
    "form.city": {
      handler(newdata) {
        console.log(newdata);
        this.boolarea = false;
      }
    },
  },
  created() {
    this.$store.commit('change_memuindex','3')
    sessionStorage.setItem("change_select",'预警处理')
    this.$store.commit('change_select','预警处理')
    // this.$axios({
    //   method: "get",
    //   url: 'http://113.247.223.6:23834/fraud/createToken?uuid=19fb5f79-6dc6-43f7-994c-bcaf9e5adf2d',
    // /*   data:{
    //     AppID:"XXDL_WLWPT",
    //     Password:"XXDL_WLWPT2557013",
    //     Pagename:"front_interface",
    //     return:"true"
    //   } */
    // }).then(function (res) {
     
    //   console.log(res);
    // });
    
  },
  methods: {
    exportToExcel(){
      /* let dataList=[{userId:1,name:'小白',age:'18',status:"上学"},{userId:2,name:'小黑',age:'22',status:"待业"},{userId:3,name:'小红',age:'28',status:"就业"}]; */

      this.commonjs.exportToExcel(this.multipleSelection)
    },
    selectEnable(row) {
      if (row.handle.value == "已处理") {
        return true;
      }
    },
    details(shuju) {
      this.$router.push({
          name:'worningdetails',
          query: {
            id: shuju.warnning_id.value
          }
      })
      /* this.newdetails = shuju;
      let time1=setTimeout(() => {
          if(this.$refs.datadetails.innerHTML){
            clearTimeout(time1)
            this.$alert(`<div style="height:50vh;overflow-y: scroll;">${this.$refs.datadetails.innerHTML}</div>`, "详情", {
              dangerouslyUseHTMLString: true,
              center: true
            });
          }else{
            time1()
          }
      },100); */
    },
    stop(data,index) {
      let that = this
      this.$prompt("请输入停止原因", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          that.tableData[index].handle.value='已处理'
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          console.log(data);
        })
        .catch(() => {});
    },
    stare(data,index) {
     let that = this
      this.$confirm("您确认要开启该设备吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          that.tableData[index].handle.value='已处理'
          this.$message({
            type: "success",
            message: "操作成功!",
          });
           console.log(data)
        })
        .catch(() => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  computed: {
    newselect() {
      return this.$store.state.new_select;
    },
  },
};
</script>
<style lang="less" scoped>
.green {
  color: #00807c;
  
}
/deep/ .table_new {
  color: #b3b3b3 !important;
}
/deep/ .table_index5 {
  color: #ec5755 !important;
}
/deep/ .table_index_blue5 {
  color: #086eec !important;
}
.new {
  top: 0 !important;
}
.title {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  p {
    // color: #b3b3b3;
    padding-right: 5px;
    font-size: 14px;
  }
}
/deep/ .el-table{
      td,th{
        padding: 0!important;
        line-height: 30px;
        text-align: center;
        font-size: 14px !important;
      }
    }
.block {
  padding-top: 9px;
  /deep/ .active {
    background-color: #00807c !important;
    color: #ffffff !important;
  }
  /deep/ .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
.search {
  background-color: #f2f2f2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 16px;
  zoom: 0.9;
  /deep/ .el-input {
    width: 240px;
    margin-left: 22px;
  }
  .text {
    padding-left: 14px;
    font-size: 12px;
  }
  .search_button {
    background-color: #00807c;
    color: #ffffff;
    width: 64px;
    height: 27px;
    line-height: 28px;
    border-radius: 4px;
    margin-left: 16px;
    font-size: 13px;
  }
}
.screen {
  background-color: #f2f2f2;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  zoom: 0.9;
  padding: 16px 14px 14px;
  .el-select {
    width: 120px;
  }
  .box {
    display: flex;
    justify-content: flex-start;
    padding-right: 22px;
    /deep/ .el-form-item {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      /* font-size: 10px; */
      margin-right: 20px;
    }
    .text {
      padding-right: 6px;
      min-width: 4em;
      line-height: 28px;
      font-size: 13px;
    }
  }
}
.changemessage {
  padding: 15px 0 8px;
  display: flex;
  justify-content: space-between;
  .operation{
    display: flex;
    justify-content: flex-start;
    p{
      background-color: #00807C;
      color: #ffffff;
      margin-right: 8px;
      border: none;
    }
    p:nth-child(2){
      background-color: #EC5755;
    }
  }
  p {
    width: 64px;
    height: 24px;
    font-size: 10px;
    border: 1px solid #b3b3b3;
    line-height: 23px;
    border-radius: 4px;
    color: #4d4d4d;
    cursor:default
  }
}
/deep/ .is-leaf {
  background: #f2f2f2 !important;
  color:#4D4D4D !important;
}
</style>
