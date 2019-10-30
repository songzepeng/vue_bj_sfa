<template>
  <div class="menucell">
    <router-link :to="url">
      <div class="img-wrap"><img :src="imgUrl" /></div>
      <div class="title-wrap">{{ menuName }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'menucell',
  props: ['menuName', 'imgUrl', 'url'],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.menucell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: $text-size;
  text-align: center;
  color: #000;
  .img-wrap {
    width: px2rem(66);
    height: px2rem(66);
    display: inline-block;
    margin-bottom: px2rem(36);
  }
}
</style>
