<template>
  <div>
      <profile-nav-bar/>
      <profile-sign-in/>
      <profile-information :integral="integral"
                            :balance="balance"
                            :Discount="Discount"/>
      <profile-list/>
  </div>
</template>

<script>

import ProfileNavBar from "./childComps/ProfileNavBar"
import ProfileSignIn from './childComps/ProfileSignIn'
import ProfileInformation from './childComps/ProfileInformation'
import ProfileList from './childComps/ProfileList'


export default {
    name:"Profile",
    components:{
        ProfileNavBar,
        ProfileSignIn,
        ProfileInformation,
        ProfileList
    },
    data(){
      return{
        balance:0,
        Discount:0,
        integral:0
      }
    }
}
</script>

<style>

</style>