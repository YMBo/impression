<template>
  <div class="content">
    <div class="gap" v-for="item in a" :key="item">
      <div class="timeAddress">
        <span class="addrens">望京东</span>
        <span class="time">2019年10月10日 · 北京市</span>
      </div>
      <div class="img">
        <figure class="imgBox" v-for="item in num" :key="item">
          <img :src="photos" width="100%;" />
          <figcaption class="dic">Img 123.heic</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
<script>
import photo from 'ROOT/photos/test.jpg'
export default {
  name: 'contentIMG',
  data() {
    return {
      photos: photo,
      num: 10,
      a: 10
    }
  }
}
</script>
<style scoped lang='less'>
.content {
  padding: 0 5px;
  height: 100%;
  overflow: auto;
  font-family: 'Microsoft YaHei';
  background: rgba(255, 255, 255, 1);
  .gap {
    margin-bottom: 10px;
  }
  .timeAddress {
    position: sticky;
    top: 0;
    background: rgba(223, 223, 223, 0.8);
    padding: 4px 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 40px;
    // margin-bottom: 20px;
    .addrens {
      font-size: 13px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .time {
      font-size: 11px;
      color: rgba(122, 122, 122, 1);
    }
  }

  .img {
    margin: 0 20px;
    padding: 20px 0 40px;
    display: grid;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-template-columns: repeat(auto-fit, 100px);
    .imgBox {
      .dic {
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
</style>