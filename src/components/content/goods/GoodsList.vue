<template>
    <div class="goods">
        <goods-list-item v-for="(item,index) in goods" :key="index"
        :goods-item="item" />
        
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
    name:"GoodsList",
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.goods{
    display: flex;
    /* justify-content: space-around; */
    justify-content: space-evenly;
    flex-wrap: wrap;
}
</style>