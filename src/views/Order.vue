<template>
  <div class="Order">
    <TopHead title="下单"
      ><div slot="r"><i class="icon iconfont icon-gouwuche"></i></div
    ></TopHead>
    <div class="search-wrap">
      <SearchBtn v-model="q" @search="searchGoods"></SearchBtn>
    </div>
    <!-- 中间导航区域 -->
    <div class="hot-wrap">
      <ul class="classify-list">
        <li @click="isOnSalesClick">促销</li>
        <li @click="isAll = true">全部</li>
        <li>SKU-N</li>
        <li>SKU-Y</li>
        <li>NIKE</li>
      </ul>
    </div>

    <!-- 商品列表区域 -->
    <div class="goods-list-wrap">
      <div class="goods-hd">
        <div class="fl count-wrap">{{ cur }} / {{ total }}</div>
        <div class="fr">
          <ul class="type-list-wrap">
            <li>食品/</li>
            <li>日化/</li>
            <li>保洁/</li>
            <li><i class="icon iconfont icon-filter"></i></li>
          </ul>
        </div>
      </div>
      <div class="goods-bd">
        <GoodsListItem
          v-for="item in goods"
          :goods="item"
          :key="item.id"
        ></GoodsListItem>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import SearchBtn from '../components/SearchBtn';
import GoodsListItem from '../components/GoodListItem';
import service from '../service/index';
export default {
  name: 'Order',
  data() {
    return {
      q: '',
      isOnSales: false,
      isAll: true,
      total: 0,
      cur: 0,
      goods: []
    };
  },
  created() {
    service
      .loadGoods()
      .then(res => {
        this.goods = res.data;
      })
      .catch(() => {
        console.log('error load goods!');
      });
  },
  components: {
    TopHead,
    SearchBtn,
    GoodsListItem
  },
  methods: {
    isOnSalesClick() {
      this.isOnSales = !this.isOnSales;
      this.isAll = false;
    },
    searchGoods() {
      console.log('搜索', this.q);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.Order {
  background-color: #fff;
  .hot-wrap {
    background-color: #fafafa;
    padding: px2rem(14) px2rem(28);
    font-size: px2rem(28);
    line-height: px2rem(30px);
    border: px2rem(1) solid #ccc;
    border-left: none;
    border-right: none;
    .classify-list {
      display: flex;
      align-items: center;
      height: px2rem(58);
      line-height: px2rem(58);
      text-align: center;
      li {
        flex: 0 0 px2rem(132);
        border-right: px2rem(1) solid #ccc;
        height: px2rem(58);
        line-height: px2rem(58);
      }
      li:last-child {
        border-right: none;
      }
    }
  }
  .goods-list-wrap {
    padding: 0 px2rem(28);
    .goods-hd {
      overflow: hidden;
      .count-wrap,
      .type-list-wrap {
        height: px2rem(84);
        font-size: px2rem(28);
        line-height: px2rem(84);
      }
      .type-list-wrap {
        display: flex;
        li {
          flex: 0 0 px2rem(70);
          i {
            font-size: px2rem(32);
          }
        }
      }
    }
  }
}
.search-wrap {
  padding: px2rem(20) px2rem(28);
}
</style>
