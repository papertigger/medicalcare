<template>
  <div id="wornning-details" class="page">
    <div class="title">查看详情</div>
    <div class="nav">
        <div class="container">
            <div class="box" v-for="(item, index) in data" :key="index">
                <p>{{ item.name }}</p>
                <p
                :class="[
                    item.value == '在线' || item.value == '正常' ? 'blue' : '',
                    item.value == '离线' || item.value == '异常' ? 'red' : '',
                ]"
                >
                {{ item.value }}
                </p>
            </div>
        </div>
        <div class="operation">
            <p @click="details()">查看详情</p>
            <p>开启</p>
            <p>中断</p>
            <p>返回</p>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit("change_memuindex", "3");
  },
  data() {
    return {
      data: {
        id:{
          name: "设备ID",
          value: "104553526583",
        },
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
        agreement_name: {
          name: "协议名称",
          value: "http",
        },

        open_ip: {
          name: "IP",
          value: "218.104.146.37",
        },
        open_port: {
          name: "开放端口",
          value: "12222",
        },
        online_staus: {
          name: "在线状态",
          value: "开",
        },
        start_type: {
          name: "启动类型",
          value: "手动",
        },
        company_name: {
          name: "厂商名称",
          value: "华自科技",
        },
        contacts: {
          name: "联系人名称",
          value: "刘军",
        },
        tel: {
          name: "联系人电话",
          value: "1515257685",
        },
      },
    };
  },
  methods: {
    details(){
      this.$router.push({
          name:'assetsdetails',
          query: {
            id: this.data.id.value
          }
      })
    }
  }
};
</script>
<style lang="less" scoped>
#wornning-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .title {
    padding-left: 8px;
    margin-top: 22px;
    border-left: 3px solid #00807c;
    text-align: left;
    height: 14px;
    line-height: 14px;
    color: #00807c;
    margin-bottom: 16px;
  }
  .nav {
    flex: 1;
    background-color: #f2f2f2;
    margin-bottom: 21px;
    .container{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px 37px;
        .box {
            width: 50%;
            display: flex;
            justify-content: flex-start;
            color: #404040;
            font-size: 10px;
            text-align: left;
            padding-top: 14px;
            p:nth-child(1) {
                width: 6em;
                color: #7b808d;
            }
            .blue {
                color: #086eec;
            }
            .red {
                color: #ec5755;
            }
        }
    }
    .operation{
            width: 30%;
            margin: 0 auto;
            display: flex;
            justify-content:space-around;
            padding-top: 43px;
            p{
                width: 62px;
                height: 26px;
                border-radius: 3px;
                line-height: 26px;
                background-color: #EC5755;
                text-align: center;
                color: #ffffff;
                margin-right: 12px;
            }
            p:first-child{
                background-color: #00807C;
            }
        }
  }
}
</style>