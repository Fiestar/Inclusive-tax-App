<template>
    <div id='tab'>
        <div @click="$router.back()" v-show="backtype" class="backbox">
            <img src="./images/back.png" class="backimg">
        </div>
        <div  v-show="!backtype" class="backbox">
            <img src="./images/titlelogo.png" class="backimg">
        </div>
        {{this.$store.state.nav_title}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            title:'首页',
            backtype:false
        }
    },
    created() {
            this.backfun()
    },
    methods: {
        backfun(){
            if(this.$route.path == '/' || this.$route.path == '/sort' ||  this.$route.path == '/me' ){
                this.backtype = false;
            }else{
                this.backtype = true
            }
        }
    },
    watch: {
        '$route.path':function(newV,oldV){
            this.backfun()
        }
    },
}
</script>
<style lang="scss">
    #tab{
        position: fixed;
        top: 0;
        font-size: 1.28rem /* 32/25 */;
        box-sizing: border-box;
        background: #F4F4F4;
        width: 100%;
        height:3.52rem /* 88/25 */;
        border-bottom: 1px solid #DDDDDD;
        line-height: 3.52rem /* 88/25 */;   
        text-align: center;
        color: #333333;
        z-index: 3;
        .backimg{
            width: 1.68rem /* 42/25 */;
            display: block;

        }
        .backbox{
            position: absolute;
            left: 0;
            height: 3.52rem /* 88/25 */;
            display: flex;
            align-items: center;
            padding-left: .88rem /* 22/25 */;   
        }
    }
</style>