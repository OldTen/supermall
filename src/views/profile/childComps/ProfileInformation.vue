<template>
  <div class="information">
      <div class="column">
          <div class="text-color">{{isBalance}}
              <span class="fontsize">元</span>
        </div>
          <div>我的余额</div>
      </div>
      <div class="column">
          <div class="text-color">{{Discount}}
              <span class="fontsize">个</span>
          </div>   
          <div>我的优惠</div>
      </div>
      <div class="column">
          <div class="text-color">{{integral}}
              <span class="fontsize">分</span>
          </div>
          <div>我的积分</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"ProfileInformation",
    props:{
        balance:{
            type:Number,
            default:0.00
        },
        Discount:{
            type:Number,
            default:0
        },
        integral:{
            type:Number,
            default:0
        }
    },
    computed:{
        isBalance(){
            return this.balance.toFixed(2)
        }
    }
}
</script>

<style scoped>
.information{
    display: flex;
    justify-items: center;
    text-align: center;
    padding: 10px 0;
    font-size: 13px;
    border-bottom: 10px solid rgba(147, 149, 152,.1);
    color: black;
}
.information >.column:last-child {
 border-right:none;
}

.column{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px 0;
    border-right: 1px solid rgba(147, 149, 152,.1);
}
.text-color{
    color: sienna;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 5px;
}
.fontsize{
    font-size: 13px;
    color: black;
    font-weight: normal;
}
</style>