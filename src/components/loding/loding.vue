<template>
    <div id="loding">
        <div class="loding_box" :style="loding_type()">
    <img class="loding_img" src="./images/loding.png" />
</div>
  
    </div>
</template>


<script>
export default {
    methods: {
        loding_type(){
            if(this.$store.state.login_type){
                return 'display:block'
            }else{
                return 'display:none'
            }
        }
    },
}
</script>


<style lang="scss">
    #loding{
        .loding_box{
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, .1);
    z-index: 10;
    top: 0;
    left: 0;
}
.loding_img{
    width: 4rem /* 100/25 */;
    height: 4rem /* 100/25 */;
    margin-left: calc( 50% - 2rem /* 50/25 */ );
    margin-top: calc( 50vh - 2rem /* 50/25 */ );
    animation:loginkeyframes 2s;
    animation-iteration-count:infinite

}
@keyframes loginkeyframes{
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
}
    }
</style>