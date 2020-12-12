<template>
  <div class="cart">

    <!-- 导航组件 -->

    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div> 购物车({{length}})</div>
      </template>
    </nav-bar>

    <!-- 商品的列表 -->

    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from "vuex"


export default {
   name:"Cart",
   components: { 
      NavBar,
      CartList,
      CartBottomBar 
    },
   computed:{
    //两种语法
    // 一、使用对象张开运算符将 getters 混入 computed 对象中（数组写法）
    //  ...mapGetters(['cartLength' , 'cartList'])

    //二、将 ' this.length ' 映射为 ' this.$store.getters.cartLength '（对象写法）
    ...mapGetters({
      length : 'cartLength',
      list : 'cartList'
    })
   }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background: var(--color-tint);
  color: #fff;
}
</style>