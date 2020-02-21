<template>
  <div id="about_us">
    <tab-bar>
      <div slot="left" @click="back">
        <img src="@/assets/images/backLeft.svg">
      </div>
      <h2 slot='center'>关于我们</h2>
    </tab-bar>
    <div class="about_box">
        <div class="about_title" >
            {{about_text.title}}
        </div>
      <p class="about_text" v-html="about_text.protocol">{{}}</p>
    </div>
  </div>
</template>


<script>
import TabBar from '@/components/tab-bar/TabBar'
var baseUrl = window.baseUrl
export default {
    components:{
      TabBar
    },
    data() {
        return {
            baseUrl:'',
            about_text:{}
        }
    },
    async created() {
        this.baseUrl = baseUrl
        const res =  await this.axiosPro(this,'api/index/about_us','about_text')
        this.about_text = res
    },
    methods:{
      back(){
        this.$router.back()
      }
    }
};
</script>


<style lang="scss">
#about_us {
  .tab-bar{
    background: #fff;
  }
  .about_box {
    width: 100%;
    border-radius: .8rem /* 20/25 */;
    background: #f5f5f5;
    padding-top: .8rem /* 20/25 */;
    padding-bottom: 1.72rem /* 43/25 */;
  }
  .about_logo {
    width: 5.6rem /* 140/25 */;
    height: 5.2rem /* 130/25 */;
    display: block;
    margin: 0 auto;
  }
  .about_title {
    text-align: center;
    margin-top: 1rem /* 25/25 */;
    color: #555555;
    font-size: 1.32rem /* 33/25 */;
    font-weight: bold;
    padding-bottom: .68rem /* 17/25 */;
  }
  .about_text {
    font-size: 1.04rem /* 26/25 */;
    color: #666666;
    margin: 0 1.72rem /* 43/25 */;
    line-height: 1.84rem /* 46/25 */;
    letter-spacing: .08rem /* 2/25 */;
    width: 26.56rem /* 664/25 */;
    margin: 0 auto;
    display: block;
  }
}
</style>