<template>
  <div class="goods-item" @click="itemClick">
      <img v-lazy="showImage" alt="" @load="imageLoad">
      
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"GoodsListItem",
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods:{
        imageLoad(){
            // 等待图片加载完再重新计算高度
            // 方法一
            // if(this.$route.path.indexOf('/hoome')){
            //     this.$bus.emit('homeItemImgLoad')
            // }else if( this.$route.path.indexOf('/detail')){
            //     this.$bus.emit('detailItemImgLoad')
            // }
            this.$bus.emit('imageLoad')
        },
        itemClick(){
            this.$router.push('/detail/' + this.goodsItem.iid)
            
        }
    }
}
</script>

<style>
.goods-item{
    position: relative;
    width: 48%;
    padding-bottom: 40px;
}
.goods-item img{
    width: 100%;
    border-radius: 5px;
}
.goods-info{
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color:var(--color-high-text);
    margin-right:20px
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>