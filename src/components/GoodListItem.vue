<template>
  <div class="goods-item">
    <div class="img-box">
      <img :src="goods.img" :alt="goods.title" />
    </div>
    <div class="desc-wrap">
      <h3 class="goods-title">{{ goods.title }}</h3>
      <div class="aside-info-wrap">
        <span>编码：{{ goods.serial }}</span>
        <span>规格：{{ goods.packageDimensions }}</span>
      </div>
      <div class="price-wrap">
        <div class="fl">
          价格：<span class="monery">{{ goods.monery }}元</span>
        </div>
        <div class="fr">
          库存：<span>{{ goods.number }}箱</span>&nbsp;&nbsp;<i
            class="icon iconfont icon-shuaxin"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: ['goods'],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.goods-item {
  display: flex;
  border-top: px2rem(1) solid #ccc;
  padding: px2rem(20) 0;
  i {
    font-size: px2rem(28);
    color: #000;
  }
  .img-box {
    flex: 0 0 px2rem(124);
    height: px2rem(124);
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc-wrap {
    text-align: left;
    flex: 1;
    padding-left: px2rem(28);
    font-size: px2rem(20);
    line-height: px2rem(20);
    color: #666;
    .goods-title {
      font-size: px2rem(26);
      color: #000;
      margin-bottom: px2rem(12);
      line-height: px2rem(26);
      height: px2rem(26);
    }
    .aside-info-wrap {
      height: px2rem(20);
      margin-bottom: px2rem(34);
      span:first-child {
        margin-right: px2rem(60);
      }
      .price-wrap {
        overflow: hidden;
        height: px2rem(30);
        line-height: px2rem(30);
      }
    }
  }
  .monery {
    color: red;
    font-size: px2rem(28);
  }
}
</style>
