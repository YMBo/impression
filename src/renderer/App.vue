<template>
  <div id="app">
    <!-- <div class="blur" :style="`background-image:url(${bg})`"></div> -->
    <TopBar />
    <div class="main">
      <aside class="aside">
        <AsideMenu />
        <span class="bar"></span>
      </aside>
      <div class="content">
        <transition name="switch">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import photo from 'ROOT/photos/bg.jpg'
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

.switch-enter-active {
  animation: switch-in 1s;
}
.switch-leave-active {
  animation: switch-in 1s reverse;
}
@keyframes switch-in {
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateZ(45deg);
  }
  100% {
    transform: rotateX(0);
  }
}
</style>
<style lang='less' scoped>
.main {
  display: flex;
  height: calc(100vh - 30px);
}
.content {
  width: 100%;
  -webkit-perspective: 1000;
}
#app {
  user-select: none;
  position: relative;
  overflow: hidden;
  //   background: linear-gradient(to right, #1888a7 10%, #03265d);
  //   background: #3d3ce3;
  .blur {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(0, 0, 0, 0.5);
    filter: blur(10px);
    background-size: cover;
    z-index: -1;
  }
}
.aside {
  position: relative;
  .bar {
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 8px 0px rgba(142, 142, 142, 0.08);
  }
}
</style>
