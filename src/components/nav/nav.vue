<template>
    <div id="nav" v-show="is_show">
      <div v-on:click="route_link('/')" :style="routerpath=='/'?'color:#EC650F':''">
        <img  src="./images/home_select.png" v-if="routerpath=='/'">
        <img  src="./images/home.png" v-else>
        首页
      </div>
      <div v-on:click="route_link('/sort')" :style="routerpath=='/sort'?'color:#EC650F':''">
        <img src="./images/sort_select.png" v-if="routerpath=='/sort'">
        <img src="./images/sort.png" v-else>
        产品分类
      </div>
      <div v-on:click="route_link('/me')" :style="routerpath=='/me'?'color:#EC650F':''" >
        <img src="./images/me_select.png" v-if="routerpath=='/me'">
        <img src="./images/me.png" v-else>
        我的
      </div>
    </div>
</template>
<script>
var body =document.body;
export default {
  data() {
    return {
      routerpath:'',
      body:body,
      is_show:true
    }
  },

  methods:{
    route_link(routess){
      if(routess == this.$route.path)return
      this.body.style=''
    this.$router.replace({path:routess})
    },
    show_nav(route){
      if(route == 'home' || route == 'me' || route == 'sort'){
        this.is_show = true
      }else{
        this.is_show = false;
      }
    }
  },

  watch: {
    $route(neww,old){
      this.routerpath = neww.path
    this.show_nav(neww.name)
    }
  },
  created() {
    var route = this.$route
    this.routerpath = route.path
    this.show_nav(route.name)
  },
}
</script>

<style lang="scss">
a{
  text-decoration: none;
        color: #262626;
}

    #nav{
        border-top: 1px solid #DDDDDD;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        height:3.92rem /* 98/25 */;
          font-size: .8rem /* 20/25 */;
        display: flex;
        justify-content: space-around;
        flex-flow: row nowrap;
        color: #262626;
        background: #ffffff;
        align-items:flex-end ;
        padding-bottom: .4rem /* 10/25 */;
        text-align: center;
        img{
          width: 1.68rem /* 42/25 */;
          height: 1.68rem /* 42/25 */;
          display: block;
          margin: 0 auto;
        }
    }
</style>