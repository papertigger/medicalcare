<template>
  <div class="analysis page">
    <div class="title">
      <p>当前位置:</p>
      <span>{{ newselect }}</span>
    </div>
    <div class="nav">
      <div class="echar">
        <div class="nums">
          <div class="top">
            <img src="../assets/warning.png" />
            <div>
              <p>全部告警数量(次)</p>
              <h6>{{warnning_allnums}}</h6>
              <!--   <span>+2.7%</span> -->
            </div>
          </div>
          <div class="select_time">
            <div class="option">
              <p :class="{ action: action_line == 0 }" @click="click_line(0)">
                本周
              </p>
              <p :class="{ action: action_line == 1 }" @click="click_line(1)">
                本月
              </p>
              <p :class="{ action: action_line == 2 }" @click="click_line(2)">
                本季度
              </p>
            </div>
            <el-date-picker
              v-model="echar_date"
              type="date"
              size="mini"
              class="select_type"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div id="nums_charts" class="chart"></div>
        </div>
        <div class="lv">
          <div class="head">
            <h6>告警级别比例图</h6>
            <div>
              <p :class="{ action: action_pie == 1 }" @click="click_pie(1)">
                年度
              </p>
              <p :class="{ action: action_pie == 0 }" @click="click_pie(0)">
                月度
              </p>
            </div>
          </div>
          <el-select
            class="select_type"
            size="mini"
            v-model="lvvalue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div id="lv_charts" class="chart"></div>
        </div>
        <div class="tops">
          <div class="head">
            <h6>设备故障TOP5</h6>
          </div>
          <div id="tops_charts" class="chart"></div>
        </div>
      </div>
      <header>
        <p>当月告警次数排名</p>
        <div>
          <el-date-picker
            v-model="form.table_date"
            type="date"
            size="mini"
            class="select_date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <div class="box">
            <p class="text">省市区:</p>
            <el-select
              :popper-append-to-body="false"
              v-model="form.province"
              filterable
              placeholder="请选择省"
              size="mini"
              class="select_type"
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
              class="select_type"
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
              class="select_type"
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
      </header>
      <div class="table">
        <table>
          <thead>
            <td>设备类型</td>
            <td>排名</td>
            <td>月份</td>
            <td>省市区</td>
            <td>告警级别(数量)</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table_1" :key="index">
              <td>{{ item.name }}</td>
              <td class="yellow">{{ index + 1 }}</td>
              <td>{{ item.month }}</td>
              <td>{{ item.address }}</td>
              <td>
                <div v-for="(val, i) in item.number" :key="i">
                  <p>{{ val.type }}</p>
                  <p>{{ val.value }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <td>设备类型</td>
            <td>排名</td>
            <td>月份</td>
            <td>省市区</td>
            <td>告警级别(数量)</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table_2" :key="index">
              <td>{{ item.name }}</td>
              <td :class="{ yellow: index == 0 }">{{ index + 3 }}</td>
              <td>{{ item.month }}</td>
              <td>{{ item.address }}</td>
              <td class="num">
                <div v-for="(val, i) in item.number" :key="i">
                  <p>{{ val.type }}</p>
                  <p>{{ val.value }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <img src="../assets/analysis.png" alt=""> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    newselect() {
      return this.$store.state.new_select;
    },
  },
  data() {
    return {
      monidata2:{
        all_nums:'520',
        data:[
          {
            name:"超高限告警",
            value:"384"
          },
          {
            name:"高限告警",
            value:"28"
          },
          {
            name:"超低限告警",
            value:"174"
          },
          {
            name:"低限告警",
            value:"120"
          }
        ]
      },
      monidata1:{
        all_nums:'168',
        data:[
          {
            name:"1",
            value:"0"
          },
          {
            name:"2",
            value:"10"
          },
          {
            name:"3",
            value:"15"
          },
          {
            name:"4",
            value:"22"
          },
          {
            name:"5",
            value:"16"
          },
          {
            name:"6",
            value:"14"
          },
          {
            name:"7",
            value:"16"
          },
          {
            name:"8",
            value:"10"
          }
        ]
      },
      monidata3:{
        data:[
          {
            name:"电表",
            value:"10"
          },
          {
            name:"串口服务器",
            value:"10"
          },
          {
            name:"保护装置",
            value:"15"
          },
          {
            name:"串口通用设备",
            value:"22"
          },
          {
            name:"充电桩",
            value:"16"
          }
        ]
      },
      warning_nums: {
        start_time: "",
        endtime: "",
      },
      action_line: 0,
      action_pie: 0,
      boolcity: true /* 市选择是否禁用 */,
      boolarea: true /* 区选择是否禁用 */,
      form: {
        province: "",
        city: "",
        area: "",
        table_date: "" /* 筛选选择时间 */,
      },
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
      options: [
        {
          value: "选项1",
          label: "电表",
        },
        {
          value: "选项2",
          label: "充电桩",
        },
        {
          value: "选项3",
          label: "串口服务器",
        },
        {
          value: "选项4",
          label: "保护装置",
        },
        {
          value: "选项5",
          label: "摄像头",
        },
      ],
      lvvalue: "",
      echar_date: "" /* 图表选择时间 */,
      table_1: [
        {
          name: "电表",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "超高限告警",
              value: "25",
            },
            {
              type: "高限告警",
              value: "21",
            },
            {
              type: "低限告警",
              value: "3",
            },
            {
              type: "超低限告警",
              value: "25",
            },
          ],
        },
        {
          name: "充电桩",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "调试模式",
              value: "45",
            },
            {
              type: "交流测电压过高",
              value: "23",
            },
            {
              type: "交流测电压过低",
              value: "18",
            },
            {
              type: "充电电流过高",
              value: "13",
            },
          ],
        },
      ],
      table_2: [
        {
          name: "串口服务器",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "串口通信中断",
              value: "25",
            },
            {
              type: "串口通信恢复",
              value: "21",
            },
          ],
        },
        {
          name: "保护装置",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "检修状态",
              value: "3",
            },
            {
              type: "开关合闸",
              value: "25",
            },
            {
              type: "开关分闸",
              value: "45",
            },
          ],
        },
        {
          name: "摄像头",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "通信无告警信息",
              value: "23",
            },
          ],
        },
        {
          name: "通用串口设备",
          month: "2020-11",
          address: "湖南省长沙市",
          number: [
            {
              type: "通信无告警信息",
              value: "18",
            },
          ],
        },
        {
          name: "通用网络设备",
          month: "2020-11",
          number: [
            {
              type: "通信无告警信息",
              value: "13",
            },
          ],
        },
      ],
      warnning_allnums:'',
      option_lv_charts: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: "20%",
          top: "20%",
          bottom: 20,
          data: ["超高限告警", "高限告警", "超低限告警", "低限告警"],
          itemWidth: 11,
          itemHeight: 5,
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "23%",
            top: "35%",
            style: {
              text: "全部报警" + "\n" + "137",
              textAlign: "center",
              width: 30,
              height: 30,
              fontSize: 14,
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["30%", "40%"],
            startAngle: 90,
            label: {
              show: true,
              position: "center",
              normal: {
                show: false,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 382,
                name: "超高限告警",
                itemStyle: {
                  normal: {
                    color: "#E93854",
                  },
                },
              },
              {
                value: 28,
                name: "高限告警",
                itemStyle: {
                  normal: {
                    color: "#EC6D2D",
                  },
                },
              },
              {
                value: 174,
                name: "超低限告警",
                itemStyle: {
                  normal: {
                    color: "#00796A",
                  },
                },
              },
              {
                value: 120,
                name: "低限告警",
                itemStyle: {
                  normal: {
                    color: "#2C78CB",
                  },
                },
              },
            ],
          },
        ],
      },
      option_tops_charts: {
        color: ["#00796A"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0%",
          right: "16%",
          top: 0,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: ["#BFBFBF"],
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666666",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#BFBFBF",
            },
          },
        },
        yAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: ["充电桩", "串口通用设备", "保护装置", "串口服务器", "电表"],
        },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth:"50%",
            data: [8, 13, 18, 23, 28],
          },
        ],
      },
      option_nums_charts: {
        grid: {
          left: "0%",
          right: "16%",
          top: 20,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666666",
            },
          },
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        yAxis: {
          type: "value",
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: ["#BFBFBF"],
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666666",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#BFBFBF",
            },
          },
        },
        series: [
          {
            data: [0, 18, 12, 15, 20, 28, 25, 18, 12, 15, 20, 12],
            type: "line",
            smooth: true,
            symbol: "none",
            symbolSize: 1,
            itemStyle: {
              normal: {
                color: "red", //改变折线点的颜色
                lineStyle: {
                  color: "#00796A", //改变折线颜色
                  width: 1,
                },
              },
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: "RGBA(242, 246, 245, 1)",
                    },
                    {
                      offset: 0,
                      color: "RGBA(204, 226, 223, 1)",
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.$store.commit("change_memuindex", "4");
    sessionStorage.setItem("change_select", "数据分析");
    this.$store.commit("change_select", "数据分析");
    this.warnningNums()
    this.warningLevel()
    this.warningTops()
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
  mounted() {
    let nums_charts = this.$echarts.init(
      document.getElementById("nums_charts")
    );
    nums_charts.setOption(this.option_nums_charts);
    let lv_charts = this.$echarts.init(document.getElementById("lv_charts"));
    lv_charts.setOption(this.option_lv_charts);
    let tops_charts = this.$echarts.init(
      document.getElementById("tops_charts")
    );
    tops_charts.setOption(this.option_tops_charts);
  },
  methods: {
    warnningNums(){
      this.warnning_allnums=this.monidata1.all_nums
      let dataarr=[],xios=[]
      for(let i=0;i<this.monidata1.data.length;i++){
        dataarr.push(this.monidata1.data[i].value)
        xios.push(this.monidata1.data[i].name)
      }
      this.option_nums_charts.series[0].data=dataarr
      this.option_nums_charts.xAxis.data=xios
    },
    warningLevel(){
      let dataarr=[],legend=[]
      for(let i=0;i<this.monidata2.data.length;i++){
        let obj={
          value:this.monidata2.data[i].value,
          name: this.monidata2.data[i].name,
        }
        dataarr.push(obj)
        legend.push(this.monidata2.data[i].name)

      }
      console.log(dataarr)
      this.option_lv_charts.graphic[0].style.text="全部报警" + "\n" + this.monidata2.all_nums
      this.option_lv_charts.series[0].data=dataarr
      this.option_lv_charts.legend.data= legend
    },
    warningTops(){
      let dataarr=[],yAxis=[]
      for(let i=0;i<this.monidata3.data.length;i++){
        dataarr.push(this.monidata3.data[i].value)
        yAxis.push(this.monidata3.data[i].name)
      }
      this.option_tops_charts.series[0].data=dataarr
      this.option_tops_charts.yAxis.data=yAxis
    },
    weeknums() {
      let date = new Date()
      var weekday = date.getDay() || 7;
      date.setDate(date.getDate() - weekday + 1);
      this.warning_nums.start_time = this.timeFormat(date) + " 00:00:00";
    },
    monthnums() {
      let date = new Date()
      date.setDate(1);
      this.warning_nums.start_time = this.timeFormat(date) + " 00:00:00";
    },
    quarternums() {
      let date = new Date()
      var month = date.getMonth();
      if (month < 3) {
        date.setMonth(0);
      } else if (2 < month && month < 6) {
        date.setMonth(3);
      } else if (5 < month && month < 9) {
        date.setMonth(6);
      } else if (8 < month && month < 11) {
        date.setMonth(9);
      }
      date.setDate(1);
      this.warning_nums.start_time = this.timeFormat(date) + " 00:00:00";
    },
    timeFormat(date) {
      if (!date || typeof date === "string") {
        this.error("参数异常，请检查...");
      }
      var y = date.getFullYear(); //年
      var m = date.getMonth() + 1; //月
      var d = date.getDate(); //日
      return y + "-" + m + "-" + d;
    },
    click_line(inde) {
      this.action_line = inde;
    },
    click_pie(inde) {
      this.action_pie = inde;
    },
  },
};
</script>
<style lang="less" scoped>
.analysis {
  padding: 15px 22px;
  font-family: "MicrosoftYaHei";
  .title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    p {
      color: #b3b3b3;
      padding-right: 5px;
    }
  }
  .nav {
    .echar {
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 397px;
        background-color: #fafafa;
        padding: 0 25px;
        position: relative;
        .head {
          height: 71px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          align-items: center;
          border-bottom: 1px solid #d9d9d9;
          color: #4d4d4d;
          > div {
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            .action {
              background-color: #00796a;
              color: #ffffff;
            }
            p {
              width: 37px;
              height: 21px;
              line-height: 21px;
              background-color: #f2f2f2;
            }
          }
        }
        .chart {
          position: absolute;
          top: 167px;
          width: 100%;
          height: calc(100% - 167px);
        }
      }
      .nums {
        width: 455px;
        padding: 0 23px 0 41px;
        .top {
          width: 200px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 0 auto;
          padding: 48px 0 36px;
          img {
            width: 43px;
            height: 43px;
          }
          > div {
            text-align: left;
            p {
              color: #52708f;
              font-size: 11px;
            }
            h6 {
              font-size: 27px;
            }
            span {
              font-size: 11px;
            }
          }
        }
        .select_time {
          display: flex;
          justify-content: space-between;
          .option {
            font-size: 11px;
            display: flex;
            justify-content: flex-start;
            p:not(first-child) {
              padding-left: 14px;
            }
            .action {
              color: #00796a;
            }
          }
          .select_type {
            width: 128px;
          }
        }
      }
      .lv {
        width: 384px;
        .select_type {
          width: 113px;
          float: right;
          margin-top: 29px;
        }
      }
      .tops {
        width: 389px;
      }
    }
    header {
      display: flex;
      justify-content: space-between;
      background-color: #fafafa;
      width: 100%;
      padding: 31px 45px 21px 29px;
      > p {
        font-weight: 600;
      }
      > div {
        display: flex;
        justify-content: flex-end;
        .select_date {
          width: 130px;
          margin-right: 20px;
        }
        .select_type {
          width: 113px;
        }
      }
      .box {
        display: flex;
        justify-content: flex-start;
        .text {
          padding-right: 6px;
          min-width: 4em;
          line-height: 31px;
          font-size: 11px;
        }
      }
    }
    .table {
      background-color: #fafafa;
      width: 100%;
      padding: 0px 45px 24px;
      display: flex;
      justify-content: flex-start;
      font-size: 10px;

      table {
        flex: 1;
        background-color: #ffffff;
        height: 255px;
        border-collapse: collapse;
        .yellow {
          color: #ffa619;
        }
        td {
          border: 1px solid #cccccc;
          color: #404040;
          div {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            p {
              width: 40%;
              height: 30px;
              line-height: 30px;
              font-size: 10px;
              text-align: center;
              border-top: 1px solid #cccccc;
            }
            p:nth-child(1) {
              color: #999999;
              width: 60%;
              border-right: 1px solid #cccccc;
            }
          }
          div:first-child {
            p {
              border-top: none;
            }
          }
        }
        thead {
          td {
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            font-size: 10px;
            background-color: #00796a;
          }
        }
      }
    }
  }
}
</style>
