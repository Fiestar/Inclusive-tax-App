import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let  state = {
    nav_title:'普惠税银',//标题
    router_link_url:'',//跳转的路由地址
    login_type:false,//加载中
    nav_type:true,//底部菜单栏是否显示
    code_message:'点击获取',//验证码文字
    code_time:0,//验证码倒计时
    error_message:'',//错误提示
}

export default new Vuex.Store({
    state,

    // 修改状态数据
    mutations:{
        muData(state,data){
            state[data.name] = data.val
        },
        muTime(state){
            var than = this
            if(state.code_time>0){
                setTimeout(()=>{
                    --state.code_time
                    state.code_message = state.code_time+'s'
                    than.commit('muTime')
                },1000)
            }else{
                state.code_message = '点击获取'
            }
        }
    },
    actions:{
        acsetData({commit,state},data){
            commit('muData',data)
        },
        acsetTime({commit,state}){
            state.code_time = 100
            state.code_message = state.code_time+'s'
            commit('muTime')
        }
    }
})
