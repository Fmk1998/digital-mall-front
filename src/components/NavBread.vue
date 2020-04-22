<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a @click="goHome">首页</a>
        <slot name="bread"></slot>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBread",
    methods: {
      goHome(){
        //通过push进行跳转
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
