<template>
  <div id="me">
    <div class="box_b"></div>
    <tab-bar class="tab-bar">
      <h2 slot="center">我的</h2>
    </tab-bar>
    <div class="login">
      <img src="./images/head@2x.png" class="login_icon" />
      <div class="login_btn" v-if="!quit_show" v-on:click="route_link('/login')">立即登录</div>
      <div class="user_number" v-else>{{quit_show}}</div>
    </div>

    <div class="business">
      <div v-on:click="route_link(loan_link)" data-url="/pages/loan/loan">
        <img class="business_icon" src="./images/loan.png" />
        <span>我的贷款</span>
        <img class="right-el" src="@/assets/images/right.svg" />
      </div>
      <div>
        <img class="business_icon" src="./images/invite.png" />
        <span>我的邀请人</span>
        <input
          type="text"
          ref="invite"
          class="inviter right-el"
          maxlength="13"
          placeholder="请输入邀请号"
          @blur="commitNum"
          :readonly="!localStorage||readonly"
          v-model="inviter"
        />
      </div>
    </div>

    <div class="business" style="height: 4.4rem ">
      <!-- <div v-on:click="route_link('/dialogue')">
        <img class="business_icon" src="./images/loan.png" />
        <span>在线客服</span>
        <img class="right-el" src="@/assets/images/right.svg" />
      </div>-->
      <div v-on:click="route_link('/aboutus')" data-url="/pages/aboutus/aboutus">
        <img class="business_icon" src="./images/consumerhotline.png" />
        <span>关于我们</span>
        <img class="right-el" src="@/assets/images/right.svg" />
      </div>
    </div>

    <div class="quit" v-if="quit_show" v-on:click="quit_click">退出登录</div>
  </div>
</template>
<script>
import TabBar from "@/components/tab-bar/TabBar";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      quit_show: "",
      loan_link: "/loan",
      inviter: "",
      parent_id: "",
      localStorage: "",
      readonly: false
    };
  },

  methods: {
    route_link(routess) {
      if (routess == this.$route.path) return;
      this.$router.push({ path: routess });
    },
    quit_click() {
      // var this = this;
      localStorage.removeItem("loding_type");
      this.show_loading();
    },
    show_loading() {
      var loading_type = localStorage.getItem("loding_type");
      try {
        loading_type = JSON.parse(loading_type);
      } catch (error) {}
      if (loading_type) {
        this.inviter = loading_type.parent_id;
        this.parent_id = loading_type.parent_id;
        try {
          this.quit_show =
            loading_type.phone.substring(0, 3) +
            " **** " +
            loading_type.phone.substring(7);
          this.loan_link = "/loan";
        } catch (error) {}
      } else {
        this.quit_show = "";
        this.inviter = "";
        this.loan_link = "/login";
      }
    },
    // 邀请人
    commitNum() {
      var than = this;
      if (!this.inviter || this.localStorage.parent_id) return;
      let invite = confirm("是否设置" + this.inviter + "为您的邀请人");
      if (invite) {
        var sen_data = {
          phone: this.inviter,
          id: this.localStorage.id
        };
        than.$Vuex("acsetData", { name: "login_type", val: true });
        than.$axios.post("/api/My/invite", { ...sen_data }).then(function(ret) {
          if (ret.data.code == "1") {
            than.readonly = true;
            than.localStorage.parent_id = than.inviter;
            localStorage.removeItem("loding_type");
            localStorage.setItem(
              "loding_type",
              JSON.stringify(than.localStorage)
            );
          } else {
            than.$Vuex("acsetData", {
              name: "error_message",
              val: ret.data.msg
            });
          }
        });
        than.$Vuex("acsetData", { name: "login_type", val: false });
      } else {
        this.inviter = "";
        return;
      }
      if (this.inviter === "" && this.localStorage.length > 1) {
        this.inviter = this.parent_id;
      }
    }
  },
  created() {
    this.show_loading();
    var loading_type;
    try {
      loading_type = JSON.parse(localStorage.getItem("loding_type"));
    } catch (error) {}
    this.localStorage = loading_type;
    if (this.inviter) {
      this.readonly = true;
    }
  }
};
</script>
<style lang="scss">

#me {
  .tab-bar h2 {
    font-size: 1.44rem /* 36/25 */;
    font-weight: 400;
    line-height: 3rem /* 50/25 */;
  }
  .box_b {
  display: block;
  position: absolute;
  left: 0;
  background:url('./images/background.png');
  top: 0;
  z-index: -1;
  width: 30rem /* 750/25 */;
  background-size: 100% 100%;
  height: 14.8rem /* 370/25 */;
}
  .login {
    width: 27.6rem /* 690/25 */;
    height: 4.72rem /* 118/25 */;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    margin: 9% auto 0;
    display: flex;
    align-items: center;
  }
  .login_bg {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .login_icon {
    z-index: 2;
    width: 4.72rem /* 118/25 */;
    height: 4.72rem /* 118/25 */;
  }
  .login_btn {
    display: inline-block;
    margin-left: 1.6rem /* 40/25 */;
    width: 8rem /* 200/25 */;
    height: 2.4rem /* 60/25 */;
    border-radius: 0.2rem /* 5/25 */;
    color: #ffffff;
    font-size: 1.44rem /* 30/25 */;
    line-height: 2.4rem /* 60/25 */;
  }

  /* 业务 */
  .business {
    width: 27.6rem /* 690/25 */;
    height: 8.8rem /* 220/25 */;
    border-radius: 1.12rem /* 28/25 */;
    background: #ffffff;
    margin: 0 auto;
     /* 11/25 */
    margin-top: 1.6rem /* 40/25 */;
    box-shadow:0px 1px .44rem 1px rgba(115,58,11,0.12);
  }
  .business div {
    margin: 0 1.2rem /* 30/25 */;
    height: 4.4rem /* 110/25 */;
    line-height: 4.4rem /* 110/25 */;
    box-sizing: border-box;
    font-size: 1.2rem /* 30/25 */;
    color: #333333;
    position: relative;
    padding-left: 2.48rem /* 62/25 */;
    font-weight: 500;
  }
  .business div + div {
    border-top: 1px solid #e6e6e6;
    border-radius: 1px;
  }

  .business_icon {
    width: 1.76rem /* 44/25 */;
    height: 1.76rem /* 44/25 */;
    display: block;
    position: absolute;
    left: 0;
    top: 1.2rem /* 30/25 */;
    margin-top: .2rem /* 5/25 */;
  }
  .right-el {
    position: absolute;
    right: 0;
    top: 40%;
    height: 1.04rem /* 26/25 */;
    width: auto;
  }
  .inviter {
    max-width: 9.28rem /* 232/25 */;
    text-align: right;
    font-size: 1.04rem /* 26/25 */;
    color: #adadad;
    height: auto;
    display: inline-block;
  }
  .serve_contact {
    font-size: 1.12rem /* 28/25 */;
    height: 100%;
    background: #ffffff;
    text-align: left;
    padding: 0;
    line-height: 4rem /* 100/25 */;
  }
  .user_name {
    position: absolute;
    font-size: 1.28rem /* 32/25 */;
    color: #ffffff;
    top: 4.6rem /* 115/25 */;
    left: 8.72rem /* 218/25 */;
  }
  .user_number {
    font-size: 1.44rem;
    color: #ffffff;
    margin-left: 1.6rem /* 40/25 */;
  }
  .quit {
    width: 9.6rem /* 240/25 */;
    height: 2.4rem /* 60/25 */;
    line-height: 2.4rem /* 60/25 */;
    text-align: center;
    font-size: 0.88rem /* 22/25 */;
    color: #ec650f;
    border-radius: 0.8rem /* 20/25 */;
    border: 1px solid #ec650f;
    margin: 0 auto;
    margin-top: 3.2rem /* 80/25 */;
  }
}
</style>