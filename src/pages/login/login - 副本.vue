<template>
  <div id="login">
    <div class="login_">
      <img class="login_logo" src="./images/logo@2x.png" />
      <div class="number">手机号码</div>
      <input
        v-model="phoone_number"
        v-on:input="phone_change()"
        class="input_number"
        maxlength="11"
        type="text"
        placeholder="请输入贷款人手机号码"
        :style="number_tips?'border:1px solid #EC650F':''"
      />
      <div :style="number_tips?'display:block':''" class="tips">请输入正确的手机号码</div>
      <div class="number" style="margin-top:39rpx">
        手机验证码
        <div class="get_code" v-on:click="get_keycode">{{this.$store.state.code_message}}</div>
      </div>
      <input
        class="input_number"
        v-model="codenumber"
        maxlength="6"
        type="text"
        placeholder="请输入验证码"
        v-on:input="codefun"
      />
      <div
        :style="codenumber.length<6&&codenumber.length>0?'display:block':''"
        class="tips"
      >请输入6位验证码</div>
      <button class="login_btn" v-on:click="onLoginBtn">立即登陆</button>
    </div>

    <div class="popUps" :style="warn_box">
      <div class="ups_box">
        <img src="./images/quit.png" v-if="warn_show" v-on:click="warn_fun()" class="login_err" />
        <div class="login_type">{{login_type}}</div>
        <div class="login_text">{{login_text}}</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created() {
    var data = {
      name: "nav_title",
      val: "登陆"
    };
    this.$Vuex("acsetData", data);
  },
  data() {
    return {
      phoone_number: "",
      number_tips: false,
      codenumber: "",
      warn_box: "",
      login_type: "",
      login_text: "",
      warn_show: false
    };
  },
  methods: {
    //手机号验证
    phone_change() {
      this.phoone_number = this.phoone_number.replace(/\D/g, "");
      this.phoneRegular();
    },
    phoneRegular() {
      if (!/^1[345678]\d{9}$/.test(this.phoone_number)) {
        this.number_tips = true;
      } else {
        this.number_tips = false;
      }
      if (!this.phoone_number) {
        this.number_tips = false;
      }
    },
    warn_fun() {
      this.warn_box = "display:none";
    },

    // 获取验证码
    get_keycode() {
      if (this.$store.state.code_time > 0) return;
      if (/^1[345678]\d{9}$/.test(this.phoone_number) && this.phoone_number) {
        this.$store.dispatch("acsetTime");
        var data = {
          phone: this.phoone_number
        };
        this.axiosPro(this, "api/login/sendMessage", false, data);
      } else {
        this.number_tips = true;
      }
    },
    // 登陆按钮
    async onLoginBtn() {
      if (
        this.codenumber.length == 6 &&
        this.number_tips == false &&
        this.phoone_number.length == 11
      ) {
        var data = {
          phone: this.phoone_number,
          code: this.codenumber
        };
        var s;
        this.$Vuex("acsetData", { name: "login_type", val: true });
        var than = this;
        s = await new Promise(function(resolve) {
          than.$axios.post("api/login/login", { ...data }).then(value => {
            resolve(value);
          });
        });
        this.warn_box = 'display:block'
        if (s.data.code == 1) {
          var loding = {
            id: s.data.data.id,
            phone: this.phoone_number,
            parent_id: s.data.data.parent_id
          };
          loding = JSON.stringify(loding);
          localStorage.setItem("loding_type", loding);
          this.login_type = "登陆成功";
          this.login_text = "登录成功,正在跳转到我的页面。";
          this.warn_show = false;
          setTimeout(() => {
            than.$router.replace('/me')
          }, 1000);
        } else {
          this.login_type = "登陆失败";
          this.login_text = s.data.msg;
          this.warn_show = true;
        }
        than.$Vuex("acsetData", { name: "login_type", val: false });
      }
    },
    // 验证码
    codefun() {
      this.codenumber = this.codenumber.replace(/[^\d]/g, "");
    }
  }
};
</script>


<style lang="scss">
#login {
  input {
    font-size: 1.2rem /* 30/25 */;
    color: #999999;
  }
  .login_ {
    width: 100%;
    border-radius: 20rpx;
    background: #ffffff;
    padding: 2.4rem /* 60/25 */ 0;
    border-radius: 0.8rem /* 20/25 */;
  }
  .login_logo {
    display: block;
    width: 15.32rem /* 383/25 */;
    height: 1.96rem /* 49/25 */;
    margin-left: 1.6rem /* 40/25 */;
  }
  .number {
    margin-left: 1.6rem /* 40/25 */;
    margin-top: 2.76rem /* 69/25 */;
    font-size: 1.36rem /* 34/25 */;
    color: #555555;
    position: relative;
  }
  .input_number {
    border-bottom: 0.08rem /* 2/25 */ solid #f0f0f0;
    border-radius: 1px;
    width: 27.6rem /* 690/25 */;
    margin: 0 auto;
    display: block;
    margin-top: 0.6rem /* 15/25 */;
    height: 3.04rem /* 76/25 */;
    line-height: 2.32rem /* 58/25 */;
    padding-left: 0.44rem /* 11/25 */;
  }
  .input_place {
    color: #999999;
    font-size: 1.16rem /* 29/25 */;
    line-height: 2.32rem /* 58/25 */;
    width: 27.6rem /* 690/25 */;
  }
  .get_code {
    position: absolute;
    font-size: 1.12rem /* 28/25 */;
    color: #ec650f;
    right: 2.16rem /* 54/25 */;
    top: 3.2rem /* 80/25 */;
    z-index: 3;
  }
  .login_btn {
    width: 28.4rem /* 710/25 */;
    height: 3.52rem /* 88/25 */;
    color: #ffffff;
    font-size: 1.36rem /* 34/25 */;
    background: #ec650f;
    box-sizing: border-box;
    margin-top: 3.2rem /* 80/25 */;
  }
  .popUps {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    top: 0;
    z-index: 4;
  }
  .ups_box {
    width: 19.2rem /* 480/25 */;
    height: 9.92rem /* 248/25 */;
    border-radius: 0.8rem /* 20/25 */;
    background: #ffffff;
    position: absolute;
    top: 11.8rem /* 295/25 */;
    left: 5.4rem /* 135/25 */;
    text-align: center;
  }
  .login_type {
    color: #ec650f;
    font-size: 1.24rem /* 31/25 */;
    margin-top: 2.36rem /* 59/25 */;
    font-weight: 600;
  }
  .login_text {
    width: 10.8rem /* 270/25 */;
    color: #666666;
    margin: 0 auto;
    margin-top: 1.48rem /* 37/25 */;
    font-size: 1.12rem /* 28/25 */;
  }
  .login_err {
    position: absolute;
    width: 1.28rem /* 32/25 */;
    height: 1.28rem /* 32/25 */;
    top: 0.68rem /* 17/25 */;
    right: 0.68rem /* 17/25 */;
  }
  .tips {
    position: absolute;
    font-size: 1.12rem /* 28/25 */;
    color: #ec650f;
    left: 1.2rem /* 30/25 */;
    display: none;
  }
}
</style>