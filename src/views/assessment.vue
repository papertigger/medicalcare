<template>
  <div class="home page">
      <div class="title">
        <p>当前位置:</p>
        <span>{{newselect}}</span>
      </div>
      <p>{{value}}</p>
  </div> 
</template>

<script>
export default {
  name: 'Home',
  computed: {
    newselect(){
      return this.$store.state.new_select
    }
  },
  data () {
    return {
      value:""
    }
  },
  created () {
    var that = this
    console.log(1)
    let text=encodeURIComponent('湖南')
    console.log(text)
    this.$axios({
      method: "post",
      url:'/api&province=5rmW5Y2X',
     /*  data:{
       中文
       utf-8
       Unicode
       Ascii
       base64
        AppID:"XXDL_WLWPT",
        Password:"XXDL_WLWPT2557013",
        Pagename:"front_interface",
        return:"true"
      } */
    }).then(function (res) {
      that.value=res.statusText
      console.log(res);
    });
  }
}
</script>
<style lang="less" scoped>
.title{
  width: 100%;
  padding: 15px 22px;
  display: flex;
  justify-content: flex-start;
  p{
    color: #B3B3B3;
    padding-right: 5px;
  }
}
</style>
