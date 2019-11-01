<template>
  <div class="shop-info">
    <TopHead title="店铺活动">
      <div slot="r">
        <span @click="stopVisit" style="font-size:40px;">结束拜访</span>
      </div>
    </TopHead>
    <div class="shop-info-bd">
      <h3 class="shop-name">{{ shopInfo.name }}</h3>
      <div class="shop-progress-wrap">
        <div class="month-sales">
          <div class="l-box">
            <i class="icon iconfont icon-zongxiaoliang"></i> 本月至今的销售量
          </div>
          <div class="r-box">
            {{ sailes.MonthSales.toFixed(0) }}
          </div>
        </div>
        <div class="month-sales">
          <div class="l-box">
            <i class="icon iconfont icon-xiaoliangpaixu"></i>
            过往半年的平均销售量
          </div>
          <div class="r-box">
            {{ sailes.MonthAvgSales.toFixed(0) }}
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-hd">
            <div class="left"><i>%</i>核心分销完成率</div>
            <div class="right">{{ sailes.DivSalesPercent.toFixed(0) }}%</div>
          </div>
          <div class="progress-bar">
            <div
              class="progress-bar-val"
              :style="{ width: `${sailes.DivSalesPercent}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="history-remark-wrap">
      <div class="histpry-remark-hd">
        历史拜访备注:
      </div>
      <textarea
        class="history-txt-remark"
        placeholder=" 点击填写历史备注~填了我也不看"
      ></textarea>
    </div>
    <div class="btn-wrap">
      <div class="btn">
        下单
      </div>
      <div class="btn act">
        <router-link :to="`/shopsignin/${$route.params.id}`">
          店铺签到
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import Service from '../service/index';
import { mapState } from 'vuex';
export default {
  name: 'ShopInfo',
  data() {
    return {
      shopInfo: null,
      sailes: {
        // 后台的数据过来的时候，让他用一个vue.js里的插件，进行一个css3过渡效果
        id: 0,
        MonthSales: 0,
        MonthAvgSales: 0,
        DivSalesPercent: 0
      }
    };
  },
  created() {
    // 店铺的销售进度
    Service.getShopInfo(this.$route.params.id).then(res => {
      // console.log(res.data);
      // vue 插件 过渡效果
      // eslint-disable-next-line
      TweenLite.to(this.sailes, 1, res.data);
      // this.sailes = res.data;
    });
    // 从 vuex 中拿到当前点击近来的店铺的信心
    // 传过来商铺信息的数据等于点进来的id，对应
    this.shopInfo = this.shopsData.find(
      item => item.id == this.$route.params.id
    );
  },
  computed: {
    ...mapState(['shopsData'])
  },
  components: {
    TopHead
  },
  methods: {
    stopVisit() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.shop-info {
  color: #000;
  font-size: px2rem(28);
  height: 100%;
  .shop-name {
    height: px2rem(84);
    line-height: px2rem(84);
    background-color: #fafafa;
    border-bottom: px2rem(1px) solid #ccc;
    padding-left: px2rem(28);
  }
  .shop-progress-wrap {
    background-color: #fff;
    padding-left: px2rem(28);
    i {
      font-size: px2rem(28);
      padding-right: px2rem(28);
    }
    .icon-xiaoliangpaixu {
      padding-right: px2rem(32);
    }
    .month-sales {
      height: px2rem(110);
      line-height: px2rem(110);
      padding: 0 px2rem(28) 0 0;
      display: flex;
      justify-content: space-between;
    }
    .progress-wrap {
      padding-bottom: px2rem(38);
      i {
        font-size: px2rem(28);
        padding-right: px2rem(46);
      }
      .progress-hd {
        height: px2rem(96);
        line-height: px2rem(96);
        padding: 0 px2rem(28) 0 0;
        display: flex;
        justify-content: space-between;
      }
      .progress-bar {
        height: px2rem(16);
        border-radius: px2rem(6);
        background-color: #e4e4e4;
        margin-right: px2rem(48);
        .progress-bar-val {
          height: px2rem(16);
          border-radius: px2rem(6);
          background: linear-gradient(to right, #868ce4, #57c988);
        }
      }
    }
  }
  .history-remark-wrap {
    .histpry-remark-hd {
      height: px2rem(66);
      background-color: #fafafa;
      border: px2rem(1) solid #ccc;
      border-top: none;
      line-height: px2rem(66);
      padding-left: px2rem(32);
    }
    .history-txt-remark {
      line-height: px2rem(30);
      height: px2rem(200);
      background-color: #fafafa;
      width: 100%;
      border: none;
      font-size: px2rem(30);
      color: #ff7500;
      padding-top: px2rem(20);
      border-bottom: px2rem(1) solid #ccc;
    }
  }
  .btn-wrap {
    padding-top: px2rem(160);
    .btn {
      width: px2rem(480);
      font-size: px2rem(36);
      color: #10903d;
      text-align: center;
      border: px2rem(2) solid #10903d;
      height: px2rem(84);
      line-height: px2rem(84);
      margin: 0 auto px2rem(54);
      border-radius: px2rem(8);
    }
    .btn.act {
      background-color: #10903d;
      color: #fff;
    }
  }
}
</style>
