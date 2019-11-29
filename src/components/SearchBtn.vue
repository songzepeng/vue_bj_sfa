<template>
  <div class="search-btn">
    <i class="icon iconfont icon-search" @click="$emit('search')"></i>
    <input
      @input="$emit('input', $event.target.value)"
      :value="value"
      type="text"
      placeholder="请输入搜索内容"
      @keydown.enter="$emit('search')"
    />
  </div>
</template>

<script>
export default {
  name: 'search-btn',
  props: ['value', 'search'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.search-btn {
  display: flex;
  height: px2rem(64);
  line-height: px2rem(64);
  background-color: #fff;
  i,
  input {
    font-size: px2rem(28);
  }
  i {
    flex: 0 0 px2rem(40);
  }
  input {
    flex: 1;
    border: none;
  }
}
</style>
