<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- 导航组件 -->
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"  class="tab-control" @tabClick="tabClick" ref="TopControl" v-show="isTabFixed"/>

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 小导航 -->
      <tab-control :titles="['流行','新款','精选']"   @tabClick="tabClick" ref="TabControl"/>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"  />
    </scroll>
    <back-top  @click.native="backClick"  v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop';
import Scroll from 'components/common/scroll/Scroll';

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

//Home的网络请求到home.js去获取
import {getHomeMultidata , getHomeGoods} from "network/home";
import {debounce} from "components/common/utils";
import {itemListenerMixin} from "common/mixin"


export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
    },
    name:"Home",
    data(){
      return{
        banners: [],
        recommends: [],
        goods:{
          'pop':{page :0, list:[]},
          'new':{page :0, list:[]},
          'sell':{page :0, list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        taboffsetTop:0,
        isTabFixed:false,
        offsetTop:0,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destoryed(){
      console.log('destoryed')
    },
    created(){
      //1.请求多个数据,调用函数
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell') 
    },
    activated(){
      //获取离开时的位置,并且刷新
      // console.log('activated')
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //设置返回到home时离开时的位置
      // console.log('deactivated')
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)

      //取消全局事件监听
      this.$bus.off('itemImgLoad' , this.itemImgListener)
    },
    //混入防抖函数,进行了首页跟详情页的分离
    mixins:[itemListenerMixin],
    mounted(){
    },
    methods:{
      
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
       getHomeGoods(type){
         const page = this.goods[type].page + 1
         getHomeGoods(type,page).then(res =>{
            //console.log(res)
            //往list里面添加数据
            this.goods[type].list.push(...res.data.list)
            //页码+1
            this.goods[type].page += 1
            //下拉加载更多
            /**
             * pullingUp: 监听的应该是，元素滚动过程中，被滚动的那个元素的底边与父级外框底边的距离，如果达到某个值，就执行其回调函数；
	           * finishPullUp: 这个类似控制一个开关，比如在触发pullingUp事件的时候，插件肯定会把一个开关给关掉，防止用户重复上拉
             * 在数据加载完成以后，需要执行finishPullUp()把开关打开，以便下次可以继续执行上拉刷新；
             * 
             */
             this.$refs.scroll.finishPullUp()
          })
       },
       /**
        * 事件监听相关事件
        */
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          //设置相同的index使得吸顶的时候tabControl获取同一个currentIndex
            this.$refs.TopControl.currentIndex = index  
            this.$refs.TabControl.currentIndex = index 
            // if( this.$refs.TopControl.currentIndex !==0){
            //   this.$refs.TopControl.currentIndex = index  
            //   this.$refs.TabControl.currentIndex = index 
            // }
        },
        backClick(){
          this.$refs.scroll.scrollTo(0,0,500)
        },
        contentScroll(position){
          //1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) >= 1000
          //2.决定tabControl是否吸顶（position：fixed）
          this.isTabFixed = (-position.y) > this.taboffsetTop
        },
        loadMore(){
          //监听加载数据
          this.getHomeGoods(this.currentType)
          //console.log('加载数据')
          //重新计算可滚动区域
          //refresh：其实就是重新计算一下内容的高度和宽度，也许也会计算外框的高度和宽度，因为dom结构发生了变化了，所以宽高要从新计算
          //this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad(){
          //2.获取tabControl的offsetTop
         //console.log(this.$refs.TabControl2.$el.offsetTop)
         this.taboffsetTop = this.$refs.TabControl.$el.offsetTop;
        }
    }
}

</script>

<style scoped>
#home{
  position: relative;
  /* padding-top:44px; */
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */

}
.tab-control{
  /* position: sticky; */
  position: relative;
  z-index: 9;
  /* top: 44px; */
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>