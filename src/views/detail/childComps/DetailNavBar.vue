<template>
  <nav-bar>
      <template v-slot:left>
          <div class="back" @click="backClick" >
            <img src="~assets/img/common/back.svg" alt="" >
          </div>
      </template>
      <template v-slot:center>
          <div class="title">
            <div v-for="(item,index) in titles" :key="index" 
            class="title-item" 
            @click="titleClick(index)" 
          :class="{active: index === currentIndex
          }"> 
                {{item}}
            </div>
          </div>
      </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"DetailNavBar",
  components: { NavBar },
  data(){
      return{
          titles:['商品' , '参数' , '评论' , '推荐'],
          currentIndex:0
      }
  },
  methods:{
      titleClick(index){
          //设置点击改变文字样式
          this.currentIndex = index
          this.$emit('titleClick', index)
      },
      backClick(){
          //点击返回首页之前点击的位置
          this.$router.back()
      }
  }

}
</script>

<style scoped>
.title{
    display:flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
    
}
.active{
    color:var(--color-high-text)
}
.back{
    padding-top:8px;
}
</style>