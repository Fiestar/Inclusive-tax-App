<template>
    <div class='tab-bar'>
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.tab-bar{
    display: flex;
    text-align: center;
}
.tab-bar .left img{
    width: 1.72rem;
    height: 1.88rem /* 32/25 */;
    display: inline-block;
    margin: .7rem;
}
.tab-bar h2{
    font-size: 1.44rem /* 36/25 */;
    font-weight: 400;
    line-height: 3.52rem /* 88/25 */;
}
.tab-bar div.center{
    flex: 1;
}
.tab-bar div.left,div.right{
    width: 20%;
}
</style>

