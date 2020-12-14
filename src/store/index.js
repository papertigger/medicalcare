import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    new_select:'首页',
    homeshow:true,
    reginbool:true,
    topPattern:false,/* false头部导航黑夜模式 */
    memuindex:'0',
    details:{}
  },
  mutations: {
    changeTopPattern(state,data){/* 改变头部导航模式 */
      state.topPattern=data
    },
    change_memuindex(state,data){
      state.memuindex=data
    },
    change_reginbool(state,data){
      state.reginbool=data
    },
    file_details(state,data){
      state.details=data
    },
    change_select(state,data){
      state.new_select=data
    },
    changehome(state,data){
      if(data){
        state.homeshow=data
      }else{
        state.homeshow=!state.homeshow
      }
     
    }
  },
  actions: {
  },
  modules: {
  }
})
