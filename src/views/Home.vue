<template>
  <div class="home page"> 
      <baidu-map
          v-if="colorBool"
          class="bm-view"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          ak="QS2qa6SFpE9KMVj70f7u1tgRHGlwCXLa"
          style="display: flex; flex-direction: column"
          @dragend="mapmove"
          @zoomend='zoomend'
          :max-zoom='15'
          :min-zoom='5'
          key="one"
        >
          <bm-marker-clusterer :averageCenter="true">
            <bm-marker
            :icon="{url:require('../assets/fd.png'), size: {width:20, height:20}}"
              v-for="(marker, index) of windowarr"
              :key="marker.code"
              :position="{ lng: marker.lng, lat: marker.lat }"
              @click="lookDetail(index)"
              :offset="{ width: -35, height: 30 }"
            >
            </bm-marker>
            <bm-info-window
              class="map_window"
              :position="{
                lng: windowmessage.markers.lng,
                lat: windowmessage.markers.lat,
              }"
              :show="windowmessage.show"
            >
              <div class="custom_window">
                <h5>湖南省长沙市</h5>
                <div class="box">
                  <p>
                    东经{{ windowmessage.markers.lng }} ,北纬{{
                      windowmessage.markers.lat
                    }}
                  </p>
                <!--   <p>详情</p> -->
                </div>
                <div class="box">
                  <p>设备名称: {{ windowmessage.markers.name }}</p>
                </div>
                <div class="box">
                  <p>设备状态: {{ windowmessage.markers.staus }}</p>
                </div>
                <div class="box">
                  <p>异常原因: {{ windowmessage.markers.reason }}</p>
                </div>
                <div class="operation">
                  <p @click="equipmentstart">启动</p>
                  <p @click="equipmentend">中断</p>
                </div>
              </div>
            </bm-info-window>
          </bm-marker-clusterer>
      </baidu-map>
    <baidu-map
        v-else
        class="bm-view"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        ak="QS2qa6SFpE9KMVj70f7u1tgRHGlwCXLa"
        style="display: flex; flex-direction: column"
        @dragend="mapmove"
        @zoomend='zoomend'
        :max-zoom='15'
        :min-zoom='5'
        @ready="ready"
        key="two"
      >
        <bm-marker-clusterer :averageCenter="true">
          <bm-marker
          :icon="{url:require('../assets/fd.png'), size: {width:20, height:20}}"
            v-for="(marker, index) of windowarr"
            :key="marker.code"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="lookDetail(index)"
            :offset="{ width: -35, height: 30 }"
          >
          </bm-marker>
          <bm-info-window
            class="map_window"
            :position="{
              lng: windowmessage.markers.lng,
              lat: windowmessage.markers.lat,
            }"
            :show="windowmessage.show"
          >
            <div class="custom_window">
              <h5>湖南省长沙市</h5>
              <div class="box">
                <p>
                  东经{{ windowmessage.markers.lng }} ,北纬{{
                    windowmessage.markers.lat
                  }}
                </p>
              </div>
              <div class="box">
                <p>设备名称: {{ windowmessage.markers.name }}</p>
              </div>
              <div class="box">
                <p>设备状态: {{ windowmessage.markers.staus }}</p>
              </div>
              <div class="box">
                <p>异常原因: {{ windowmessage.markers.reason }}</p>
              </div>
              <div class="operation">
                <p @click="equipmentstart">启动</p>
                <p @click="equipmentend">中断</p>
              </div>
            </div>
          </bm-info-window>
        </bm-marker-clusterer>
    </baidu-map>
    <div :class="['echarts_box',{'midnight':!colorBool}]" ref="leftbox">
      <div class="left_ech" id="left_ech">
        <!--  <h5>设备在线率</h5>
           <img src="../assets/sbzx.png" alt=""> -->
      </div>
      <div id="left_pie"></div>
    </div>
    <div :class="['control_top',{'midnight':!colorBool}]">
        <div class="left">
          <el-select v-model="form.type" class="type" filterable placeholder="请选择" size='mini'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
         <el-input class="gjz" placeholder="请输入" v-model="form.value" size='mini'></el-input>
         <p class="el-icon-search icon" @click="searchEare"></p>
         <!-- <ul>
           <li v-for="(item,index) in searchArr" :key="index">
             {{item.title}}
           </li>
         </ul> -->
        </div>
        <div class="center">
          <img src="../assets/ggl.png">
        </div>
        <div class="top_right">
          <div class="backhome" @click="changebool" ref="backbutton">回到导航</div>
          <img @click="moveleft()" src="../assets/fd.png" v-if="zoombool">
          <div class="sx" @click="narrow" v-else>
            <img src="../assets/sx.png" >
          </div>
        </div>
      </div>
    <div :class="['centernav',{'midnight':!colorBool}]">
      <div :class="['icons',{'dingwei':!zoombool}]">
        <div v-if="!colorBool" @click="changeTheme"><img src="../assets/sun.png" alt=""></div>
        <div v-else @click="changeTheme"><img src="../assets/month.png" alt=""></div>
        <p class="el-icon-plus" @click="zoom_add"></p>
        <p class="el-icon-minus" @click="zoom_reduce"></p>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        class="table"
        tooltip-effect="dark"
        max-height="200"
        style="width: 100%;font-size: 13px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection"> </el-table-column> -->
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
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="green"
              @click="details(scope.row)"
              >查看详情</el-button
            >
            <!--  :disabled="selectEnable(scope.row)" -->
            <el-button
              type="text"
              size="small"
              :class="{ green: !selectEnable(scope.row) }"
              @click="stare(scope.row, scope.$index)"
              >开启</el-button
            >
            <el-button
              type="text"
              :class="{ table_index5: !selectEnable(scope.row) }"
              size="small"
              @click="stop(scope.row, scope.$index)"
              >停止</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div :class="['echarts_box','right_echart',{'midnight':!colorBool}]">
      <div id="right_line"></div>
      <div id="right_pie"></div>
    </div>
    <div class="detail" ref="datadetails" v-show="false">
      <div
        v-for="(item, index, i) in newdetails"
        :key="i"
        style="display: flex; justify-content: flex-start; padding-top: 10px"
      >
        <p style="width: 70px; text-align: left">{{ item.name }}</p>
        <p>{{ item.value ? item.value : "--" }}</p>
      </div>
    </div>
    <div id="allmap" v-show="false"></div>
  </div>
</template>

<script>

import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
export default {
  name: "Home",
  components: {
    BaiduMap,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
  },
  data() {
    return {
      searchArr:[{title:111},{title:111},{title:111},{title:111}],/* 搜索框数据 */
      colorBool:false,/* 是否是黑夜模式 */
      TextColor:{/* 文字颜色 */
        title:'#FFFFFF',
        text:'#D3E4DA',
      },
      inde:0,/* 动画计数 */
      zoom:13,/* 开始缩放比例 */
      center:{/* 开始中心点 */
        lng: "112.931",
        lat: "28.235",
      },
      zoombool:true,/* 地图是否全屏 */
      options: [{
          value: '选项1',
          label: '设备名'
        }, {
          value: '选项2',
          label: '地址'
        }],
      form:{/* 地图搜索参数 */
        type:"设备名",
        value:""
      },
      map_form:{
        start_lng:"",    /* 左上点经度*/
        start_lat:"",    /* 左上点纬度*/
        end_lng:"",       /* 右下点经度*/
        end_lat:""   /* 右下点纬度*/
      },
      windowarr: [
        {
          address: "湖南省长沙市岳麓区",
          lng: "112.931",
          lat: "28.235",
          name: "026电表",
          staus: "离线",
          reason: "温度超过40°C",
        },
        {
          address: "湖南省长沙市开福区",
          lng: "112.976",
          lat: "28.243",
          name: "108电表",
          staus: "离线",
          reason: "温度超过80°C",
        },
      ],/* 地图上面点 */
      windowmessage: {/* 地图信息窗口控制 */
        message: {},
        show: false,
        markers: {},
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
       /*  {
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
       /*  {
          name: "启动类型",
          class: "start_type",
        } */
      ],/* 表格表头 */
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
      ],/* 表格数据 */
      multipleSelection: [],/* 表格勾选数据 */
      newdetails: {} /* 详情 */,
      homecharts:{
        all_nums:{
          all:305,/* 设备总数 */
          online:255/* 设备在线数 */
        },/* 告警数量 */
        utilization_rate:{
          utilization_rate:'98.2%',/* 设备利用率 */
          data: [
            {
              name:"电表",
              value:"382"
            },
            {
              name:"保护装置",
              value:"28"
            },
            {
              name:"串口服务器",
              value:"174"
            },
            {
              name:"充电桩",
              value:"120"
            },
            {
              name:"串口通用设备",
              value:"98"
            },
            {
              name:"摄像头",
              value:"25"
            }
          ],
        },/* 设备利用率*/
        warning_nums:{
          time:[
            "08:00-09:00",
            "11:00-12:00",
            "16:00-17:00",
            "21:00-22:00",
            "23:00-24:00"
          ],
          data:[
            {
              name: "2020-11.30",
              data: [10, 20, 5, 9, 40, 30, 20],
            },
            {
              data: [0, 40, 21, 34, 40, 20, 5],
              name: "2020-11.29",
            }
          ]
        },/* 日告警数量 */
        situation:{
          type: ["电表", "保护装置", "串口服务器", "充电桩"],
          data:[
            {
              name: "正常数",
              data: [320, 332, 301, 334],
            },
            {
              name: "告警数",
              data: [10, 20, 12, 16],
            }
          ]
        }/* 日告警情况 */
      },/* 初始化表格数据模拟数据，数据接通删除 */
      option_rightline: {
        title: {
          text: "日告警数量",
          top:10,
          left:5,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#ffffff'
          },
        },
        grid: {
          left: "12%",
          right: "13%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",

          axisPointer: {
            type: "none",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel : {
            textStyle: {
               color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: ["#F4F5F5"],
              width: 0.5,
              type: "solid",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel : {
            textStyle: {
               color: '#ffffff'
            }
          }
        },
        legend: {
          data: [],
          bottom: 0,
          itemWidth: 11,
          itemHeight: 5,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            name: "",
            data: [],
            type: "line",
            areaStyle: {
              normal: {
                color: "#8cd5c2", //改变区域颜色
              },
            },
            symbol: "circle",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#00796A",
                lineStyle: {
                  width: 1,
                  color: "#00796A",
                },
              },
            },
          },
          {
            data: [],
            name: "",
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#CFE6E3",
                lineStyle: {
                  width: 1,
                  type: "dotted",
                  color: "#CFE6E3",
                },
              },
            },
          },
        ],
      },
      option_right_pie: {
        title: {
          text: "设备告警情况",
          top:10,
          left:5,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#ffffff'
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["正常数", "告警数"],
          bottom: "0",
          itemWidth: 11,
          itemHeight: 5,
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
            type: "category",
            data: [],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              },
              formatter: function (params) {
                var newParamsName = ''
                var paramsNameNumber = params.length 
                var provideNumber = 3
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                      var tempStr = ''// 表示每一次截取的字符串
                      var start = p * provideNumber // 开始截取的位置
                      var end = start + provideNumber // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p === rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber)
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n'
                      }
                      newParamsName += tempStr // 最终拼成的字符串
                    }
                } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params
                  }
                return newParamsName
              }
            },
          },
        yAxis: 
          {
            type: "value",
            splitLine: {
              //网格线
              show: true,
              lineStyle: {
                color: ["#F4F5F5"],
                width: 0.5,
                type: "solid",
              },
            },
            axisLabel : {
              textStyle: {
                color: '#ffffff'
              }
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        
        series: [
          {
            name: "",
            type: "bar",
            data: [],
            itemStyle: {
              color: "#00796A",
            },
          },
          {
            name: "",
            type: "bar",
            data: [],
            itemStyle: {
              color: "#EC6D2D",
            },
          },
        ],
      },
      option_left_pie: {
        title: {
          text: "设备利用率",
          top:10,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#ffffff'
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          data: [],
          itemWidth: 11,
          itemHeight: 5,
          textStyle: {
            color: '#ffffff'
          }
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "35%",
            style: {
              text: "",
              textAlign: "center",
              width: 30,
              height: 30,
              fontSize: 14,
              fill:"#ffffff"
            },
            
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["50%", "60%"],
            center: ["50%", "40%"],
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
                name: "电表",
                itemStyle: {
                  normal: {
                    color: "#00796A",
                  },
                }
              }
            ],
          },
        ],
      },
      option_left_echar: {
        title: {
          text: "设备告警",
          top:10,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#ffffff'
          },
        },
        tooltip: {
          show: false,
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "50%",
            style: {
              text: "设备总量" + "\n" + "305",
              textAlign: "center",
              width: 30,
              height: 30,
              fontSize: 14,
            },
          },
        ],
        color: ["#00796A", "#EC6D2D"],
        legend: {
          data: ["设备在线率", "设备离线率"],
          bottom: 20,
          itemWidth: 11,
          itemHeight: 5,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            name: "设备在线率",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            radius: ["50%", "60%"],
            center: ["50%", "60%"],
            label: {
								normal: {
									show: true,
									formatter: '{c}',
								},
							},
            labelLine: {
              normal: {
                show:true,
              },
            },
            data: [
              {
                value:'',
                itemStyle: {
                  normal: {
                    color: "rgba(80,150,224,0)",
                  },
                },
              },
              {
                value:'',
                itemStyle: {
                  normal: {
                    color: "#00796A",
                  },
                },
              },
              {
                value:'',
                itemStyle: {
                  normal: {
                    color: "#EC6D2D",
                  },
                },
              },
            ],
          },
          {
            name: "设备离线率",
            type: "pie",
            //起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
          },
        ],
      },
    };
  },
  created() {
    this.$store.commit("changeTopPattern",true);
    this.$store.commit('change_memuindex','1')
    this.$store.commit("changehome");
    let that = this;
    this.textcolor()
    this.getAddrByPoint('湖南省长沙市')
    /* 模拟获取表格数据加入homecharts是返回数据 */
    /*告警数量  */
    this.option_left_echar.series[0].data[0].value=this.homecharts.all_nums.all
    this.option_left_echar.series[0].data[1].value=this.homecharts.all_nums.online
    this.option_left_echar.series[0].data[2].value=this.homecharts.all_nums.all-this.homecharts.all_nums.online
    /* 设备利用率*/
    this.option_left_pie.graphic[0].style.text="设备利用率" + "\n" + this.homecharts.utilization_rate.utilization_rate
    for(let i=0;i<this.homecharts.utilization_rate.data.length;i++){
      let obj={
          value:that.homecharts.utilization_rate.data[i].value,
          name:that.homecharts.utilization_rate.data[i].name,
      }
      this.option_left_pie.legend.data.push(that.homecharts.utilization_rate.data[i].name)
      this.option_left_pie.series[0].data.push(obj)
    }
    /* 日告警数量 */
    this.option_rightline.xAxis.data=this.homecharts.warning_nums.time
    for(let i=0;i<this.homecharts.warning_nums.data.length;i++){
      this.option_rightline.legend.data.push(that.homecharts.warning_nums.data[i].name)
      this.option_rightline.series[i].data=that.homecharts.warning_nums.data[i].data
      this.option_rightline.series[i].name=that.homecharts.warning_nums.data[i].name
    }
    /* 日告警情况 */
    this.option_right_pie.xAxis.data=this.homecharts.situation.type
    for(let i=0;i<this.homecharts.situation.data.length;i++){
      this.option_right_pie.legend.data.push(that.homecharts.situation.data[i].name)
      this.option_right_pie.series[i].data=that.homecharts.situation.data[i].data
      this.option_right_pie.series[i].name=that.homecharts.situation.data[i].name
    }
  },
  mounted() {
    this.mychar();
  },
  beforeDestroy () {
    this.$store.commit("changeTopPattern",false);
    this.$store.commit("changehome",'true');
  },
  methods: {
    searchEare(){/* 地图地区关键字搜索 */
      let that = this
      var map = new window.BMap.Map("allmap");          
      map.centerAndZoom(new window.BMap.Point("112.931","28.235"),8);
      var local = new window.BMap.LocalSearch(map, {
        renderOptions:{map: map},
        onSearchComplete:function(res){
          that.searchArr=res.Hr
        }
      });
      local.search(this.form.value);
    },
    ready({map}){/* 地图暗色设置 */
      map.setMapStyle({
        styleJson:[
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#011929",
            },
          },
          {
              featureType: "water",
              elementType: "geometry",
              stylers: {
                color: "#103347",
              },
            },
          {
              featureType: "green",
              elementType: "geometry",
              stylers: {
                color: "#061c31",
              },
            },
          {
              featureType: "building",
              elementType: "geometry",
              stylers: {
                color: "#011929",
              },
            },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              color: "#003740",
            },
          },
          {
              featureType: "manmade",
              elementType: "geometry",
              stylers: {
                color: "#011929",
              },
            },
          {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#000000",
              },
            },
        ]
      }); 
    },
    changeTheme(){/* 切换主题 */
      if(this.colorBool){
        this.$store.commit("changeTopPattern",true);
      }else{
        this.$store.commit("changeTopPattern",false);
      }
      this.colorBool=!this.colorBool
      this.textcolor()
      this.mychar()
    },
    textcolor(){/* 图表文字颜色改变 */
      if(this.colorBool){
        this.echartsColor('#6F7470','#323532')
      }else{
        this.echartsColor('#A9AAA9','#A9AAA9')
      }
    },
    echartsColor(colorOne,colorTwo){/*封装的图表文字改变颜色方法，颜色2是圆环中心文字颜色，1是其他的颜色 */
      let arr=[this.option_rightline,this.option_right_pie,this.option_left_pie,this.option_left_echar]
        for(let i=0;i<arr.length;i++){
          arr[i].title.textStyle.color=colorOne
          arr[i].legend.textStyle.color=colorOne
        }
        this.option_rightline.yAxis.axisLabel.textStyle.color=colorOne
        this.option_rightline.xAxis.axisLabel.textStyle.color=colorOne
        this.option_right_pie.yAxis.axisLabel.textStyle.color=colorOne
        this.option_right_pie.xAxis.axisLabel.textStyle.color=colorOne
        this.option_left_pie.graphic[0].style.fill=colorTwo
        this.option_left_echar.graphic[0].style.fill=colorTwo
    },
    equipmentstart(){/* 地图里面设备启动 */
      
    },
    equipmentend(){/* 地图里面设备中断 */
     
    },
    getAddrByPoint(point){/* 获取当前point地区的中心点 */
    console.log(point)
     /*  var map = new BMap.Map("allmap")
      console.log(map) */
     /*  var that = this;
      var geco = new BMap.Geocoder();
      geco.getLocation(point, function(res){
        console.log(res)  //内容见下图
        that.mk.setPosition(point) //重新设置标注的地理坐标
        that.map.panTo(point)  //将地图的中心点更改为给定的点
        that.form.address = res.address;  //记录该点的详细地址信息
        that.form.addrPoint = point;  //记录当前坐标点
      }) */
    },
    zoomend(e){/* 地图缩放 */
      let lng=0.04;/* 经度在15比例下离中心点左右各0.04， */
      let lat=0.02/* 维度在15比例下离中心点上下各0.02， */
      if(e.target.getZoom()<15){
        lng=(15-e.target.getZoom())*2.5*lng
        lat=(15-e.target.getZoom())*2.5*lat
      }
      this.map_form.start_lng=e.target.getCenter().lng+lng
      this.map_form.start_lat=e.target.getCenter().lat+lat
      this.map_form.end_lng=e.target.getCenter().lng-lng
      this.map_form.end_lat=e.target.getCenter().lat-lat
    },
    mapmove(e){/* 地图移动 */
      let lng=0.04;
      let lat=0.02
      if(e.target.getZoom()<15){
        lng=(15-e.target.getZoom())*2.5*lng
        lat=(15-e.target.getZoom())*2.5*lat
      }
      this.map_form.start_lng=e.target.getCenter().lng+lng
      this.map_form.start_lat=e.target.getCenter().lat+lat
      this.map_form.end_lng=e.target.getCenter().lng-lng
      this.map_form.end_lat=e.target.getCenter().lat-lat
    },
    zoom_add(){/* 地图放大 */
      if(this.zoom>=15){
        this.$message({
          message: '抱歉，目前是最大比例了',
          type: 'warning'
        });
      }else{
        this.zoom++
      }
    },
    zoom_reduce(){/* 地图缩小 */
      if(this.zoom<=5){
        this.$message({
          message: '抱歉，目前是最小比例了',
          type: 'warning'
        });
      }else{
        this.zoom--
      }
    },
    moveleft(){/*地图全屏动画 */
      let el = document.getElementsByClassName("echarts_box")[0];
      let els = document.getElementsByClassName("echarts_box")[1];
      let tables = document.getElementsByClassName("table")[0];
      let control_top = document.getElementsByClassName("control_top")[0];
      let that = this;
      let steep =0;
      let time1=setInterval(function(){
        steep++
        that.inde+=steep
        if(that.inde>300){
          control_top.style.width='98%'
          clearInterval(time1)
          that.zoombool=!that.zoombool
        }else{
          el.style.marginLeft =that.inde*-1+'px'
          els.style.marginRight =that.inde*-1+'px'
          tables.style.marginBottom =that.inde*-1+'px'
          if(steep<50){
            control_top.style.width=(50+steep)+'%'
          }
          
        }
      },15)
    },
    narrow(){/* 取消地图全屏动画 */
      let el = document.getElementsByClassName("echarts_box")[0];
      let els = document.getElementsByClassName("echarts_box")[1];
      let tables = document.getElementsByClassName("table")[0];
      let control_top = document.getElementsByClassName("control_top")[0];
      let that = this;
      let steep =0;
      let time1=setInterval(function(){
        steep++
        that.inde-=steep
        if(that.inde<0){
          that.zoombool=!that.zoombool
          control_top.style.width='calc(100% - 580px)'
          clearInterval(time1)
        }else{
          el.style.marginLeft =that.inde*-1+'px'
          els.style.marginRight =that.inde*-1+'px'
          tables.style.marginBottom =that.inde*-1+'px'
          if(steep<50){
            control_top.style.width=(100+steep*-1)+'%'
          }
        }
      },15)
    },
    mychar() {/* 图表渲染 */
      let myChart = this.$echarts.init(document.getElementById("right_line"));
      myChart.setOption(this.option_rightline);
      let right_pie = this.$echarts.init(document.getElementById("right_pie"));
      right_pie.setOption(this.option_right_pie);
      let left_pie = this.$echarts.init(document.getElementById("left_pie"));
      left_pie.setOption(this.option_left_pie);
      let left_ech = this.$echarts.init(document.getElementById("left_ech"));
      left_ech.setOption(this.option_left_echar);
    },
    lookDetail(index) {
      /* 地图查看信息 */
      this.windowmessage.markers = this.windowarr[index];
      this.windowmessage.show = true;
    },
    changebool() {
      this.$store.commit("changehome");
      if(this.$store.state.homeshow){
        this.$refs.backbutton.innerHTML='关闭导航'
      }else{
        this.$refs.backbutton.innerHTML='回到导航'
      }
      this.mychar();
    },
    details(shuju) {
      /* this.newdetails = shuju; */
      this.$router.push({
          name:'worningdetails',
          query: {
            id: shuju.warnning_id.value
          }
      })
      /* let time1 = setTimeout(() => {
        if (this.$refs.datadetails.innerHTML) {
          clearTimeout(time1);
          this.$alert(
            `<div class="detail">${this.$refs.datadetails.innerHTML}</div>`,
            "详情",
            {
              dangerouslyUseHTMLString: true,
              center: true,
            }
          );
        } else {
          time1();
        }
      }, 100); */
    },
    stop(data, index) {
      let that = this;
      this.$prompt("请输入停止原因", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          that.tableData[index].handle.value = "已处理";
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          console.log(data);
        })
        .catch(() => {});
    },
    stare(data, index) {
      let that = this;
      this.$confirm("您确认要开启该设备吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          that.tableData[index].handle.value = "已处理";
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          console.log(data);
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectEnable(row) {
      if (row.handle.value == "已处理") {
        return true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.control_top{
  width:calc(100% - 580px);
  position: absolute;
  top:10px;
  left:50%;
  transform:translate(-50%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding-right:10px;
  overflow:auto;
  .left{
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    position: relative;
    ul{
     /*  position: fixed;
      right: 0;
      bottom: 0; */
      float: right;
      width: 180px;
    /*   transform: translateY(-100%); */
      background-color: #ffffff;
      z-index: 200;
      li{
        list-style: none;
      }
    }
    .type{
      /deep/ .el-input {
        width: 90px;
        margin-left:0px;
      }
    }
    .el-icon-search{
      font-size: 16px;
      position: absolute;
      right:4px;
    }
    .gjz{
      width: 180px;
      margin-left:5px;
    }
    
  }
  .center{
    width: 20%;
    overflow: hidden;
    transform: translateX(-20%);
  }
  img{
    height: 25px;
  }
  .top_right{
    display: flex;
    justify-content:flex-end;
    align-items: center;
    .backhome {
      margin-right: 5px;
      background-color: #ffc331;
      padding: 5px 10px;
      color: #ffffff;
      border-radius: 5px;
    }
    .sx{
      width: 22px;
      height: 22px;
      background-color: #000000;
      opacity: 0.7;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      img{
        height: 13px;
      }
    }
  }
}
/deep/ .el-input {
    width: 135px;
    margin-left: 22px;
  }
/deep/ .BMap_shadow {
  display: none;
}
/deep/ .box-sizing{
    height: auto !important;
}
/deep/ .BMap_pop {
  > div,
  > img {
    display: none;
  }
  > div:nth-child(9) {
    display: inline-block;
    background-color: rgba(23, 70, 68, 0.8);
    color: #ffffff;
    > div {
      padding: 5px 10px;
    }
  }
  .custom_window {
    width: 100%;
    display: inline-block;
    font-size: 10px;
    .operation{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      p:first-child{
        background-color: #fbb733;
      }
      p{
        background-color: #ec5655;
        margin-right: 10px;
        margin-top: 10px;
        text-align: center;
        border-radius:3px;
        width: 60px;
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
.bm-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
}
.home {
  position: relative;
  background-color: #FAFAFA;
  width: 100%;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  .midnight{
    >div{
      background: linear-gradient(90deg, #19242E, #232A35) !important;
    }
    .icon{
      color:#FFFFFF;
    }
    .icons{
      &>div{
        background-color: #222934 !important;
      }
    }
    /deep/ .el-input{
      input{
        background-color: #232A35 !important;
        border: none;
        color: #FFFFFF;
      }
      input::-webkit-input-placeholder{
        color:#ffffff;
      }
      input:-moz-placeholder{
        color:#ffffff;
      }
      input::-moz-placeholder{
        color:#ffffff;
      }
      input:-ms-placeholder{
        color:#ffffff;
      }
    }
    /deep/ .table{
      border: none;
    }
    /deep/ th{
      border: none;
    }
    /deep/ td{
      border: none;
      border-top:4px solid #011929;
    }
    /deep/ .el-table__body{
      th,td{
        background: #2D3644 ;
        color:#999999 ;
      }
    }
    /deep/ .is-leaf {
      background: #232A35;
      color:#E6E6E6;
    }
  }
  .right_echart{
    width: 300px;
  }
  .echarts_box {
    width: 274px;
    > div {
      width: 100%;
      height:calc(50% - 10px);
      margin-right: 10px;
      margin-top: 10px;
      background-color: #ffffff;
      border-radius: 5px;
      z-index: 2;
      h5 {
        font-size: 18px;
        text-align: left;
      }
      img {
        width: 100%;
      }
    }
  }
  .table{
    position: absolute;
    bottom: 0;
    z-index: 2;
    /deep/ .el-button{
      span{
        color: #377F74;
      }
    }
  }
  /deep/ .el-table{
      td,th{
        padding: 5px!important;
        line-height: 30px;
         text-align: center;
        font-size: 14px !important;
      }
    }
  .centernav {
    width: calc(100% - 548px);
    position: relative;
    .dingwei{
      position: fixed!important;
      top: calc(100% - 120px) !important;
    }
    .icons{
      z-index: 100;
      position: absolute;
      top:310px;
      right: 20px;
      width: 25px;
      background: none !important;
      &>div{
       
        width: 23px;
        height: 23px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          width: 15px;
          height: 15px;
        }
      }
      p{
        margin-top: 10px;
        padding: 5px;
        color: #ffffff;
        background-color: #00807C;
      }
      p:last-child{
        background-color: #EC5755;
      }
    }
  }
  .right {
    width: 386px;
    height: 50%;
    margin-top: 12px;
    box-shadow: 0px 2px 16px 0px rgba(147, 147, 147, 0.5);
    #right_line,
    #right_pie {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .anchorBL {
    display: none;
  }
}
/deep/ .table_index5 {
  color: #ec5755 !important;
}
/deep/ .table_index_blue5 {
  color: #086eec !important;
}
</style>
