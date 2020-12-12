import { createStore } from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export default createStore({
    state: {
        cartList: []
    },
    mutations,
    actions,
    getters,
    modules: {}
})