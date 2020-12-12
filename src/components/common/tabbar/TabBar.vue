<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"TabBar"
}
</script>

<style>
#tab-bar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;  
    background: #f6f6f6;
    box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.2);
}

.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    vertical-align: middle;
    margin-top: 2px;
}
.tab-bar-item img{
    width:24px ;
    height: 24px;
}
.color{
    color:red;
}
</style>