<template>
  <keep-alive>
    <div id="home">
      <!-- swiper -->
      <swiper class="banner" v-if="bannerlist.length" :options="swiperOption">
        <swiper-slide v-for="item in bannerlist" :key="item.id">
          <img :src="baseUrl+item.pic" v-on:click="link_url(item.link,item.title)" />
        </swiper-slide>
      </swiper>

      <div class="bulletin">
        <div class="horn_icon_box">
          <img src="./images/horn.png" class="horn_icon" />
        </div>
        <div class="bulletin_box" v-if="bulletin_text.length" :style="test()">
          <p v-for="item in bulletin_text" :key="item.id">恭喜:{{item.company}}成功贷款{{item.fan_money}}</p>
          <p
            v-for="(item,keys) in bulletin_text"
            :key="keys+'s'"
          >恭喜:{{item.company}}成功贷款{{item.fan_money}}</p>
        </div>
      </div>
      <ptitle :title="'推荐产品'" :routerUrl="'/sort'"></ptitle>
      <!-- <promptbox :productData="product.tuijian"></promptbox> -->

      <div class="tuijian_box">
        <swiper v-if="product" :options="swiperproduct" style="padding:0.8rem  1rem;height:6.8rem ">
          <swiper-slide
            v-for="item in product.tuijian"
            style="width:auto ;margin-right:1rem"
            :key="item.id"
          >
            <div v-on:click="link_url(item.id,item.title)">
              <img class="tuijian_img" style="float:left" :src="item.logo" />
              <div class="tuijian_val" style="float:left ;margin-left: .8rem ">
                <p class="tuijian_title" style="margin-top:1.1rem;">{{item.title}}</p>
                <p class="tuijian_text">{{item.keywords}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <ptitle :title="'最新产品'" :routerUrl="'/sort'"></ptitle>
      <promptbox :productData="product.zuijin"></promptbox>
      <img src="" class="more_img">
    </div>
  </keep-alive>
</template>
<script>
import homejs from "./home.js";
import ptitle from "@/components/producttitle/producttitle"; //列表标题
import promptbox from "@/components/product/product"; //列表数据
var baseUrl = window.baseUrl;
export default {
  name: "home",

  components: { ptitle: ptitle, promptbox: promptbox },
  mixins: [homejs],
  data() {
    return {
      bannerlist: [],
      baseUrl: baseUrl,
      bulletin_text: "",
      product: {}
    };
  },
  async created() {
    this.axiosPro(this, "api/index/slide", "bannerlist", { type: "1" });
    this.axiosPro(this, "api/index/marquee", "bulletin_text");
    this.axiosPro(this, "api/index/index", "product");
  },
  methods: {
    test() {
      var height = this.bulletin_text.length;
      return `width:${height}00%;animation:mymove ${this.bulletin_text.length *
        2}s infinite;animation-timing-function:linear;`;
    },
    link_url(id, title) {
     this.$router.push({
       name:'loan_more',
       params:{
         title:title,
         id:id
       }
     })
    }
  }
};
</script>
<style lang="scss">
#home {
  padding-bottom: 0.8rem /* 20/25 */;
  .tuijian_box {
    overflow: hidden;
    position: relative;
    height: 6.8rem /* 170/25 */;
    margin-bottom: .4rem /* 10/25 */;
    background: #fff;
    // border-radius: 0.8rem /* 20/25 */;
    .swiper-slide {
      margin-right: 1.6rem /* 40/25 */;
      min-width: 5.2rem /* 130/25 */;
    }
  }
  .tuijian_position {
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    height: 6.8rem /* 170/25 */;
    align-items: center;
    padding: 0.8rem /* 20/25 */;
    position: absolute;
  }
  .tuijian_value + .tuijian_value {
    margin-left: 0.8rem /* 20/25 */;
  }
  .tuijian_title {
    font-size: 1.28rem /* 32/25 */;
    color: #555555;
    font-weight: 600;
    white-space: nowrap;
  }
  .tuijian_text {
    font-size: 0.96rem /* 24/25 */;
    color: #757575;
  }
  .tuijian_value {
    height: 5.2rem /* 130/25 */;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    min-width: 10.4rem /* 260/25 */;
  }
  .tuijian_img {
    margin: 0.8rem /* 20/25 */ 0;
    width: 3.6rem /* 90/25 */;
    height: 3.6rem /* 90/25 */;
  }
  .banner {
    margin: 0 auto;
    margin-top: 0.8rem /* 20/25 */;
    img {
      width: 25.4rem /* 635/25 */;
      height: 13rem /* 325/25 */;
      display: block;
      margin: 0 auto;
    }
  }
  // 公告
  .bulletin {
    height: 3.2rem /* 80/25 */;
    background: #fff;
    margin: 0 auto;
    line-height: 3.2rem /* 80/25 */;
    font-size: 0.96rem /* 24/25 */;
    color: #757575;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    margin-top: 0.6rem /* 15/25 */;
    margin-bottom: .4rem /* 10/25 */;
  }
  //   喇叭
  .horn_icon {
    font-size: 1.04rem /* 26/25 */;
    height: 1.28rem /* 32/25 */;
    width: 1.28rem /* 32/25 */;
    float: left;
    margin-top: 0.96rem /* 24/25 */;
    margin-left: 0.72rem /* 18/25 */;
    display: block;
    z-index: 9;
  }
  .bulletin_box {
    display: flex;
    position: absolute;
    justify-content: space-around;
    left: 0;
    @keyframes mymove {
      0% {
        left: 0%;
      }
      100% {
        left: -150%;
      }
    }
  }
  .horn_icon_box {
    width: 2.4rem /* 60/25 */;
    height: 3.2rem /* 80/25 */;
    position: absolute;
    background: #fff;
    z-index: 1;
  }
  .more_img{
    width: 100%;
    display: block;
    border: none;
  }
}
</style>