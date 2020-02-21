<template>
  <div class="product_box">
    <!-- 循环体 -->
    <div v-for="item in productData" :key="item.id" class="product_box_list">
      <div class="product_box_list_value" v-on:click="link_url(item.outlink,item.title)">
        <img class="product_box_list_img" :src="item.logo" />
        <div class="product_box_list_text1">{{item.title}}</div>
        <div class="product_box_list_text2">{{item.keywords}}</div>
        <!-- <div class="product_box_list_text2">{{item.description}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
var baseUrl = window.baseUrl;
export default {
  data() {
    return {
      baseUrl: baseUrl
    };
  },
  props: {
    productData: Array,
    required: true
  },
  methods: {
    link_url(e,title) {
      var name = title||'惠普税银'
      location.href = e;
    }
  }
};
</script>
<style lang="scss">
/* 产品列表 */
.product_box {
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-around; */
  padding: 0.4rem /* 10/25 */;
  box-sizing: border-box;
  background: #fff;
}
/* 每一个块 */
.product_box_list {
  width: 9.2rem /* 230/25 */;
  height: 9.2rem /* 230/25 */;
  background: #fff;
  text-align: center;
  border-radius: 0.6rem /* 15/25 */;
  margin: 0.2rem /* 5/25 */;
}

/* 块的内容 */
.product_box_list_value {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.product_box_list_img {
  width: 3.6rem /* 90/25 */;
  height: 3.6rem /* 90/25 */;
  margin: 0 auto;
  margin-top: 0.88rem /* 22/25 */;
}
/* 块的文字 */
.product_box_list_text1 {
  font-size: 1.28rem /* 32/25 */;
  color: #555555;
  font-weight: bold;
  margin-top: 0.32rem /* 8/25 */;
  margin-bottom: 0.76rem /* 19/25 */;
}
.product_box_list_text2 {
  font-size: 0.96rem /* 24/25 */;
  color: #757575;
}
</style>