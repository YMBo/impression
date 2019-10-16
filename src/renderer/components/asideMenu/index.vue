<template>
  <ul ref="aside" class="menu" style="height:100%;text-align:center" @click="move">
    <span ref="bar" class="mover-bar light" :style="`top:${top}px`"></span>
    <li class="current">
      <router-link class="rectMax" :to="{ name: 'gallery'}">
        <svg-icon class="setRect" iconClass="home"></svg-icon>
      </router-link>
    </li>
    <li>
      <router-link class="rectMax" :to="{ name: 'update'}">
        <svg-icon class="setRect" iconClass="update"></svg-icon>
      </router-link>
    </li>
    <li>
      <router-link class="rectMax" :to="{ name: 'setting'}">
        <svg-icon class="setRect" iconClass="setting"></svg-icon>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'AsideMenu',
  data() {
    return {
      top: 0
    }
  },
  computed: {
    allLi() {
      return [...this.$refs['aside'].children].filter(v => v.nodeName == 'LI')
    }
  },
  methods: {
    move(event) {
      let eventNode = this.findParent(event.target, this.$refs['aside'], 'LI')
      if (eventNode) {
        this.$refs['bar'].classList.remove('light')
        let $ = eventNode
        this.allLi.forEach(e => e.classList.remove('current'))
        this.top = $.offsetTop
        $.classList.add('current')
        this.$refs['bar'].classList.add('light')
      }
    },
    findParent(current, parent, targetName) {
      let cb = current
      while (cb !== parent) {
        if (cb.nodeName == targetName) {
          return cb
        }
        cb = cb.parentNode
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes light {
  0% {
    box-shadow: 0 0 34px 0 #007eff;
  }
  100% {
    box-shadow: 0 0 34px 3px #007eff;
  }
}
.menu {
  position: relative;
  width: 50px;
  height: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  //   background: #fff;
  box-shadow: 4px 8px 24px 0px rgba(142, 142, 142, 0.08);
  .mover-bar {
    position: absolute;
    left: 0;
    width: 2px;
    height: 50px;
    background: #3899ff;
    border-radius: 20px;
    transition: all 0.3s ease-out;
    &::after {
      content: '';
      position: absolute;
      height: 20px;
      left: 0;
      width: 2px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .light.mover-bar::after {
    animation: light 0.5s 0.3s ease-in forwards;
  }
  > li.current {
    .setRect {
      transition: all 3s;
      fill: #3899ff;
    }
  }
  > li {
    height: 50px;
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #fff;
    display: flex;
    .rectMax {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .setRect {
      width: 25px;
      height: 25px;
      fill: #5d5d5d;
      .none();
    }
    .none {
      pointer-events: none;
    }
  }
}
</style>