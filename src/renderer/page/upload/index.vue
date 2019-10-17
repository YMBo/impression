<template>
  <div style="height:100%">
    <div class="box" ref="drag">
      <div class="content">
        <svg-icon ref="logo" class="pos" iconClass="upload"></svg-icon>
        <p class="text">拖拽&点击</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'upload',
  data() {
    return {}
  },
  mounted() {
    console.log('chufa ')
    this.dragEvent()
  },
  methods: {
    openAnimate() {
      this.$refs['logo'].$el.classList.add('jump')
    },
    closeAnimate() {
      this.$refs['logo'].$el.classList.remove('jump')
    },
    dragEvent() {
      console.log(this.$refs['drag'])
      //   当被拖动元素在目的地元素内时触发
      this.$refs['drag'].ondragover = () => {
        return false
      }

      // 当被拖动元素没有放下就离开目的地元素时触发
      // 在拖动操作完成时触发
      this.$refs['drag'].ondragleave = () => {
        this.closeAnimate()
        return false
      }
      // 当被拖动元素进入目的地元素所占据的屏幕空间时触发
      this.$refs['drag'].ondragenter = () => {
        this.openAnimate()
      }
      //  当元素或选中的文本在可释放目标上被释放时触发
      this.$refs['drag'].ondrop = event => {
        event.preventDefault()
        this.closeAnimate()
        let a = []
        for (let f of event.dataTransfer.files) {
          a.push(f)
        }
        let b = a.map(e => e.path)
        ipcRenderer.send('upload', b)
        return false
      }
    }
  }
}
</script>
<style scoped lang='less'>
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY();
  }
}
.box {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  margin: 0 auto;
  height: 50vh;
  background: rgba(247, 247, 247, 1);
  border: 3px dotted rgba(160, 160, 160, 1);
  border-radius: 13px;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    pointer-events: none;
    .jump {
      animation: jump 1s linear infinite;
    }
    .text {
      color: rgba(160, 160, 160, 1);
      text-align: center;
      font-size: 16px;
      letter-spacing: 4px;
    }
    .pos {
      width: 97px;
      height: 79px;
      fill: rgba(160, 160, 160, 1);
    }
  }
}
</style>