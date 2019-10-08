<template>
  <div id="app">
    <div class="fake-title-bar">
      印象时刻
      <div class="handle-bar" v-if="os === 'win32'">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <span class="handle-icon-box"><Icon  class="bar-icon" type="ios-remove" /></span>
          <span  class="handle-icon-box">
                <Icon style="font-size:14px"  class="bar-icon" type="ios-square-outline" />
          </span>
       <span  class="red handle-icon-box">
          <Icon  class="bar-icon" type="ios-close" />
       </span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
console.log(process);
export default {
  name: "impression",
  data() {
    return {
      os: process.platform
    };
  },
  methods: {
    open() {
      ipcRenderer.sendSync("open-child-window", "开启");
    }
  }
};
</script>

<style lang='less'>
#app {
  background: linear-gradient(to right, #1888a7 10%, #03265d);
}
.bar-icon {
  font-size: 25px;
  width: 100%;
  -webkit-app-region: no-drag;
  color: #cecece;
}
.fake-title-bar {
  -webkit-app-region: drag;
  text-align: center;
  color: #eee;
  position: fixed;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.handle-bar {
  float: right;
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
    text-align: center;
    overflow: hidden;
    transition: all 0.4s;

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
