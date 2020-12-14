<template>
    <div id="topbar">
        <div class="box" :class="[{'midnight':this.$store.state.topPattern}]">
            <h5 class="title">
                凤凰电力物联网安全管理平台
            </h5>
            <div class="nav"> 
                <div class="content" @click="message()">
                    <p>消息</p>
                    <p class="el-icon-chat-line-round icon"></p>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        您好，anyway<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        message(){
            this.$router.push({
                name:'message'
            })
        }
       /*  change(){
            this.$router.push({
                name:'assessment'
            })
        } */
    }
}
</script>
<style lang="less" scoped>
.midnight{
    background-color:#18232D !important;
}
.box{
    width: 100%;
    height: 40px;
    background-color: #00807C;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-content: center;
    line-height: 40px;
    .title{
        font-size: 15px;
    }
    .nav{
        display: flex;
        justify-content: flex-end;
        z-index: 100;
        .content{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            justify-content: flex-end;
            align-content: center;
            padding-right: 20px;
            border-right: 1px solid #ffffff;
            height: 14px;
            line-height: 14px;
            margin-right: 20px;
            p{
                padding-right: 4px;
                font-size: 14px;
            }
            .icon{
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
            }
        }
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>