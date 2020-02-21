import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import home from '@/pages/home/home.vue'
import me from '@/pages/me/me'
import sort from '@/pages/sort/sort.vue'
import aboutus from '@/pages/aboutus/aboutus'
import dialogue from '@/pages/dialogue/dialogue'
import login from '@/pages/login/login'
import test from '@/pages/test/test'
import loan from '@/pages/loan/loan'
import loan_detail from '@/pages/loan_detail/loan_detail'
import loan_more from '@/pages/loan_more/loan_more'
export default new Router({
    mode: "history",
    routes:[
        // 首页
       {
        path:'',
        name:'home',
        component:home
       },
       
       //产品分类
       {
        path:'/sort',
        name:'sort',
        component:sort
       },

       //我的
       {
        path:'/me',
        name:'me',
        component:me
       },

       //关于我们
       {
        path:'/aboutus',
        name:'aboutus',
        component:aboutus
       },

       //客服
       {
        path:'/dialogue',
        name:'dialogue',
        component:dialogue
       },

       //登陆
       {
        path:'/login',
        name:'login',
        component:login
       },

       //我的贷款
       {
        path:'/loan',
        name:'loan',
        component:loan
       },

       //贷款详情
       {
        path:'/loan_detail',
        name:'loan_detail',
        component:loan_detail
       },

       //产品详情
       {
           path:'/loan_more',
           name:'loan_more',
           component:loan_more
       }


       //测试界面
    //    {
    //     path:'/test',
    //     name:'test',
    //     component:test
    //    }

    ]
})