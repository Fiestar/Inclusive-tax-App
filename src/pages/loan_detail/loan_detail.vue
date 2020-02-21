<template>
  <div id="loan_detail">
    <div class="loan_block">
      <div class="loan_value">
        <div class="loan_value_text">
          申请时间
          <div class="loan_right_text">{{loan_list.create_time}}</div>
        </div>
        <div class="loan_value_text">
          银行
          <div class="loan_right_text">{{loan_list.bank_name}}</div>
        </div>
        <div class="loan_value_text">
          产品名称
          <div class="loan_right_text">{{loan_list.products_name}}</div>
        </div>
        <div class="loan_value_text">
          纳税人名称
          <div class="loan_right_text">{{loan_list.legal_person}}</div>
        </div>
        <div class="loan_value_text">
          贷款联系人
          <div class="loan_right_text">{{loan_list.name}}</div>
        </div>
        <div class="loan_value_text">
          贷款人手机
          <div class="loan_right_text">{{loan_list.phone}}</div>
        </div>
        <div class="loan_value_text">
          状态
          <div style="color:#EC650F" class="loan_right_text">{{loan_list.status}}</div>
        </div>
        <div class="loan_value_text">
          授信金额
          <div class="loan_right_text">{{loan_list.xin_money}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loan_list: ""
    };
  },
  created() {
    var id = this.$route.params.id;
    this.axiosPro(this, "api/My/info", "loan_list", { id: id });
  }
};
</script>


<style lang="scss">
#loan_detail {
  .loan_block {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: .8rem /* 20/25 */;
    padding: 1.6rem /* 40/25 */ .8rem /* 20/25 */;
  }
  .loan_value {
    width: 100%;
    border-radius: .8rem /* 20/25 */;
    border: .08rem /* 2/25 */ solid #f0f0f0;
  }
  .loan_value_text {
    height: 3.2rem /* 80/25 */;
    box-sizing: border-box;
    line-height: 3.2rem /* 80/25 */;
    padding: 0 .8rem /* 20/25 */;
    color: #999999;
    font-size: 1.04rem /* 26/25 */;
  }
  .loan_value_text + .loan_value_text {
    border-top: .08rem /* 2/25 */ solid #f0f0f0;
  }
  .loan_right_text {
    float: right;
    color: #333333;
  }
}
</style>