export default {
    watch: {
        "$route.path": function(newVal, oldVal) {
          switch (newVal) {
            case "/":
              this.$Vuex("acsetData", { name: "nav_title", val: "普惠税银" });
              break;
              case "/sort":
              this.$Vuex("acsetData", { name: "nav_title", val: "产品列表" });
              break;
              case "/me":
              this.$Vuex("acsetData", { name: "nav_title", val: "我的" });
              break;
              case "/aboutus":
              this.$Vuex("acsetData", { name: "nav_title", val: "关于我们" });
              break;
              case '/loan':
              this.$Vuex("acsetData", { name: "nav_title", val: "我的贷款" });
              break;
              case '/loan_detail':
              this.$Vuex("acsetData", { name: "nav_title", val: "贷款详情" });
              break;
              case "/dialogue":
              this.$Vuex("acsetData", { name: "nav_title", val: "在线客服" });
              break;
              case "/login":
              this.$Vuex("acsetData", { name: "nav_title", val: "登陆首页" });
              break;
          }
        }
      }
}