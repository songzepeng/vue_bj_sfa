<template>
  <div class="img-btn" @click="$emit('click')">
    <i
      class="icon iconfont"
      :class="iconclass"
      :style="{ color: 'isred' ? 'ff5656' : '#000' }"
    ></i>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  name: 'ImgBtn',
  props: ['iconclass', 'val', 'isred'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.img-btn {
  width: px2rem(220);
  height: px2rem(220);
  color: #000;
  box-sizing: border-box;
  border: px2rem(1) solid #ccc;
  padding-top: px2rem(62);
  i {
    font-size: px2rem(60);
    padding-left: px2rem(75);
  }
  p {
    font-size: px2rem(24);
    text-align: center;
  }
}
</style>
