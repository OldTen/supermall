export default {
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的事情比较单一一点
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        //设置购物车商品默认选中
        payload.checked = true
        state.cartList.push(payload)
    }
}