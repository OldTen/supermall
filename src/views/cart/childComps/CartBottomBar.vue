<template>
  <div class="buttom-bar">
      <div class="button-contend">
          <check-button class="button-btn" :is-checked="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>
      <div class="total-price">
          总计:{{totalPrice}}
      </div>
      <div class="cart-right" @click="cartTotal">
          去计算:({{cartListLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from "vuex"

export default {
    name:"CartBottomBar",
    components: {
       CheckButton 
    },
   computed:{
       ...mapGetters(['cartList']),
       totalPrice(){
          return '￥' + this.cartList.filter(item => {
               return item.checked
           }).reduce((preVaule , item) => {
               return preVaule + item.price * item.count
           },0).toFixed(2)
       },
       cartListLength(){
           return this.cartList.filter(item => item.checked).length
       },
       isSelectAll(){
           //判断当没有选中任何商品的时候全选为未选中状态
           if(this.cartList.length === 0) return false

           //使用高阶函数filter做法:当获取到有商品被选中时取反
        //    return !(this.cartList.filter(item => !item.checked).length)

           //使用高阶函数find做法:当获取到有商品被选中时取反(效率比filter更高因为只要一找到有一个未选中就可)
           return !this.cartList.find(item => !item.checked)

           //普通遍历
        //    for(let item of this.cartList){
        //        if(item.checked){
        //            return false
        //        }
        //    }
        //    return true
       }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){ //全部选中
                this.cartList.forEach(item => item.checked = false )
            }else { //部分或全部不选中
                this.cartList.forEach(item => item.checked = true)
            }
        },
        cartTotal(){
            if(!this.isSelectAll){
                this.$toast('您尚未选中商品',{
                    duration:1000,
                    styles:{
                        borderRadius:'25px'
                    }
                })
            }
        }
    }

}
</script>

<style scoped>
.buttom-bar{
    position: relative;
    display: flex;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
}
.button-contend{
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 10px;
}
.button-btn{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price{
    flex: 1;
    margin-left: 20px;
}
.cart-right{
    width: 120px;
    background-color: crimson;
    height: 25px;
    line-height: 25px;
    margin-top: 7px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
}
</style>