<template>
    <scroll id="tab-menu">
        <div class="menu-list">
            <div v-for="(item,index) in categories" :key="index"
                class="menu-list-item"
                :class="{active:index === currentIndex}"
                @click="TabClick(index)">
                {{item.title}}
            </div>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:"CategoryTabMenu",
    components: { 
        Scroll 
    },
    props:{
        categories:{
            type:Array,
            default(){
               return []
            }
        }
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        TabClick(index){
            this.currentIndex = index
            this.$emit('selectItem' , index)
        }
    }
}
</script>

<style scoped>
#tab-menu{
    background-color: #f6f6f6;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
}
.menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    font-family: '微软雅黑';
}
.menu-list-item .active{
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
}
</style>