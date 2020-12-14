import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts'
import {Base64} from 'js-base64'
import XLSX from 'xlsx'
import commonjs from './components/js/common'

Vue.prototype.commonjs = commonjs
Vue.prototype.XLSX = XLSX
Vue.prototype.$echarts = echarts
Vue.prototype.$Base=Base64
Vue.prototype.message="/message"
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  Vue.prototype.api="/api"
}else{
  Vue.prototype.api="http://218.104.146.37:9000/ucc?AppID=XXDL_WLWPT&Password=XXDL_WLWPT2557013&Pagename=front_interface&return=true&"
}
axios.interceptors.request.use(function (config) { 
 /*  let data=Base64.encode(JSON.stringify(config.data.data))
  config.url=config.url+'&Controlname='+config.data.Controlname+'&data='+data */
  /* if (config.url == 'https://jinhua.baianinfo.com/v1/other/eReport/submit' || config.url == 'https://jinhua.baianinfo.com/v1/other/eReport/upload_all') {
      config.headers['Content-Type'] = 'multipart/form-data'
      var newData = config.data
      var newForm = new FormData();
      for(var key in newData){
        newForm.append(key,newData[key])
      }
      config.data = newForm
    } */
return config
}, function (error) {
return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
