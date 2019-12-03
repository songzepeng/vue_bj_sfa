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
        <li :class="{ act: isOnSales }" @click="isOnSalesClick">促销</li>
        <li :class="{ act: isAll }" @click="isSelectAll">全部</li>
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
            <li>{{ getFilterGoodsType }}/</li>
            <li>
              <i
                class="icon iconfont icon-filter"
                @click="showSelectGoodsType = true"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="goods-bd"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <GoodsListItem
          v-for="item in goods"
          :goods="item"
          :key="item.id"
        ></GoodsListItem>
      </div>
    </div>
    <Popup v-model="showSelectGoodsType" pop-transition="popup-fade">
      <div class="tanchuceng-class">
        <Checklist
          v-model="filterGoodsType"
          :options="['食品', '日化', '保洁']"
          title="请选择商品类型"
        ></Checklist>
        <Button
          type="primary"
          class="btn-select-type"
          @click="showSelectGoodsType = false"
          >确定</Button
        >
      </div>
    </Popup>
  </div>
</template>

<script>
import Vue from 'vue';
import TopHead from '../components/TopHead';
import SearchBtn from '../components/SearchBtn';
import GoodsListItem from '../components/GoodListItem';
import service from '../service/index';
import { Popup, Checklist, Button, Toast, InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
export default {
  name: 'Order',
  data() {
    return {
      showSelectGoodsType: false,
      q: '',
      isOnSales: false,
      isAll: true,
      total: 0,
      cur: 0,
      goods: [],
      filterGoodsType: ['食品', '日化', '保洁'],
      curPage: 1,
      loading: false
    };
  },
  created() {
    this.loadGoodsData();
  },
  computed: {
    getFilterGoodsType() {
      return this.filterGoodsType.join('/');
    }
  },
  components: {
    TopHead,
    SearchBtn,
    GoodsListItem,
    Popup,
    Checklist,
    Button
  },
  methods: {
    isSelectAll() {
      this.isOnSales = false;
      this.isAll = true;
      // 清一下数据
      this.goods = [];
      this.loadGoodsData();
    },
    isOnSalesClick() {
      this.isOnSales = !this.isOnSales;
      this.isAll = false;
      // 清一下数据
      this.goods = [];
      this.loadGoodsData();
    },
    searchGoods() {
      // console.log('搜索', this.q);
      this.curPage = 1;
      this.goods = [];
      this.loadGoodsData();
    },
    // 加载商品数据
    loadGoodsData() {
      let params = {
        _limit: 20,
        _page: this.curPage,
        q: this.q
      };
      if (!this.isAll) {
        params.onsales = this.isOnSales;
      }
      return service
        .loadGoods(params)
        .then(res => {
          this.goods = [...this.goods, ...res.data];
          this.total = res.headers['x-total-count'];
          this.cur = this.total;
        })
        .catch(() => {
          console.log('error load goods!');
          Toast('加载数据失败！');
        });
    },
    loadMore() {
      this.loading = true;
      this.curPage++;
      this.loadGoodsData().finally(() => {
        this.loading = false;
      });
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
      .act {
        color: #04afeb;
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
          flex: 0 0 px2rem(58px);
          i {
            font-size: px2rem(28);
          }
        }
      }
    }
  }
  .tanchuceng-class {
    width: 80%;
    height: px2rem(300);
    width: px2rem(200);
    padding: px2rem(60);
    text-align: center;
    font-size: px2rem(50);
  }
}
.search-wrap {
  padding: px2rem(20) px2rem(28);
}
</style>
