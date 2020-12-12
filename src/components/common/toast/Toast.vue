<template>
  <div class="toast" v-show="isShow">
      <div >
            {{message}}
      </div>
     
  </div>
</template>

<script>
// import {defineComponent} from "vue"
export default {
    name:"Toast",
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // isShow:{
        //     type:Boolean,
        //     default:false
        // }
    },
    date(){
        return{
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message = '请设置默认值' , duration = 2000){
            this.message = message
            this.isShow = true

            setTimeout(() => {
                this.message = ''
                this.isShow = false
            },duration)
        }
    }

}
</script>

<style scoped>
.toast{
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    padding: 10px;
    font-size: 14px;
}

</style>