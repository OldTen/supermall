<template>
    <div class="category">
        <category-nav-bar/>
        <div class="content">
             <category-tab-menu :categories="categories" @selectItem="selectItem"/>
             <scroll id="tab-content"  ref="scroll" :probe-type="3" @scroll="listenShowBackTop">

                     <category-tab-content :subcategories="showSubcategory" :data="[categoryData]"/>
                     <tab-control :titles="['综合', '新品', '销量']"
                     @itemClick="tabClick"/>
                     <!-- <category-menu-item :category-detail="showCategoryDetail"/> -->
                     <goods-list :goods="showGoods"/>

             </scroll>
             <back-top @click.native="backClick"  v-show="isShowBackTop"/>
        </div>
    </div>
</template>

<script>
import {getCategory , getSubcategory, getCategoryDetail} from 'network/category'

import CategoryTabMenu from './childComps/CategoryTabMenu'
import CategoryNavBar from './childComps/CategoryNavBar'
import Scroll from 'components/common/scroll/Scroll'
import CategoryTabContent from './childComps/CategoryTabContent'
import TabControl from 'components/content/tabControl/TabControl'
import BackTop from 'components/content/backTop/BackTop'

import {POP, SELL, NEW} from "common/const";
import {tabControlMixin , backTopMixin , itemListenerMixin} from "common/mixin";
import CategoryMenuItem from './childComps/CategoryMenuItem.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


export default {
    name:"Category",
    components: { 
        CategoryNavBar,
        CategoryTabMenu,
        CategoryTabContent,
        Scroll,
        TabControl,
        CategoryMenuItem,
        GoodsList

    },
    mixins: [tabControlMixin , backTopMixin , itemListenerMixin],
    data(){
        return{
            categories:[],
            categoryData:[],
            currentIndex:-1,
            showGoods:[]
        }
    },
    created() {
		// 1.请求分类数据
      this._getCategory()
    },
    computed:{
        showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
        //网络请求事件
        _getCategory() {
		    getCategory().then(res => {
          console.log(res)
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类商品的数据作为默认显示
          this._getSubcategories(0)
        })
        
      },
      //获取分类商品的数据
      _getSubcategories(index) {
        this.currentIndex = index;
		    const maitKey = this.categories[index].maitKey;
        getSubcategory(maitKey).then(res => {
          console.log(res)
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          //tabContend选项栏的数据请求有问题
          // this._getCategoryDetail(POP)
          // this._getCategoryDetail(SELL)
          // this._getCategoryDetail(NEW)
        })
      },
      //该方法现在请求不到数据
      // _getCategoryDetail(type) {
		  //   // 1.获取请求的miniWallkey
      //   const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //   // 2.发送请求,传入miniWallkey和type
		  //   getCategoryDetail(miniWallkey, type).then(res => {
      //     // 3.将获取的数据保存下来
      //     console.log(res)
		  //     this.categoryData[this.currentIndex].categoryDetail[type] = res
      //     this.categoryData = {...this.categoryData}
      //   })
      // },
        //事件点击事件
        selectItem(index){
          this._getSubcategories(index)
        }
    }
    
    
}
</script>

<style scoped>
.category{
    position: relative;
    height: 100vh;
    /* overflow: hidden; */
}
.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
    height: calc(100% - 44px - 49px);
  }
   #tab-content {
    
    flex: 3;
  }
</style>