<template>
  <div>
      <goods-list v-for="(item,index) in categoryDetail" :key="index" :goods="item">
      </goods-list>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'
export default {
  components: { GoodsList },
    name:"CategoryMenu",
    props:{
        categoryDetail:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>