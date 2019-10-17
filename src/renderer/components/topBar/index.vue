<template>
  <div class="fake-title-bar">
    <div class="handle-bar" v-if="os === 'win32'">
      <!-- 如果是windows系统 就加上模拟的操作按钮-->
      <span class="handle-icon-box" @click="minS">
        <svg-icon class="color" iconClass="min"></svg-icon>
      </span>
      <span class="handle-icon-box" @click="maxS">
        <svg-icon class="color" iconClass="max2" v-if="isMax"></svg-icon>
        <svg-icon class="color" iconClass="max" v-else></svg-icon>
      </span>
      <span class="red handle-icon-box" @click="closeS">
        <svg-icon class="color" iconClass="close" style="width: 14px;"></svg-icon>
      </span>
    </div>
  </div>
</template>
<script>
import { remote } from "electron";
import { screenMax, screenMin, screenClose } from "ROOT/event/app.js";
export default {
  name: "top-bar",
  data() {
    return {
      os: process.platform,
      isMax: remote.getCurrentWindow().isMaximized()
    };
  },
  methods: {
    maxS() {
      this.isMax = screenMax();
      console.log(this.isMax);
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
<style lang="less" scoped>
.bar-icon {
  font-size: 25px;
  width: 100%;
  color: #cecece;
}
.fake-title-bar {
  -webkit-app-region: drag;
  text-align: center;
  position: relative;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: url("../../../photos/topbar.jpg");
  background-size: cover;
}
.handle-bar {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 90px;
  align-items: center;
  background: transparent;
  .red:hover {
    background: red;
    color: #fff;
  }
  .handle-icon-box {
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    transition: all 0.4s;
    -webkit-app-region: no-drag;
    .color {
      fill: #000;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      > .color {
        fill: #fff;
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