// import Toast from "./Toast"
// const obj = {}

// obj.install = function(app) {
//     console.log(app)
//         //1.创建组件构造器
//     const toastContrustor = app.extend(Toast)

//     //2.new的方式，根据组件构造器，可以创建出来一个组件对象
//     const toast = new toastContrustor()

//     //3.将组件对象，手动挂载到某一个元素上
//     toast.$mount(document.createElement('div'))

//     //4.toast.$el对应的就是div
//     document.body.appendChild(toast.$el)

//     // App.prototype.$toast = toast
//     app.config.globalProperties.$toast = Toast
// }

// export default obj