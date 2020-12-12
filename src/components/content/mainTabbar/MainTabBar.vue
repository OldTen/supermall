<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">  
  <tab-bar>
      <!--vue3里具名插槽需要使用<template v-slot:xxx></template>来使用-->
      <tab-bar-item path="/home" activeColor="red">
            <template v-slot:item-icon>
                <img  src="@/assets/img/tabbar/home.svg" alt="">
            </template>   
            <template  v-slot:item-icon-active>
                <img  src="@/assets/img/tabbar/home_active.svg" alt="">
            </template>  
            <template v-slot:item-text>
                <div >首页</div>
            </template>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
            <template v-slot:item-icon>
                <img  src="@/assets/img/tabbar/category.svg" alt="">     
            </template>   
            <template  v-slot:item-icon-active>
                <img  src="@/assets/img/tabbar/category_active.svg" alt="">
            </template>  
            <template v-slot:item-text>
                <div >分类</div>
            </template>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
            <template v-slot:item-icon>
                <img src="@/assets/img/tabbar/shopcart.svg" alt="">     
            </template>   
            <template  v-slot:item-icon-active>
                <img  src="@/assets/img/tabbar/shopcart_active.svg" alt="">
            </template>  
            <template v-slot:item-text>
                <div >购物车</div>
            </template>
      </tab-bar-item>  
        <tab-bar-item path="/profile" activeColor="red">
            <template v-slot:item-icon>
                <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="">    
            </template>   
            <template  v-slot:item-icon-active>
                <img  src="@/assets/img/tabbar/profile_active.svg" alt="">
            </template>  
            <template v-slot:item-text>
                <div >我的</div>
            </template>
      </tab-bar-item> 

    </tab-bar>
</template>

          
          
          
          
          
<script>
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue'
// const TabBar = ()=> import ('@/components/common/tabbar/TabBar')
// const TabBarItem = ()=> import ('@/components/common/tabbar/TabBarItem')
export default {
    name:"MainTabBar",
    components:{
        TabBar,
      TabBarItem,
    }
}
</script>

<style>

</style>