<template>
  <!-- ref/children都是绑定到子组件里 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BSscroll from "better-scroll"
export default {
    name:"Scroll",
    data(){
        return{
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        //1.创建BSscroll对象
        this.scroll = new BSscroll(this.$refs.wrapper,{
            click:true,
            probeType : this.probeType,
            pullUpLoad : this.pullUpLoad
        })
        // 2.监听滚动的位置
        if(this.probeType === 2 || this.probeType ===3){
            this.scroll.on('scroll', (position) => {
                // console.log(position);
                this.$emit('scroll',position)
            })
      }
        //scrollTo()方法:可以设施返回的坐标，还有毫秒数
        //this.scroll.scrollTo(0,0)
        //3.监听上拉加载
        if(this.finishPullUp){
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
                this.scroll.refresh()
            })
        }
    },
    methods:{
        scrollTo(x,y,time=300){
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
          this.scroll &&   this.scroll.finishPullUp()
        },
        refresh(){
            //console.log('--------------')
          this.scroll && this.scroll.refresh()
        },
        getScrollY(){
           return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>