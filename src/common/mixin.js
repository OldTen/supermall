import { debounce } from "components/common/utils";
import BackTop from 'components/content/backTop/BackTop';
export const itemListenerMixin = {
        date() {
            return {
                itemImgListener: null,
                refresh: null
            }
        },
        mounted() {
            //      //1.图片加载完成的事件监听
            //   //设置refresh接收debounce函数
            //   let refresh = debounce(this.$refs.scroll.refresh,50)

            //   // 3.监听item中图片加载完成
            //   this.$bus.on('imageLoad',() => {
            //     //console.log('图片加载完成')
            //     this.$refs.scroll.refresh()
            //     //调用
            //     refresh()
            //   })
            this.refresh = debounce(this.$refs.scroll.refresh, 50)
            this.itemImgListener = () => {
                this.refresh()
            }
            this.$bus.on('itemImgLoad', this.itemImgListener)
                //console.log('我是混入的内容')
        }
    }
    //回到顶部，BackTop的操作
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            //设置滚动位置和事件
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        listenShowBackTop(position) {
            //判断什么时候显示滚动按钮操作
            this.isShowBackTop = (-position.y) >= 800
        }
    }
}
export const tabControlMixin = {
    data: function() {
        return {
            currentType: 'POP'
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            console.log(this.currentType);
        }
    }
}