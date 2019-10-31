<template>
  <div style="height:100%;position:relative">
    <!-- <img
      src="/Users/admin/Desktop/a.jpg"
      data-live-photo="../../../static/IMG_4316.MOV"
      data-live-photo-still-image-time="1.71"
    />-->
    <img :src="src" width="100" height="100" />
    <!-- 图片上传预览区 -->
    <div v-if="isUpload" class="preview">
      <transition-group name="move" tag="ul">
        <li v-for="(item,index) in fileList" :key="index" class>
          <!-- :style="`animation-delay:${index/10}s`" -->
          <img :src="getUrl(item.file)" />
          <div class="mes">
            <div>
              <span>{{item.file.name}}</span>
            </div>
            <div>
              <div class="c">{{(item.file.size/1024/1024).toFixed(2)}}M</div>
              <Progress :percent="item.percent" :stroke-width="4" :status="item.status" hide-info />
            </div>
          </div>
        </li>
      </transition-group>
    </div>
    <div :class="`box horse ${isUpload?'moveRight':''}`" ref="drag">
      <div class="dotted">
        <div class="content">
          <svg-icon ref="logo" class="pos" iconClass="upload"></svg-icon>
          <p class="text">拖拽&点击</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { putFile, readFile } from '@/utils/ssh.js'
import { getFileUrl } from '@/utils/img.js'
import { flatDir } from '@/utils/common.js'
import { Drag } from '@/components/drag'
import db from 'ROOT/database/datastore'
import LivePhotos from 'laphs'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import nativeImage from 'electron'
export default {
  name: 'upload',
  computed: {
    ...mapState('upload', ['fileList']),
    isUpload() {
      return Boolean(this.fileList.length)
    }
  },
  data() {
    return {
      drag: null,
      src: '',
      files: []
    }
  },
  mounted() {
    // LivePhotos.initialize()
    this.drag = new Drag(this.$refs['drag'], {
      dragenter: this.dragenter,
      drop: this.drop,
      dragleave: this.dragleave,
      dragover: this.dragover
    })
  },
  beforeDestroy() {
    this.drag.destory()
  },
  methods: {
    ...mapMutations('upload', ['ADD_LIST']),
    getUrl(file) {
      return getFileUrl(file)
    },
    openAnimate() {
      this.$refs['drag'].classList.add('runhorse')
      this.$refs['logo'].$el.classList.add('jump')
    },
    closeAnimate() {
      this.$refs['drag'].classList.remove('runhorse')
      this.$refs['logo'].$el.classList.remove('jump')
    },
    //   当被拖动元素在目的地元素内时触发
    dragover(e) {
      e.preventDefault()
    },

    // 当被拖动元素没有放下就离开目的地元素时触发
    dragleave(e) {
      this.closeAnimate()
      e.preventDefault()
    },
    // 当被拖动元素进入目的地元素所占据的屏幕空间时触发
    dragenter(e) {
      this.openAnimate()
      e.preventDefault()
    },
    //  当元素或选中的文本在可释放目标上被释放时触发
    drop(event) {
      event.preventDefault()
      this.closeAnimate()
      let all = [...event.dataTransfer.files]
      let length = this.fileList.length
      //   flatDir(all)
      //   let files = all.map((e, i) => {
      //     // if (isDir(e)) {
      //     //   console.log(isDir(e))
      //     //   return
      //     // }
      //     return {
      //       id: i + length,
      //       file: all[i],
      //       status: 'active',
      //       err: null,
      //       percent: 0
      //     }
      //   })
      //   this.ADD_LIST({
      //     data: files
      //   })
      //   putFile()
      readFile().then(r => {
        this.src = r
        console.log(r)
      })
    }
  }
}
</script>
<style scoped lang='less'>
.move-enter-active,
.move-leave-active {
  transition: all 2s;
}
.move-enter {
  opacity: 0;
  transform: translateY(-10px);
}
.move-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
@keyframes uploadAnimation {
  form {
    transform: translateX(-10px);
  }
  to {
    transform: translateX(0);
  }
}
.an {
  animation: uploadAnimation 0.2s ease-in;
  animation-fill-mode: forwards;
}
.preview {
  width: 260px;
  padding: 15px;
  position: absolute;
  overflow: auto;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  ul {
    list-style: none;
    li {
      font-size: 12px;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      margin: 5px 0;
      box-shadow: 0 0 20px 0 #dadada;
      border-radius: 3px;
      padding-right: 10px;
      //   transform: translateX(-10px);
      > .mes {
        width: 190px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .c {
          font-size: 10px;
          text-align: right;
        }
      }
      > img {
        height: 50px;
        width: 50px;
      }
    }
  }
}
// 蚂蚁线
@keyframes shine {
  0% {
    background-position: -1px -1px;
  }
  100% {
    background-position: -14px -14px;
  }
}

@keyframes shine2 {
  0% {
    background-position: -14px -14px;
  }
  100% {
    background-position: -1px -1px;
  }
}
.dotted {
  position: absolute;
  top: 2px;
  right: 2px;
  left: 2px;
  bottom: 2px;
  background: rgba(247, 247, 247, 1);
  pointer-events: none;
}
.runhorse {
  &:before {
    animation: shine2 0.5s infinite linear;
  }
  &:after {
    animation: shine 0.5s infinite linear;
  }
}
.horse {
  transition: all 0.3s ease-in;
  &.moveRight {
    transform: translateY(-50%) translate(100px, 0);
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    top: 2px;
    right: 2px;
    z-index: -1;
    background: repeating-linear-gradient(
      135deg,
      transparent,
      transparent 4px,
      rgba(160, 160, 160, 1) 4px,
      rgba(160, 160, 160, 1) 10px
    );
  }
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 2px;
    bottom: 2px;
    top: 0;
    right: 0;
    background: repeating-linear-gradient(
      135deg,
      transparent,
      transparent 4px,
      rgba(160, 160, 160, 1) 4px,
      rgba(160, 160, 160, 1) 10px
    );
  }
}

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
  //   border: 3px dotted rgba(160, 160, 160, 1);
  //   border-radius: 13px;
  overflow: hidden;
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