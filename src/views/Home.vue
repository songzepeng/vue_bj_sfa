<template>
  <div class="home">
    <TopHead title="SFA"
      ><router-link
        style="color:#fff"
        to="/user"
        slot="r"
        class="icon iconfont icon-user1"
      ></router-link
    ></TopHead>
    <div class="main-bd">
      <div class="date-wrap">{{ YearMonth }}</div>
      <div class="jd">
        <MyProgress
          title="当前月进度"
          :val="getDayOfMonth"
          :isShowPercent="true"
        ></MyProgress>
        <MyProgress
          title="月销售完成度"
          :val="mouthSealsPercent"
          :isShowPercent="true"
        ></MyProgress>
        <MyProgress
          title="有效商店数量"
          :val="shops"
          :isShowPercent="false"
        ></MyProgress>
      </div>
    </div>

    <div class="main-nav">
      <div class="nav-cell" v-for="i in 9" :key="i">
        <template v-if="menuList.length >= i">
          <MenuCell
            :url="menuList[i - 1].url"
            :imgUrl="menuList[i - 1].imgUrl"
            :menuName="menuList[i - 1].menuName"
          ></MenuCell>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// 顶部公共组件
import TopHead from '../components/TopHead';
import MyProgress from '../components/Progress';
import service from '../service';
import MenuCell from '../components/MenuCell';

const menuList = [
  {
    menuName: '公告通知',
    imgUrl: require('@/assets/img/公告通知@2x.png'),
    url: '/notice'
  },
  {
    menuName: '进店拜访',
    imgUrl: require('@/assets/img/进店拜访@2x.png'),
    url: '/visitshop'
  },
  {
    menuName: '电话订单',
    imgUrl: require('@/assets/img/电话订单@2x.png'),
    url: '/phoneorder'
  },
  {
    menuName: '订单状态',
    imgUrl: require('@/assets/img/订单状态@2x.png'),
    url: '/orders'
  },
  {
    menuName: '培训资料',
    imgUrl: require('@/assets/img/培训资料@2x.png'),
    url: '/training'
  },
  {
    menuName: '消息中心',
    imgUrl: require('@/assets/img/消息中心@2x.png'),
    url: '/message'
  },
  {
    menuName: '新增门店',
    imgUrl: require('@/assets/img/新增门店@2x.png'),
    url: '/addedshop'
  },
  {
    menuName: '数据同步',
    imgUrl: require('@/assets/img/数据同步@2x.png'),
    url: '/asyncdata'
  }
];
export default {
  name: 'home',
  components: {
    TopHead,
    MyProgress,
    MenuCell
  },
  data() {
    return {
      // 月销售数量
      mouthSealsPercent: 0,
      // 有效店面数量
      shops: 0,
      menuList: menuList
    };
  },
  created() {
    // console.log(menuList[1].url);
    service.getUserProgress().then(res => {
      console.log(res.data);
      this.mouthSealsPercent = parseInt(res.data.monthPercent * 100);
      this.shops = res.data.totalShops;
    });
  },
  mounted() {},
  computed: {
    YearMonth() {
      let t = new Date();
      return `${t.getFullYear()}年${t.getMonth() + 1}月`;
    },
    getDayOfMonth() {
      let t = new Date();
      return parseInt((t.getDate() / 30) * 100);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main-nav {
    flex: 1;
    padding: 0 px2rem(30);
    display: flex;
    flex-flow: row wrap;
    border-top: 1px solid #ccc;
    .nav-cell {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      flex: 1 1 30%;
      align-content: stretch;
      align-items: stretch;
    }
    .nav-cell:nth-child(3) {
      border-right: none;
    }
    .nav-cell:nth-child(6) {
      border-right: none;
    }
    .nav-cell:nth-child(9) {
      border-right: none;
    }
  }
}
.main-bd {
  background-color: #fff;
  .date-wrap {
    padding: px2rem(40) 0 px2rem(22);
    font-size: $text-size-mid;
    color: #000;
    text-align: center;
  }
}
#pie {
  width: px2rem(500);
  height: px2rem(400);
}
.jd {
  display: flex;
  justify-content: space-around;
}
</style>
