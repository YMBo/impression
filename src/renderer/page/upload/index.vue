<template>
  <div style="height:100%">
    <div class="box horse" ref="drag">
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
import { putFile } from "@/event/ssh.js";
import { Drag } from "@/components/drag";
export default {
  name: "upload",
  data() {
    return {
      drag: null
    };
  },
  mounted() {
    this.drag = new Drag(this.$refs["drag"], {
      dragenter: this.dragenter,
      drop: this.drop,
      dragleave: this.dragleave,
      dragover: this.dragover
    });
  },
  beforeDestroy() {
    this.drag.destory();
  },
  methods: {
    openAnimate() {
      this.$refs["drag"].classList.add("runhorse");
      this.$refs["logo"].$el.classList.add("jump");
    },
    closeAnimate() {
      this.$refs["drag"].classList.remove("runhorse");
      this.$refs["logo"].$el.classList.remove("jump");
    },
    //   当被拖动元素在目的地元素内时触发
    dragover(e) {
      e.preventDefault();
    },

    // 当被拖动元素没有放下就离开目的地元素时触发
    dragleave(e) {
      this.closeAnimate();
      e.preventDefault();
    },
    // 当被拖动元素进入目的地元素所占据的屏幕空间时触发
    dragenter(e) {
      this.openAnimate();
      e.preventDefault();
    },
    //  当元素或选中的文本在可释放目标上被释放时触发
    drop(event) {
      event.preventDefault();
      this.closeAnimate();
      let a = [];
      for (let f of event.dataTransfer.files) {
        a.push(f);
      }
      putFile();
    }
  }
};
</script>
<style scoped lang='less'>
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
  &:before {
    content: "";
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
    content: "";
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