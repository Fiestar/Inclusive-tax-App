<template>
  <div id="loan">
    <tab-bar>
      <div slot="left" @click="back">
        <img src="@/assets/images/backLeft.svg">
      </div>
      <h2 slot='center'>我的贷款</h2>
    </tab-bar>
    <div class="loan_block"  v-on:click="loan_link(item.id)" v-for="item in loan_list" :data-id='item.id' :key="item.id">
      <div class="time">{{item.create_time}}</div>
      <img class="loan_image" :src="item.logo" />

      <div class="loan_title">{{item.products_name}}</div>
      <div class="loan_type">
        状态：
        <div class="loan_text" selectable="false" space="false" decode="false">{{item.status}}</div>
        <img class="login_more" src="./images/right@3x.png" />
      </div>
    </div>
  </div>
</template>


<script>
var baseUrl = window.baseUrl;
import TabBar from '@/components/tab-bar/TabBar'
export default {
  components:{
    TabBar
  },
  data() {
    return {
      loan_list: [],
      baseUrl:baseUrl
    };
  },
  methods: {
    loan_link(id){
      this.$router.push({
        name:'loan_detail',
        params:{
          id:id
        }
      })
    },
    back(){
      this.$router.back()
    }
  },
  created() {
    var loding_type = localStorage.getItem("loding_type");
    loding_type = JSON.parse(loding_type);
      if (!loding_type) {
        this.$router.replace('/login')
        return
      }
    this.axiosPro(this, "api/My/user_loan", "loan_list", {
      id: loding_type.id
    });
  }
};
</script>


<style lang="scss">
#loan {
  .loan_block {
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.8rem /* 20/25 */;
    background: #ffffff;
    height: 8.36rem /* 209/25 */;
  }
  .time {
    height: 28.4rem /* 710/25 */;
    border-bottom: 0.08rem /* 2/25 */ solid #f0f0f0;
    border-radius: 0.08rem /* 2/25 */;
    height: 2.24rem /* 56/25 */;
    margin: 0 0.8rem /* 20/25 */;
    padding: 0 0.8rem /* 20/25 */;
    color: #757575;
    font-size: 0.8rem /* 20/25 */;
    line-height: 2.24rem /* 56/25 */;
  }
  .loan_image {
    width: 3.6rem /* 90/25 */;
    height: 3.6rem /* 90/25 */;
    margin-left: 1.12rem /* 28/25 */;
    margin-top: 1.2rem /* 30/25 */;
    float: left;
    display: block;
  }
  .loan_title {
    float: left;
    font-size: 1.36rem /* 34/25 */;
    color: #333333;
    font-weight: 500;
    margin-top: 2.08rem /* 52/25 */;
    margin-left: 1.6rem /* 40/25 */;
  }
  .loan_type {
    float: right;
    font-size: 1.2rem /* 30/25 */;
    margin-top: 2.24rem /* 56/25 */;
    font-size: 1.2rem /* 30/25 */;
    color: #555555;
    box-sizing: border-box;
    padding-right: 2.6rem /* 65/25 */;
    position: relative;
  }
  .loan_text {
    float: right;
    color: #ed6c1c;
    display: block;
  }
  .login_more {
    width: 1.36rem /* 34/25 */;
    height: 1.36rem /* 34/25 */;
    display: block;
    position: absolute;
    right: 0.88rem /* 22/25 */;
    bottom: 0rem /* 0/25 */;
  }
  .loan_block + .loan_block {
    margin-top: 0.8rem /* 20/25 */;
  }
}
</style>