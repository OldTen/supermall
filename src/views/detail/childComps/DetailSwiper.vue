<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  components: { Swiper, SwiperItem },
    name:"DetailSwiper",
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
.detail-swiper .swiper-item img{
    width: 100%;
    height: 100%;
}
</style>