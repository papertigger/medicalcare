<template>
  <div class="home page">
    <div class="title">
      <p>设备总数: {{alldata.assets_nums}}个</p>
      <p>在线数:   {{alldata.online_nums}}个</p>
      <p>离线数:   {{alldata.offline_nums}}个</p>
    </div>
    <div class="search">
      <p class="text">关键字</p>
      <el-input placeholder="请输入" v-model="form.input" clearable size="mini"> </el-input>
      <p class="search_button" @click="getdata()">搜索</p>
    </div>
    <div class="screen">
      <div class="box">
        <p class="text">设备类型:</p>
        <el-select
          v-model="form.type"
          :popper-append-to-body="false"
          clearable
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options1"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <p class="text">运行状态:</p>
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
        <p class="text">上/下线时间:</p>
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
      <!-- <div class="box">
        <p class="text">关键字</p>
        <el-input
          placeholder="请输入"
          v-model="input"
          clearable>
        </el-input>
      </div>
      <div class="box">
        <p class="search">搜索</p>
      </div> -->
    </div>
    <div class="changemessage">
      <p>导出</p>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      class="table"
      tooltip-effect="dark"
      max-height="350"
      style="width: 100%;font-size: 13px"
      @selection-change="handleSelectionChange"
      :cell-class-name="setcolor"
    >
      <el-table-column type="selection" > </el-table-column>
      <el-table-column
        v-for="info in arr"
        :key="info.class"
        :property="info.class"
        :label="info.name"
      >
        <template slot-scope="scope">
          {{ scope.row[scope.column.property].value}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope"> 
          <el-button type="text" size="small" class="green"  @click="details(scope.row)">查看详情</el-button>
          <!--  <el-button  type="text" size="small" class="green">修改</el-button>
          <el-button type="text" class="table_index5" size="small">删除</el-button> -->
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
        :total="alldata.assets_nums"
      >
      </el-pagination>
    </div>
    <div class="detail" ref="datadetails" v-show="false">
      <div v-for="(item, index, i) in newdetails" :key="i" style="display:flex;justify-content: flex-start;padding-top: 10px;">
        <p style="width:70px;text-align: left;">{{ item.name }}</p>
        <p>{{ item.value?item.value:'--'}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "about",
  
  data() {
    return {
      boolcity: true /* 市选择是否禁用 */,
      boolarea: true /* 区选择是否禁用 */,
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
          label: "开",
        },
        {
          value: "选项2",
          label: "合",
        },
      ],
      currentPage: 1,
      form: {
        input: "",
        time: "",
        staus: "",
        type: "",
        province: "",
        city: "",
        area: "",
        page:"assets",
        start:"0",/* 数据获取开始下标 */
        limit:"10"/* 一次性获取多少条 */
      },
      alldata:{
        assets_nums:3,/* 设备总数 */
        online_nums:1,/* 在线数量 */
        offline_nums:2,/* 离线数量 */
      },
      arr: [
        {
          name: "资产ID",
          class: "id",
        },
        {
          name: "资产类型",
          class: "type",
        },
        {
          name: "资产名称",
          class: "name",
        },
        {
          name: "IP",
          class: "open_ip",
        },
        {
          name: "设备位置",
          class: "address",
        },
        {
          name: "运行状态",
          class: "staus",
        },
        {
          name: "上线时间",
          class: "start",
        },
        {
          name: "运行时长",
          class: "end",
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
          id: {
            name: "资产ID",
            value: "14152153142",
          },
          type: {
            name: "资产类型",
            value: "电表",
          },
          name: {
            name: "资产名称",
            value: "d801电表",
          },
          address: {
            name: "设备位置",
            value: "湖南省长沙市长沙县万家丽街道",
          },
          staus: {
            name: "运行状态",
            value: "启动",
          },
          start: {
            name: "上线时间",
            value: "2020-07-12 12:02:03",
          },
          end: {
            name: "运行时长",
            value: "",
          },
          endtime: {
            name: "离线时间",
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
            value: "在线",
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
          id: {
            name: "资产ID",
            value: "13152153122",
          },
          type: {
            name: "资产类型",
            value: "电表",
          },
          name: {
            name: "资产名称",
            value: "d8001电表",
          },
          address: {
            name: "设备位置",
            value: "湖南省长沙市岳麓区桐梓坡路",
          },
          staus: {
            name: "运行状态",
            value: "启动",
          },
          start: {
            name: "上线时间",
            value: "2020-05-12 12:02:03",
          },
          end: {
            name: "运行时长",
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
            value: "在线",
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
          id: {
            name: "资产ID",
            value: "14152153111",
          },
          type: {
            name: "资产类型",
            value: "电表",
          },
          name: {
            name: "资产名称",
            value: "c901充电桩",
          },
          address: {
            name: "设备位置",
            value: "湖南省长沙市长沙县万家丽街道",
          },
          staus: {
            name: "运行状态",
            value: "启动",
          },
          start: {
            name: "上线时间",
            value: "2020-01-12 12:02:03",
          },
          end: {
            name: "运行时长",
            value: "",
          },
          agreement_name:{
            name: "协议名称",
            value: "http",
          },
          open_port:{
            name: "开放端口",
            value: "12222",
          },
          open_ip:{
            name: "IP",
            value: "218.104.146.37",
          },
          
          online_staus:{
            name: "在线状态",
            value: "离线",
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
          /* bool:{
            name: "启用/禁用",
            value: "启用",
          }, */
        }
      ],
      multipleSelection: [],
      newdetails: {} /* 详情 */
    };
  },
  created () {
    this.$store.commit('change_memuindex','2')
    sessionStorage.setItem("change_select",'资产管理')
    this.$store.commit('change_select','资产管理')
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
      },
    },
  },
  methods: {
    getdata(){
     /*  let time=new Date(this.form.time[0])
      console.log(this.form.time[0])
      console.log(time.getFullYear(),time.getMonth()+1,time.getDate(),time.getHours(),time.getMinutes(),time.getSeconds()) */
    },
    setcolor(row) {
      if (row.row.staus.value == "离线") {
        return "table_new table_index" + row.columnIndex;
      } else if (row.row.staus.value == "在线" && row.columnIndex == "5") {
        return "table_index_blue5";
      }
    },
    details(shuju) {/* 查看详情 */
    console.log(shuju)
      this.$router.push({
          name:'assetsdetails',
          query: {
            id: shuju.id.value
          }
      })
      /* this.newdetails = shuju;
      let time1=setTimeout(() => {
          if(this.$refs.datadetails.innerHTML){
            clearTimeout(time1)
            this.$alert(`<div class="detail" style="height:50vh;overflow-y: scroll;">${this.$refs.datadetails.innerHTML}</div>`, "详情", {
              dangerouslyUseHTMLString: true,
              center: true
            });
          }else{
            time1()
          }
      },100); */
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
.table {
  /deep/ .cell {
    text-align: center;
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
.title {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  p {
   /*  color: #b3b3b3; */
    padding-right: 5px;
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
    width:240px;
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
  justify-content: space-between;
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
  justify-content: flex-start;
  p {
     width: 64px;
    height: 24px;
    font-size: 10px;
    border: 1px solid #b3b3b3;
    line-height: 24px;
    border-radius: 4px;
    color: #4d4d4d;
  }
}
/deep/ .is-leaf {
  background: #f2f2f2 !important;
  color: #4D4D4D !important;
}
</style>
