<template>
  <div class="contend" v-if="Object.keys(subcategories).length !== 0">
      <div class="item" v-for="(item,index) in subcategories.list" :key="index">
          <a :href="item.link">
              <img class="item-img" :src="item.image" alt="" @load="imgLoad">
              <div class="item-text">{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"CategoryTabContent",
    props:{
        subcategories:{
            type:Object,
            default(){
              return  {}
            }
        }
    },
    methods:{
        imgLoad(){
            this.$bus.emit('itemImgLoad')
        }
    }
}
</script>

<style scoped>
.contend{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.item {
    width: 50%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0;
  }
  .item-img {
    width: 60%;
  }
  .item-text {
    margin-top: 5px;
  }

</style>