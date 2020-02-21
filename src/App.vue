<template>
  <div id="app">
    <errorbox></errorbox>
    <lodingbox ></lodingbox>
    <!-- <titlebox></titlebox> -->
    <keep-alive include="home,sort">
    <router-view></router-view>
    </keep-alive>
    <navbox></navbox>
  </div>
</template>
<script>
// import titlebox from "./components/tab/tab"; //标题栏
import navbox from "./components/nav/nav"; //底部菜单栏
import lodingbox from "./components/loding/loding"; //加载中
import errorbox from "./components/errorbox/errorbox"; //加载中
import appjs from './appjs' 
export default {
  components: {
    // titlebox: titlebox,
    navbox: navbox,
    lodingbox: lodingbox,
    errorbox:errorbox,
  },

  mixins:[appjs],
};
</script>