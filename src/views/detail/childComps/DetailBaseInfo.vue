<template>
<!--   v-if="Object.keys(goods).length !==0"   表示如果有数据才加载 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span class="discount"  v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon" alt="">
            <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
      
  </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {} 
            }
        }
    }
}
</script>

<style scoped>
.base-info{
    height: 220px;
    padding: 12px 5px;
    border-bottom: rgba(147, 149, 152,.3) 2px solid;
}
.info-title{
    font-size: 20px;   
    text-indent: 1em;
    color: #222;
    font-weight: 550;
}
.info-price{
   padding: 10px 0;
   position: relative;
}
.n-price{
 font-size: 26px;
   color: var(--color-high-text);
}
.o-price{
    /* 给价格加删除线 */
    text-decoration: line-through;
    padding-left: 5px;
    color:rgba(147, 149, 152,.8);
}
.discount{
    background-color: lightcoral;
    color: white;
    border-radius: 10px;
    padding: 3px;
    margin-left: 5px;
    font-size: 13px;
    /* 使用相对定位时元素浮动 */
    position: relative;
    top: -8px;

}
.info-other{
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 13px;
    color:rgba(147, 149, 152,.8);
    border-bottom: rgba(147, 149, 152,.3) solid 1px;
}
.info-service{
    display: flex;
    line-height: 35px;
    height: 35px;
    padding-top:12px ;
    justify-content: space-between;
}
.info-service-item{
    font-size: 14px;
}
.info-service-item img{
    width: 14px;
    height: 14px;
}
</style>