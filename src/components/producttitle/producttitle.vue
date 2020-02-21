<template>
  <div id="producttitle">
    <div class="product_title">
      {{title}}
      <div v-if="routerUrl" v-on:click="router_link" class="more" bindtap="onswitchTab">
        更多
        <img src="./images/right@3x.png" />
      </div>
    </div>
    <div class="product_title_u"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    routerUrl: {
      type: String
    }
  },
  methods: {
    router_link() {
      this.$router.replace({ path: this.routerUrl });
    }
  }
};
</script>
<style lang="scss">
/* module/title.wxss */
#producttitle {
  background: #ffffff;
  // padding-top: .4rem /* 10/25 */;
  .product_title {
    font-size: 1.44rem /* 36/25 */;
    color: #333333;
    padding-top: 1rem /* 25/25 */;
    font-weight: 600;
    margin-left: 0.8rem /* 20/25 */;
  }
  .product_title_u {
    width: 4.8rem /* 120/25 */;
    height: 0.16rem /* 4/25 */;
    background: #ec650f;
    border-radius: 0.08rem /* 2/25 */;
    margin-left: 0.8rem /* 20/25 */;
  }

  .more {
    font-size: 1.12rem /* 28/25 */;
    color: #666666;
    float: right;
    display: block;
    font-weight: 500;
  }
  .more img {
    width: 1.28rem /* 32/25 */;
    height: 1.28rem /* 32/25 */;
    float: right;
    margin-top: 0.2rem /* 5/25 */;
    margin-right: 0.48rem /* 12/25 */;
  }
}
</style>