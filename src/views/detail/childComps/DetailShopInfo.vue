<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
          <div class="shop-middle-item shop-middle-left">
              <div class="info-sells">
                  <div class="sells-count">
                      {{sellCountComputed}}
                      <!-- {{shop.sells | sellCountFilter}} -->
                  </div>
                  <div class="sells-text">总销量</div>
              </div>
              <div class="info-goods">
                  <div class="goods-count">
                      {{shop.goodsCount}}
                  </div>
                  <div class="shop-text">全部宝贝</div>
              </div>
          </div>
          <div class="shop-middle-item shop-middle-right">
              <table>
                  <tr v-for="(item,index) in shop.score" :key="index">
                      <td>{{item.name}}</td>
                      <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
                      <td class="better" :class="{'better-more' : item.isBetter}"><span>{{item.isBetter ? '高' :'低'}}</span></td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        sellCountComputed(){
            return (this.shop.sells/10000).toFixed(1) + '万'
                }
        },
        //Vue3不在支持过滤器，建议用computed替换
    // filters: {
    //   sellCountFilter: function (value) {
    //     if (value < 10000) return value;
    //     return (value/10000).toFixed(1) + '万'
    //   }
    // }    
    
}
</script>

<style scoped>
.shop-info{
    position: relative;
    height: 200px;
    margin: 30px 5px 0;
    font-size: 16px;
    color: #222;
    border-bottom: rgba(147, 149, 152,.3) 2px solid;
}
.shop-top{
    position: relative;
}
.shop-top img{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(147, 149, 152,.3);
}
.shop-top .title{
    position: relative;
    top: -15px;
    left: 10px;
}
.shop-middle{
    display: flex;
    text-align: center;
    font-size: 13px;
}
.shop-middle-item{
    flex: 1;
    
}
.shop-middle-left{
    display: flex;
    border-right: 1px solid rgba(0, 0, 0, .1);
    justify-content: space-around;
    
}
/* .shop-middle-left::after{
    content: "";
    width: 1px;
    height: 40px;
    border-right: 1px solid rgba(147, 149, 152,.3);
    position: relative;
    left: 10%;
    top: 20%;
} */
.shop-middle-left .info-sells{
    margin:15px 15px;
}
.shop-middle-left .sells-count{
    font-size: 18px;
    padding-bottom: 10px;
}
.shop-middle-left .sells-text{
    
}
.shop-middle-left .info-goods{
    margin:15px 15px;
}
.shop-middle-left .goods-count{
    font-size: 18px;
    padding-bottom: 10px;
}
.shop-middle-left .shop-text{

}
.shop-middle-right{
    text-align: left;
    margin-top:-5px ;
}
.shop-middle-right table{
    width: 120px;
    margin-left: 25%;
}
.shop-middle-right .score{
    padding: 5px 8px;
    color: #5ea732;
}
.shop-middle-right .better span{
    background-color: #5ea732;
}
.shop-middle-right .score-better{
    color: #f13e3a;
}
.shop-middle-right .better-more span{
    background-color: #f13e3a;
}
.shop-bottom{
    text-align: center;
    width: 120px;
    margin: 15px auto;
}
.enter-shop{
    background-color:rgba(140, 165, 191, 0.2);
    border-radius: 12px;
    padding: 3px 0;
    color: silver;
}
</style>