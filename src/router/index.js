import { createRouter, createWebHistory } from 'vue-router'
const Cart = () =>
    import ("../views/cart/Cart")
const Category = () =>
    import ("../views/category/Category")
const Profile = () =>
    import ("../views/profile/Profile")
const Home = () =>
    import ("../views/home/Home")
const Detail = () =>
    import ("../views/detail/Detail")
const routes = [{
        //设置默认显示
        path: '',
        redirect: '/home'
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
    },
    {
        //动态路由
        path: '/detail/:iid',
        component: Detail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    mode: 'history'
})

export default router