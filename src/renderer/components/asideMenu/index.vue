<template>
  <ul class="menu" style="height:100%;text-align:center">
    <li>相册</li>
    <li>设置</li>
  </ul>
</template>
<script>
export default {
  name: 'AsideMenu',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.menu {
  width: 100px;
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  background: #2f2f2f;
  > li {
    height: 30px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: #fff;
    margin: 10px 0;
  }
}
</style>