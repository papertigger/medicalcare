<template>
    <div id="message" class="page">
        <div class="navigation">
            <el-menu :default-active="activeIndex"  active-text-color='#00807C' class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部</el-menu-item>
                <el-menu-item index="2">已读</el-menu-item>
                <el-menu-item index="3" >未读</el-menu-item>
            </el-menu>
        </div>
        <div class="nav">
            <div class="box" v-for="(item,index) in arr" :key="index">
                <p :class="item.type=='未处理'?'show':''"></p>
                <p>{{item.value}}</p>
                <p @click="details(index)">详情</p>
            </div>
        </div>
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            currentPage: 1,
            activeIndex:'1',
            assets_nums:3,
            arr:[
                {
                    type:"未处理",
                    value:"设备D884uK电表异常，请及时处理",
                    id:"1233555"
                },
                {
                    type:"未处理",
                    value:"设备D884uK电表异常，请及时处理",
                    id:"1233555"
                },
                {
                    type:"未处理",
                    value:"设备D884uK电表异常，请及时处理",
                    id:"1233555"
                },
                {
                    type:"已处理",
                    value:"设备D884uK电表异常，请及时处理",
                    id:"1233555"
                }
            ]
        }
    },
    methods: {
        details(inde){
            this.$router.push({
                name:'worningdetails',
                query: {
                    id: this.arr[inde].id
                }
            })
        },
        handleSelect(){
           
        },
        handleCurrentChange(){

        }
    }
}
</script>
<style lang="less" scoped>
@import "../components/css/common.css";
#message{
    .el-menu--horizontal{
        padding-top: 26px;
        li{
            height:46px;
            line-height: 46px;
            padding: 0;
            margin-right: 40px;
            border-width: 3px;
            font-size: 11px;
        }
    }
    .nav{
        width: 100%;
        max-height:calc(100% - 140px);
        overflow-y: scroll;
        .box{
            width: 100%;
            display: flex;
            justify-content:flex-start;
            align-items: center;
            font-size: 11px;
            padding:24px 0 17px;
            border-bottom: 1px solid #E6E6E6;
            p:first-child{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                margin-right:3px;
            }
            p:last-child{
                color: #00807C;
                padding-left: 38px;
            }
            .show{
                background-color: #F85E5E;
            }
        }
    }
}

</style>
