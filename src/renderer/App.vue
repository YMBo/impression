<template>
  <div id="app">
    <TopBar />
    <div class="main">
      <aside>
        <AsideMenu />
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topBar'
import AsideMenu from '@/components/asideMenu'
export default {
  name: 'impression',
  components: { TopBar, AsideMenu },
  data() {
    return {}
  }
}
</script>
<style >
* {
  font-family: 'Microsoft YaHei';
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<style lang='less' scoped>
.main {
  display: flex;
  height: calc(100vh - 30px);
}
.content {
  width: 100%;
}
#app {
  user-select: none;
  //   background: linear-gradient(to right, #1888a7 10%, #03265d);
  //   background: #3d3ce3;
}
</style>
