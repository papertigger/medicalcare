<template>
  <div class="memu">
    <el-col class="box">
      <el-menu
        :default-active='this.$store.state.memuindex' class="el-menu-vertical-demo"
        background-color="#F2F2F2"
        text-color="#576261"
        active-text-color="#fff"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span @click="change">首页</span>
          </template>
          <el-menu-item-group title="">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item index="1" @click="change('首页','home',1)">
          <img  v-if="this.$store.state.memuindex==1" src="../../assets/home_none.png" >
          <img v-else src="../../assets/home.png" >
          <span slot="title" >首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="change('资产管理','about',2)">
          <img v-if="this.$store.state.memuindex==2" src="../../assets/administration_none.png" >
          <img v-else src="../../assets/administration.png" >
          <span slot="title" >资产管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="change('预警处理','warning',3)">
          <img v-if="this.$store.state.memuindex==3" src="../../assets/early_warning_none.png" >
          <img v-else src="../../assets/early_warning.png" >
          <span slot="title">预警处理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="change('数据分析','analysis',4)">
            <img v-if="this.$store.state.memuindex==4" src="../../assets/data_none.png" >
           <img v-else src="../../assets/data.png" >
          <span slot="title">数据分析</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
    data () {
        return {
           action:"1",
           index:'1'
        }
    },
    created () {
      if(sessionStorage.change_select!=undefined){
        this.$store.commit('change_select', sessionStorage.change_select)
      }
    },
    methods: {
        change(data,url,index){
          this.action=index
            sessionStorage.setItem("change_select",data)
            this.$store.commit('change_select', data)
            this.$router.push({
                name:url
            })
        }
    }
}
</script>
<style lang="less" scoped>

.box{
    width: 100%;
    text-align: left;
    overflow-y: scroll;
  -ms-overflow-style: none; 
  overflow: -moz-scrollbars-none;
  img{
    width: 15px;
    height: 13px;
    margin-right: 7.5px;
  }
  .el-menu{
      border: none !important;
      z-index: 100;
  }
    .is-active{
        background-color:#00807C !important;
    }
}
.box::-webkit-scrollbar { width: 0 !important }
</style>