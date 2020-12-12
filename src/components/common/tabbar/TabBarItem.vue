<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
          <slot name="item-icon"></slot>
        </div>
      <div v-else>
          <slot name="item-icon-active"></slot>
        </div>
      <div :style="activeStyle">
          <slot name="item-text"></slot>
          </div>
      
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
      //console.log('itemClick')
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

<style scoped>
</style>