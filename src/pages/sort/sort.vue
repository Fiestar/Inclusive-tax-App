<template>
  <div id="sort">
    <div class="big_box" :style="sort_box">
      <div class="nav_box" :style="masklayer=='display:none'?'':'position:fi'">
        <div
          :class=" [navclickindex==0?'nav_value nav_tap':'nav_value']"
          data-index="0"
          data-id="1"
          data-name="descriptio"
          @click="navclick"
        >
          产品特点
          <image
            class="arrow_img"
            data-index="0"
            data-id="1"
            @click="navclick"
            data-name="descriptio"
            src="/pages/images/right@3x.png"
          />
        </div>

        <div
          :class=" [navclickindex==1?'nav_value nav_tap':'nav_value']"
          data-index="1"
          data-id="2"
          data-name="content"
          @click="navclick"
        >
          准入条件
          <image
            class="arrow_img"
            data-index="1"
            data-id="2"
            @click="navclick"
            data-name="content"
            src="/pages/images/right@3x.png"
          />
        </div>

        <div
          :class=" [navclickindex==2?'nav_value nav_tap':'nav_value']"
          data-index="2"
          data-id="3"
          @click="navclick"
          data-name="area"
        >
          受理区域
          <image
            class="arrow_img"
            data-index="2"
            data-id="3"
            @click="navclick"
            data-name="area"
            src="/pages/images/right@3x.png"
          />
        </div>
      </div>

      <!-- 遮罩层 -->
      <div class="masklayer" v-on:click.self="onTapmasklayer" :style="masklayer">
        <!-- 箭头 -->
        <div class="nav_arrow" :style="'left:'+nav_arrow+'rem'"></div>
        <!-- 文字内容 -->
        <div class="nav_option" v-on:click="bubble" data-tap="true">
          <div class="nav_text_box">
            <div
              v-for="(item,key) in nav_text "
              @click="onTapSelected"
              :class=" [item.type?'nav_text_select nav_text':'nav_text']"
              :data-sonid="item.sonid"
              :data-index="key"
              :key="key"
            >{{item.name}}</div>
          </div>
          <div class="nav_btn">
            <button @click="onTapReset">重置</button>
            <button @click="onTapSubmit">确定</button>
          </div>
        </div>
      </div>
    </div>

    <promptbox :productData="promptData"></promptbox>
  </div>
</template>
<script>
var body = document.body;
import promptbox from "@/components/product/product"; //列表数据
export default {
  name:'sort',
  components: {
    promptbox: promptbox
  },
  created() {
    this.axiosPro(this, "api/Category/Category", "promptData");
    this.axiosPro(this, "api/Category/category_a", "navlist");
  },
  data() {
    return {
      // 标题列表
      navlist: [],
      // 判断点击了哪一个
      navclickid: -1,
      navclickindex: -1,
      // 遮罩层
      masklayer: "display:none",
      // 箭头坐标
      nav_arrow: 5.5,
      // 背景颜色
      sort_box: "background:#F4F4F4",
      // 菜单子列表
      nav_text: [],
      // 菜单子列表选中项
      selected_list: [],
      search_name: "",
      // 列表数据
      lodingtype: "display:none",
      promptData: [], //列表数据
      body: body
    };
  },
  methods: {
    // 点击菜单
    navclick: function(e) {
      this.body.style = "max-height:100vh; overflow: hidden;";
      if (e.srcElement.dataset.index == this.navclickindex) {
        this.onTapmasklayer();
        return;
      }
      var name = e.srcElement.dataset.name;
      // 排序
      try{
var s = this.navlist[name].sort(function(a, b) {
        return a.name.length - b.name.length;
      });
      }catch(err){}
      this.search_name = name;
      this.navclickid = e.srcElement.dataset.id;
      this.navclickindex = e.srcElement.dataset.index;
      this.masklayer = "display:block";
      this.nav_arrow = 5.5 + e.srcElement.dataset.index * 9.5;
      this.sort_box = "background:rgba(0,0,0,.1);max-height:100vh;";
      this.nav_text = s;
    },
    // 点击遮罩层
    onTapmasklayer: function(e) {
      this.navclickindex = -1;
      this.navclickid = -1;
      this.selected_list = [];
      this.sort_box = "#F4F4F4";
      this.masklayer = "display:none";
      this.nav_text = [];
      this.body.style = "";
    },
    // 点击菜单子列表
    onTapSelected: function(e) {
      var index = e.currentTarget.dataset.index;
      var item = this.nav_text[index];
      item.type = !item.type;
      this.nav_text = this.nav_text;
    },

    // 阻止冒泡
    bubble: function() {},
    // 重置按钮
    onTapReset: function() {
      var item = this.nav_text;
      item.map((value, index) => {
        value.type = false;
      });
      this.nav_text = this.nav_text;
    },
    //提交按钮
    async onTapSubmit() {
      var arr = this.nav_text;
      var send_array = [];
      arr.map(value => {
        if (value.type) {
          send_array[send_array.length] = value.name;
        }
      });
      var name = this.search_name;
      var data = {
        [name]: send_array
      };
      await this.axiosPro(this, "/api/Category/Category", "promptData", data);
      this.onTapmasklayer();
    }
  }
};
</script>
<style lang="scss">
#sort {
  padding-bottom: .8rem /* 20/25 */;
  .big_box{
    margin-bottom: .4rem /* 10/25 */;
  }
  button {
    border: 1px solid #666666;
  }
  overflow: hidden;
  /* 菜单 */
  .nav_box {
    display: flex;
    padding: 0 0.8rem /* 20/25 */;
    position: relative;
  }
  /* 菜单子项 */
  .nav_value {
    border-radius: 10px;
    background: #ffffff;
    height: 3.2rem /* 80/25 */;
    width: 9.2rem /* 230/25 */;
    font-size: 1.12rem /* 28/25 */;
    line-height: 3.2rem /* 80/25 */;
    text-align: center;
    z-index: 2;
  }
  .nav_value + .nav_value {
    margin-left: 0.4rem /* 10/25 */;
  }
  .nav_tap {
    background: #ec650f;
    color: #ffffff;
  }

  /* 菜单详情 */
  .nav_option {
    z-index: 10;
    width: 28.4rem /* 710/25 */;
    background: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    margin: 0 0.8rem /* 20/25 */;
    margin-top: 0.4rem /* 10/25 */;
  }
  /*菜单列表内文字 */
  .nav_text_box {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    /* justify-content:space-between; */
    padding: 0 0.64rem /* 16/25 */;
    box-sizing: border-box;
    align-items: flex-start;
    padding-top: 1.6rem /* 40/25 */;
  }

  .nav_text {
    font-size: 1.36rem /* 34/25 */;
    color: #666666;
    margin: 0.64rem /* 16/25 */ 0.8rem /* 20/25 */;
    display: block;
    align-items: center;
    height: 1.84rem /* 46/25 */;
  }
  .nav_text_select {
    color: #ec650f;
  }

  /* 遮罩层 */
  .masklayer {
    display: none;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    position: fixed;
  }
  /* 详情箭头 */
  .nav_arrow {
    width: 0;
    height: 0;
    border: 0.4rem /* 10/25 */ solid;
    border-color: transparent transparent #ffffff transparent;
    position: absolute;
    top: -0.32rem /* 8/25 */;
    left: 5.2rem /* 130/25 */;
  }

  /* 按钮 */
  .nav_option button {
    color: #666666;
    width: 8rem /* 200/25 */;
    height: 2.4rem /* 60/25 */;
    line-height: 2.4rem /* 60/25 */;
    display: inline-block;
    font-size: 1.12rem /* 28/25 */;
    background: #ffffff;
    margin: 1.6rem /* 40/25 */ 0;
  }
  .nav_btn {
    display: flex;
    margin: 0 4.8rem /* 120/25 */;
    margin-top: 1.2rem /* 30/25 */;
    justify-content: space-between;
  }
  .arrow_img {
    width: 30px;
    height: 1.44rem /* 36/25 */;
    display: inline-block;
    transform: rotate(90deg);
    padding-left: 0.8rem /* 20/25 */;
  }
}
</style>