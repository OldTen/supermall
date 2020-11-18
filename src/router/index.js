import { createRouter, createWebHashHistory } from 'vue-router'
const Cart = () =>
    import ("../views/cart/Cart")
const Category = () =>
    import ("../views/category/Category")
const Profile = () =>
    import ("../views/profile/Profile")
const Home = () =>
    import ("../views/home/Home")
const routes = [{
        path: '',
        redirect: '/cart'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    mode: 'history'
})

export default router