<template>
    <div id="errorbox" :style="errorstyle">
        {{this.$store.state.error_message}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            errorstyle:'opacity:0;z-index: -1;'
        }
    },
    computed: {
        error_message(){
            return this.$store.state.error_message
        }
    },
    watch: {
        error_message(newV,oldV){
                var than = this
            if(newV){
                this.errorstyle = 'opacity:1;z-index: 9;top:6rem;'
                setTimeout(function(){
                than.errorstyle = 'opacity:0;z-index:0 ;top:0;'
          than.$Vuex('acsetData',{name:'error_message',val:''})
                },3000)
            }
        }
    },
}
</script>

<style lang="scss">
    #errorbox{
    position: fixed;
    top: 0rpx;
    width: 70%;
    text-align: center;
    padding: .4rem /* 10/25 */;
    background: rgb(245, 108, 108);
    border-radius: .8rem /* 20/25 */;
    left: 15%;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 1.28rem /* 32/25 */;
    opacity: 0;
    // z-index: 9;
    transition: all .8s;
    top: 0;
    word-wrap:break-word; 
    min-height: 2.68rem ;
}
</style>