<template>
  <div id="app">
    <div class="top_bar" v-if="this.$store.state.reginbool">
      <tabbar></tabbar>
    </div>
    <div class="ddbox" v-if="this.$store.state.homeshow&&this.$store.state.reginbool">
      <memu ></memu>
    </div>
    <div id="nav" :class="{app_nav:this.$store.state.homeshow}">
     <!--  <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
       <router-view />
    </div>
   
  </div>
</template>
<script>
import memu from './components/memu/memu'
import tabbar from './components/memu/topbar'
export default {
  components: {
    memu,
    tabbar
  },
  data () {
    return {
      homebool:true,
    }
  },
  created () {
    this.homebool=this.$store.state.homeshow
    /* this.$axios({
      method: "post",
      url:'/api',
      data:{
        Controlname:'province',
      }
    }).then(function (res) {
      console.log(res);
    }); */
   /*  this.$axios({
      method:"get",
      url:"/js/login.json"
    }).then((res)=>{
      console.log(res)
    }) */
  }
}
</script>
<style lang="less">
.el-message-box__title{
   font-size: 16px;
   font-weight: 800;
}
* {
  font-size: 12px;
  cursor:default
}
.top_bar{
  width: 100%;
}
.ddbox{
  height:calc(100vh - 42px);
  background-color:#F2F2F2;
  width:143px;
  display: inline-block;
  overflow-y: scroll;
  -ms-overflow-style: none; 
  overflow: -moz-scrollbars-none;
}
.page::-webkit-scrollbar { width: 0 !important }
.page{
  height:calc(100vh - 42px);
  overflow-y: scroll;
  -ms-overflow-style: none; 
  overflow: -moz-scrollbars-none;
  padding: 0 22px;
}
.ddbox::-webkit-scrollbar { width: 0 !important }
#app { 
font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #404040;
  font-size: 12px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.app_nav{
  overflow-x:hidden;
  width:calc(100% - 143px) !important;
}
#nav {
  width: 100%;
  display: inline-block;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
