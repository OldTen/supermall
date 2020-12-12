<template>
  <div class="flex-column">
      <div class="box1">
          <div class="boder-bottom">
              <img src="~assets/img/profile/message.svg" alt="">
              我的消息
          </div>
          <div class="boder-bottom">
              <img src="~assets/img/profile/pointer.svg" alt="">
              积分商城
          </div>
          <div class="boder-bottom"> 
              <img src="~assets/img/profile/vip.svg" alt="">
              会员卡
          </div>
      </div>
       <div class="box2">
           <div class="boder-bottom">
               <img src="~assets/img/profile/cart.svg" alt="">
               我的购物车
           </div>
           <div class="boder-bottom">
               <img src="~assets/img/profile/shopping.svg" alt="">
               下载购物APP
           </div>
       </div>
  </div>
</template>

<script>
export default {
    name:"ProflieList"
}
</script>

<style scoped>
.flex-column{
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.box1{
    border-bottom: 10px solid rgba(147, 149, 152,.1);
}
.boder-bottom{
    padding: 8px 10px;
    border-bottom: 2px solid rgba(147, 149, 152,.1);
}
.box1 .boder-bottom:last-child{
    border-bottom: none;
}
.boder-bottom img{
    vertical-align:bottom;
    width: 15px;
    height: 15px;
}
.box2 .boder-bottom:last-child{
    border-bottom: none;
}
</style>