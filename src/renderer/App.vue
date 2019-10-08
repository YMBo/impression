<template>
  <div id="app">
    <div class="fake-title-bar">
      印象时刻
      <div class="handle-bar" v-if="os === 'darwin'">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <Icon class="bar-icon" type="md-remove" />
        <Icon class="bar-icon" type="md-close" />
      </div>
    </div>
    <Button style="margin-top:22px;" @click="open">创建子窗口</Button>
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'impression',
  data() {
    return {
      os: process.platform
    }
  },
  methods: {
    open() {
      ipcRenderer.sendSync('open-child-window', '开启')
    }
  }
}
</script>

<style>
.bar-icon {
  font-size: 22px;
}
.fake-title-bar {
  -webkit-app-region: drag;
  text-align: center;
  color: #eee;
  position: fixed;
  width: 100%;
  height: 22px;
  line-height: 22px;
}
.handle-bar {
  float: right;
  margin-right: 3px;
  background: transparent;
}
</style>
