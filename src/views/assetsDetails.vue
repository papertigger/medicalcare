<template>
    <div class="details page">
       <div class="title">
           查看详情
       </div>
       <div class="nav">
           <div class="box" v-for="(val,index) in obj" :key="index">
               <p>{{val.name}}</p>
               <p :class="[val.name=='在线状态'&&val.value=='在线'?'blue':'',val.name=='在线状态'&&val.value=='离线'?'red':'']">{{val.value}}</p>
           </div>
           <div class="operation">
               <p>开启</p>
               <p>中断</p>
           </div>
       </div>
       <el-table
        ref="multipleTable"
        border
        :data="tableData"
        class="table"
        tooltip-effect="dark"
        max-height="280"
        style="width: 100%;font-size: 13px"
        >
       <!--  <el-table-column type="selection" > </el-table-column> -->
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
        <!-- <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope"> 
            <el-button type="text" size="small" class="green"  @click="details(scope.row)">开启</el-button>
            <el-button type="text" size="small" class="green"  @click="details(scope.row)">中断</el-button>
             <el-button  type="text" size="small" class="green">修改</el-button>
            <el-button type="text" class="table_index5" size="small">删除</el-button>
            </template>
        </el-table-column> -->
        </el-table>
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                prev-text="上一页"
                next-text="下一页"
                :total="assets_nums"
            >
            </el-pagination>
        </div>
        <div class="back">返回</div>
    </div>
</template>
<script>
export default {
    created () {
        this.$store.commit("change_memuindex", "2");
    },
    data () {
        return {
            currentPage: 1,
            /* 详情 */
            obj:{
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
                start_type:{
                    name: "启动类型",
                    value: "手动",
                }
            },
            assets_nums:3,/* 设备总数 */
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
            tableData: [/* 表格数据 */
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
                },
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
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>
<style lang="less" scoped>
.details{
    .title{
        padding-left: 8px;
        margin-top: 22px;
        border-left: 3px solid #00807C;
        text-align: left;
        height: 14px;
        line-height: 14px;
        color: #00807C;
    }
    .nav{
        margin-top: 17px;
        margin-bottom: 9px;
        background-color: #F2F2F2;
        padding:3px 16px 15px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: left;
        .box{
            width: 25%;
            display: flex;
            justify-content: flex-start;
            color: #404040;
            font-size: 10px;
            padding-top: 14px;
            p:nth-child(1){
                width: 6em;
                color: #7B808D;
            }
            .blue{
                color: #086EEC;
            }
            .red{
                color: #EC5755;
            }
        }
        .operation{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding-top: 14px;
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
    /deep/ .el-table__header th{
        background-color: #f2f2f2;
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
    .back{
        width: 62px;
        height: 26px;
        border: 1px solid #00807C;
        border-radius: 3px;
        line-height: 26px;
        color: #00807C;
        margin: 0 auto;
    }
}
</style>