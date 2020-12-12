<template>
  <div>
      <nav-bar class="category-nav">
        <template v-slot:center>
            <div>商品分类</div>
        </template>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"CategoryNavBar",
  components: { NavBar },

}
</script>

<style scoped>
.category-nav{
    background: var(--color-tint);
    box-shadow: 0 1px 1px rgba(100,100,100,.2);
    color: #fff;
    text-align: center;
    font-size: 16px;
    position: relative;
    z-index: 9;
}
</style>