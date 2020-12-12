<template>
  <div class="sign-in">
      <div class="user-img">
          <img src="~assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="area-center">
          <div class="sign-in-text">登录/注册</div>
          <div class="phoneImg">
              <img src="~assets/img/profile/phone.svg" alt="">
              暂无绑定手机号
          </div>
      </div>
      <div class=".right-arrow">
          <div class="arrow"></div>
      </div>
  </div>
</template>

<script>
export default {
    name:"ProfileSignIn"
}
</script>

<style scoped>
.sign-in{
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    text-align: center;
    align-items: center;
    color: #fff;
    background: var(--color-tint);
    padding:5px 0 10px 0;
}
.user-img{
    flex: 1;
    padding: 10px auto;
}
.user-img img{
    width: 60px;
    height: 60px;
}
.area-center{
    flex: 3;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.area-center .sign-in-text{
    font-size: 16px;
    padding-left: 7px;
}
.area-center .phoneImg{
    margin: 5px;
}
.area-center .phoneImg img{
    width: 14px;
    height: 14px;
}
.right-arrow{
    /* flex: 1; */
}
.arrow{
    width: 10px;
    height: 10px;
    margin-right: 20px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
}
</style>