<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" 
                            :key="index" 
                            :item-info="item"
                            />
        </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
    name:"CartList",
    components: {
        Scroll,
        CartListItem 
    },
    computed:{
        //使用对象张开运算符将 getters 混入 computed 对象中（数组写法）
        ...mapGetters(['cartList'])
    },
    activated(){
        console.log('--------')
        this.$refs.scroll.refresh()
    }
    
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
   
}
.content{
     height: 100%;
    overflow: hidden;
}
</style>