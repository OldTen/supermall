<template>
    <nav-bar class="profile-text">
        <template v-slot:center>
            <div>
                我的档案
            </div>
        </template>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"ProfileNavBar",
    components:{
        NavBar
    }
}
</script>

<style scoped>
.profile-text{
    background: var(--color-tint);
    box-shadow: 0 1px 1px rgba(100,100,100,.2);
    color: #fff;
    text-align: center;
    font-size: 16px;
}
</style>