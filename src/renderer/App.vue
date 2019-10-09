<template>
  <div id="app">
    <div class="fake-title-bar">
      印象时刻
      <div class="handle-bar" v-if="os === 'win32'">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <span class="handle-icon-box" @click="minS">
          <Icon class="bar-icon" type="ios-remove" />
        </span>
        <span class="handle-icon-box" @click="maxS">
          <Icon v-if="isMax" type="ios-photos-outline" />
          <Icon v-else style="font-size:14px" class="bar-icon" type="ios-square-outline" />
        </span>
        <span class="red handle-icon-box" @click="closeS">
          <Icon class="bar-icon" type="ios-close" />
        </span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { remote } from "electron";
import { screenMax, screenMin, screenClose } from "ROOT/event/app.js";
export default {
  name: "impression",
  data() {
    return {
      os: process.platform,
      isMax: remote.getCurrentWindow().isMaximized()
    };
  },
  mounted() {},
  methods: {
    maxS() {
      this.isMax = screenMax();
    },
    minS() {
      screenMin();
    },
    closeS() {
      screenClose();
    }
  }
};
</script>

<style lang='less'>
#app {
  user-select: none;
  //   background: linear-gradient(to right, #1888a7 10%, #03265d);
  background: #3d3ce3;
}
.bar-icon {
  font-size: 25px;
  width: 100%;
  color: #cecece;
}
.fake-title-bar {
  background: #3d3ce3;
  position: relative;
  -webkit-app-region: drag;
  text-align: center;
  color: #eee;
  position: fixed;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.handle-bar {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: 100%;
  width: 90px;
  align-items: center;
  background: transparent;
  .red:hover {
    background: red;
    color: #fff;
  }
  .handle-icon-box {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    transition: all 0.4s;
    -webkit-app-region: no-drag;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
      > i {
        color: #fff;
      }
    }
    &.red:hover {
      background: rgba(255, 0, 0, 0.7);
      > i {
        color: #fff;
      }
    }
  }
}
</style>
