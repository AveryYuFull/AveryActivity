<template>
  <div class="_content">
    <img class="errorimg" src="../imgs/error.jpg"/>
    <span class="error">网络异常……</span>
  </div>
</template>

<script>

export default {
  // beforeCreate() {
  //   tuhu.sessionStorage.setItem('from', 'error')
  // }
};
</script>

<style scoped>
.errorimg {
  margin-top: 40%;
  width: 80%;
  height: auto;
  margin-left: 10%;
  display: block;
}
.error {
  margin-top: 10%;
  font-size: 18px;
  margin-left: 10%;
  color: #df3348;
}
</style>
