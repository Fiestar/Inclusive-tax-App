<template>
  <div id="loan_more">
    <div class="header">
      <img class="logo" :src="box.logo" />
      <div class="title">{{box.productName}}</div>
      <div class="text" v-html="box.introduction"></div>
    </div>
    <div class="box">
      <ptitle :title="'产品特点'"></ptitle>
      <div class="text detail" v-html="box.product_trait"></div>
    </div>
    <div class="box">
      <ptitle :title="'准入条件'"></ptitle>
      <div class="text detail" v-html="box.where"></div>
    </div>
    <div class="box">
      <ptitle :title="'受理区域'"></ptitle>
      <div class="text detail" v-html="box.flows"></div>
    </div>
    <button class="application"></button>
  </div>
</template>

<script>
import ptitle from "@/components/producttitle/producttitle"; //列表标题
export default {
  name: "loan_more",
  components: { ptitle: ptitle },
  created() {
    var id = this.$route.params.id;
    console.log(this.$route);
    var name = this.$route.params.title;
    let data = this.axiosPro(this, "/api/loan/info", "box", { id: id });
  },
  data() {
    return {
      box: ""
    };
  }
};
</script>

<style lang="scss">
#loan_more {
  .logo {
    margin: 0 auto;
    padding-top: 1.68rem /* 42/25 */;
    display: block;
  }
  .title {
    font-size: 1.44rem /* 36/25 */;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.8rem /* 20/25 */;
  }
  .header {
    text-align: center;
    padding: 0 1.6rem /* 40/25 */;
    padding-bottom: 1.84rem /* 46/25 */;
    background: #ffffff;
  }
  .text {
    font-size: 0.96rem /* 24/25 */;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 1.44rem /* 36/25 */;
  }
  .box {
    background: #ffffff;
    margin-top: 0.4rem /* 10/25 */;
    padding-top: 0.4rem; /* 10/25 */
  }
  .detail {
    padding: 0.68rem /* 17/25 */ 2.24rem /* 56/25 */ 1.68rem /* 42/25 */ 1.64rem
      /* 41/25 */;
  }
  .application {
    width: 28.4rem /* 710/25 */;
    height: 3.2rem /* 80/25 */;
    background: rgba(236, 101, 15, 1);
    border-radius: 0.8rem /* 20/25 */;
    margin: 0 auto
  }
}
</style>