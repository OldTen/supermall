<template>
  <!-- 轮播图 -->
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
//导入轮播图文件
import {Swiper , SwiperItem} from 'components/common/swiper'
export default {
    name:"HomeSwiper",
    components:{
  Swiper , 
  SwiperItem 
    },
    props:{
        banners:{
        type:Array,
        default(){
            return []
        }
        }
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods:{
      imageLoad(){
        if(! this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
        }
      }
    }
}
</script>

<style>

</style>