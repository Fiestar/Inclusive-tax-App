import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import store from './vuex/store'
import './assets/style/common.min.css'


import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper);
// 请求前缀
const BASE_URL = 'https://pj.263uu.cn';
Axios.defaults.baseURL=BASE_URL;

// 全局引入
Vue.prototype.$axios = Axios

// 全局请求
Vue.prototype.axiosPro = function(than,url, name,data){
  this.$Vuex('acsetData',{name:"login_type",val:true})
  var than = than;
   return new Promise(function(resolve, reject) {
    than.$axios
      .post(url,{...data})
      .then(function(ret) {
        if(ret.data.code == '1'){
          than[name] = ret.data.data;
          resolve(ret.data.data)
        }else{
          than[name] = [];
          than.$Vuex('acsetData',{name:'error_message',val:ret.data.msg})
          resolve([])
        }
      })
      .catch(function(err) {
        resolve(err);
      }).finally(function(){
        than.$Vuex('acsetData',{name:"login_type",val:false})
      })
  });
}

// 全局修改vuex值
Vue.prototype.$Vuex = function(name,data){
  this.$store.dispatch(name,data)
}
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')