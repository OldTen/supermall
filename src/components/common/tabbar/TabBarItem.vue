<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
      
  </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        activeColor:{
            //类型
            type:String,
            //默认值
            default:'red'
        }
    },
    data(){
        return{
            //isActive:true
        }
    },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
      console.log('itemClick')
    }
  },
  computed:{
      isActive(){
          // /home -> item1(/home) = true
          // /home -> item1(/cart) = false
          // /home -> item1(/category) = false
          // /home -> item1(/profile) = false
          return this.$route.path.indexOf(this.path)  !== -1
      },
    activeStyle(){
        //如果this.isActive == true 执行color:this.activeColor  否则执行  {}
        return this.isActive ? {color:this.activeColor} : {}
    }
  }
}
</script>

<style>
#tab-bar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;  
    background: #f6f6f6;
    box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.2);
}
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    vertical-align: middle;
    margin-top: 2px;
}
.tab-bar-item img{
    width:24px ;
    height: 24px;
}
.color{
    color:red;
}
</style>