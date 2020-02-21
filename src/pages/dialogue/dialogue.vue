<template>
  <div id="dialogue">
    <tab-bar>
      <div slot="left" @click="back">
        <img src="@/assets/images/backLeft.svg">
      </div>
      <h2 slot='center'>在线客服</h2>
    </tab-bar>
    <div class="talkwindow">
      <div class="time">{{inTime}}</div>
      <template v-for="(item,index) in message_list">
        <div :class="item.type+'_text'" :key='index'>
          <img :src='item.img' />
          <p>{{item.message}}</p>
        </div>
      </template>
    </div>
    <div class="input">
      <input v-model="user_text" type="text" @keydown.enter="send_message" placeholder="请输入你想咨询的问题"/>
      <span v-on:click="send_message">发送</span>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/tab-bar/TabBar'
export default {
  components:{
    TabBar
  },
  data() {
    return {
      user_text: "",
      message_list: [
        {
          type: "serve",
          time: "2019-01-20  12:35:41",
          message: "你好，有什么可以帮助到你的吗？",
          img:"http://img2.imgtn.bdimg.com/it/u=1925088662,1336364220&fm=26&gp=0.jpg"
        },
        {
          type: "user",
          time: "2019-01-20  12:35:41",
          message: "我想咨询一下XXXX",
          img:"http://img2.imgtn.bdimg.com/it/u=1925088662,1336364220&fm=26&gp=0.jpg"
        }
      ]
    };
  },
  computed:{
    inTime(){
      return this.message_list[0].time
    }
  },
  methods: {
    send_message() {
      if(!this.user_text) return 
      this.message_list.push({type:"user",time:new Date(),message:this.user_text,img:"http://img5.imgtn.bdimg.com/it/u=2357702475,65854988&fm=26&gp=0.jpg"})
      this.user_text = ""
    },
    back(){
      this.$router.back()
    }
  }
};
</script>

<style lang="scss">
#dialogue {
  .tab-bar{
    background: #fff;
  }
  .time {
    font-size: 0.96rem /* 24/25 */;
    color: #999999;
    text-align: center;
    margin-top: 1.6rem /* 40/25 */;
  }
  .talkwindow{
    padding-bottom: 1rem;
    overflow: hidden;
  }
  .serve_text,
  .user_text {
    margin-top: 1.5rem;
    float: left;
    width: 100%;
    img {
      width: 3.12rem /* 78/25 */;
      height: 3.12rem /* 78/25 */;
      float: left;
      margin: 0 0.8rem /* 20/25 */;
    }
    p {
      margin-top: .05rem /* 26/25 */;
      max-width: 18.8rem /* 470/25 */;
      padding: 0.8rem /* 20/25 */;
      background: #ffffff;
      color: #111;
      font-size: 1.12rem /* 28/25 */;
      float: left;
      border-radius: 0.4rem /* 10/25 */;
      position: relative;
    }
  }
  .serve_text p::before{
    display: block;
    content: '';
    width: 0;
    height: 0;
    border: .4rem solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: -.8rem;
    top: 3%;
  }
  .user_text {
    float: right;
    img {
      float: right;
    }
    p {
      float: right;
    }
  }
  .user_text p::after{
    display: block;
    content: '';
    width: 0;
    height: 0;
    border: .4rem solid;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    right: -.8rem;
    top: 3%;
    }
  .input {
    border-top: 1px solid #adadad;
    position: fixed;
    bottom: 0;
    height: 4rem /* 100/25 */;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    z-index: 3;
    color: #333333;
    line-height: 3.76rem /* 94/25 */;
    font-size: 1.36rem /* 34/25 */;
    input {
      width: 23.92rem /* 598/25 */;
      height: 3.2rem /* 80/25 */;
      background: #fff;
      display: block;
      outline: none;
      border: none;
      border: 1px solid #adadad;
      float: left;
      border-radius: .72rem /* 18/25 */;
      font-size: 1.2rem /* 30/25 */;
      padding: 0 0.4rem /* 10/25 */;
      box-sizing: border-box;
      margin: .4rem /* 10/25 */ 0;
      margin-left: 1.2rem /* 30/25 */;
    }
    span{
      width: 4.5rem;
      text-align: center;
      display: inline-block;
    }
  }
}

</style>