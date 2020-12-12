<template>
    <div id="detail">
        <detail-nav-bar  class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" 
        ref="scroll" 
        @scroll="contentScroll" 
        :probe-type="3">
        <!-- //这个是用来测试点击加入购物车是否获取得到数据 -->
        <!-- <div>
            <ul>
                <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
            </ul>
        </div> -->
            <detail-swiper  :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-params-info :param-info="paramInfo"  ref="params"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>   
        <back-top  @click.native="backClick"  v-show="isShowBackTop"/> 
        <!-- <toast :message="message" :is-show="isShow"/> -->
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamsInfo from './childComps/DetailParamsInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';
import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import {debounce} from "components/common/utils";
import Toast from 'components/common/toast/Toast';

import {getDetail , Goods , Shop ,GoodsParam ,getRecommend} from "network/detail"
import {itemListenerMixin ,backTopMixin} from "common/mixin"
import {mapActions} from "vuex"



export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        Toast
            
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themmeTopY:[],
            getThemeYopY:null,
            currentIndex:0,
            message:'',
            isShow:false
        }
    },
    created(){
        //1.保存
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            //console.log(res)
            //中转
            const data = res.result
            //1.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages
            //console.log(data)
            
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //console.log(this.goods)

            //3.创建店铺信息对象
            this.shop = new Shop(data.shopInfo)
            //console.log(this.shop)

            //4.保存商品的详情数据
            this.detailInfo = data.detailInfo
            //console.log(this.detailInfo)

            //5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)
            //console.log(this.paramInfo)

            //6.取出评论的信息
            if(data.rate.cRate !==0){
                //console.log(this.commentInfo)
                this.commentInfo = data.rate.list[0]
            }

            //值不对，此时this.$refs.params.$el还没渲染，所以拿不到值
            // this.themmeTopY = []
            // this.themmeTopY.push(0);
            // this.themmeTopY.push(this.$refs.params.$el.offsetTop)
            // this.themmeTopY.push(this.$refs.comment.$el.offsetTop)
            // this.themmeTopY.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themmeTopY)
            
            // this.$nextTick(() =>{
            //     //此时根据最新的值DOM已经渲染完成，但是图片还没加载完成，所以此时的值不对没有重新计算高度
                    //offsetTop值不对的时候，都是图片的原因
            //     this.themmeTopY = []

            //     this.themmeTopY.push(0);
            //     this.themmeTopY.push(this.$refs.params.$el.offsetTop)
            //     this.themmeTopY.push(this.$refs.comment.$el.offsetTop)
            //     this.themmeTopY.push(this.$refs.recommend.$el.offsetTop)

            //     console.log(this.themmeTopY)
            // })
        }),
        //3.请求推荐数据
        getRecommend().then(res =>{
            //console.log(res)
            this.recommends =  res.data.list
        })
        //4.
        this.getThemeYopY = debounce(() =>{
            //每次初始化数组防止多次赋值
            this.themmeTopY = []
            this.themmeTopY.push(0);
            this.themmeTopY.push(this.$refs.params.$el.offsetTop)
            this.themmeTopY.push(this.$refs.comment.$el.offsetTop)
            this.themmeTopY.push(this.$refs.recommend.$el.offsetTop)
            //设置一个最大值，来排除循环溢出效果
            this.themmeTopY.push(Number.MAX_VALUE)
            console.log(this.themmeTopY)
        },50)
    },
    updated(){
            // this.themmeTopY = []

            // this.themmeTopY.push(0);
            // this.themmeTopY.push(this.$refs.params.$el.offsetTop)
            // this.themmeTopY.push(this.$refs.comment.$el.offsetTop)
            // this.themmeTopY.push(this.$refs.recommend.$el.offsetTop)

            // console.log(this.themmeTopY)
    },
    //混入防抖函数跟回到顶部函数
    mixins:[itemListenerMixin ,backTopMixin],   
    destoryed(){
        //取消全局事件监听
        this.$bus.off('itemImgLoad' , this.itemImgListener)
    },
    methods:{
        //使用对象张开运算符，将actions混入到methods的对象中
        ...mapActions(['addCart']),
        imageLoad(){
            //发送事件写法
            // this.$refs.scroll.refresh()
            //console.log('Detail-----------')
            //防抖函数写法
            this.refresh()
            //调用this.getThemeYopY()：使用防抖函数封装获取的位置信息防止多次调用
            this.getThemeYopY()

            
        },
        titleClick(index){
            //设置点击的时候响应到对应的位置
            this.$refs.scroll.scrollTo(0, -this.themmeTopY[index] , 100)
        },
        contentScroll(position){
            //设置滚动响应导航栏效果
            //1.获取Y值
            const positionY = -position.y

            //2.positionY和主题中值进行比较
            // [0, 7910 , 9120 , 9980 ,非常大的值]
            // positionY 在0 和 7910 之间，index =0
            // positionY 在7910 和 9120 之间，index =1
            // positionY 在9120 和 9980 之间，index =2
            // positionY 在9980 喝非常大的值之间，index =3
            //方法一
            // let length = this.themmeTopY.length
            // for(let i = 0 ; i<this.themmeTopY.length ; i++){
            //     if(this.currentIndex  !== i 
            //     && ((i < length -1 && positionY >= this.themmeTopY[i] && positionY < this.themmeTopY[i+1])
            //     || (i === length -1 && positionY >=this.themmeTopY[i]))){
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex
            //     }
            // }
            //方法二：简便做法
            let length = this.themmeTopY.length
            //length -1 因为最后的最大值是无用的用来防止循环溢出
            for(let i = 0 ; i < length -1 ; i++){
                if(this.currentIndex !==i && (positionY >= this.themmeTopY[i] && positionY < this.themmeTopY[i+1])){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            //3.是否回到顶部
            //  this.isShowBackTop = (-position.y) >= 1000
            //调用混入里面写好的判断是否回到顶部方法
            this.listenShowBackTop(position)
        },
        //点击加入购物车跳转到购物车
        addToCart(){
            //1.获取购物车需要的展示的信息
            //创建对象
            const product = {}
            //创建对象信息
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this. goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid 

            //2.将商品添加到购物车，添加到Store中
            //mutations使用commit方法
            //this.$store.commit('addCart', product)
            //actions使用dispatch方法
            //this.$store.dispatch('addCart' , product)
            this.addCart(product).then(res => {
                //console.log(res)
                //如果事件成功触发的话，将打印内容传给message并且isShow设置为显示
                // this.isShow = true
                // this.message = res     
                // setTimeout(() =>{
                //     //设置定时器，定时时间到了之后将Toast设置为隐藏属性并且message清空
                //     this.isShow = false
                //     this.message = ''
                // },1500)
                //自己写的Toast插件写法，但是vue3无法支持vue.extend所以报错没找到解决方法
                // this.$toast.show(res , 1500)

                //DKToast插件写法
                this.$toast(res,{
                    duration: 1000,
                    // Position not yet supported
                    styles: {
                        borderRadius: '25px',
                    },
                    // Any valid HTML, intended for icons
                    slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
                    slotRight: '<i class="fa fa-thumbs-up"></i>', // Add icon to right

                })
            })

            //actios会返回一个promise,调用then方法
            // this.$store.dispatch('addCart' , product).then(res => {
            //     console.log(res)
            // })
        }
        
    },
    mounted(){
        
    }
    
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        background: #fff;
        /* height: calc(100% - 93px); */
        height: calc(100% - 44px - 49px);
    }
</style>