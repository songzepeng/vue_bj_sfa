/* eslint-disable no-undef */
<template>
  <div class="visitshop">
    <TopHead style="width:100%" title="进店拜访"><div slot="r"></div></TopHead>
    <MTab :hd-titles="['计划内', '计划外']">
      <div slot="s1" class="tab-bd">
        <div class="search-box">
          <i @click="searchShop" class="icon iconfont icon-search"></i>
          <input
            type="text"
            class="search"
            v-model="q"
            @keydown.enter="searchShop"
            placeholder=" 点击进行搜索~"
          />
        </div>
        <div class="shop-wrap">
          <ul class="shop-list">
            <li class="shop-item" v-for="item in shopsData" :key="item.id">
              <router-link class="shop-item-link" :to="`/visitshop/${item.id}`">
                <div class="left-desc">
                  <div class="desc-hd">
                    <h3 class="shop-name">
                      {{ item.name }}
                    </h3>
                    <div class="shop-location animated bounce">
                      <i
                        class=" icon iconfont icon-location"
                        style="font-size:46px"
                      ></i>
                      <span class="mi"> &lt; {{ item.distance }} km</span>
                    </div>
                  </div>
                  <div class="shop-id-wrap">
                    <span class="shop-id">ID:{{ item.id }}</span>
                    <span>创建时间:{{ item.subon | formatDtae }}</span>
                  </div>
                  <div class="boss-wrap">
                    <span class="boss">{{ item.bossNmae }}</span>
                    <span class="phone">
                      <i class="icon iconfont icon-shouji"></i>
                      {{ item.phone }}</span
                    >
                  </div>
                </div>
                <div class="go-gt-btn">
                  <i class="icon iconfont icon-youjiantou"></i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div slot="s2" class="tab-bd">
        没数据，自己做
      </div>
    </MTab>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import MTab from '../components/MTab';
import Servive from '../service/index';
import { mapMutations, mapState } from 'vuex';
import { Indicator } from 'mint-ui';
export default {
  name: 'VisitShop',
  data() {
    return {
      q: '',
      lat: '',
      lng: ''
      // shopsData: null
    };
  },
  computed: {
    ...mapState(['shopsData'])
  },
  created() {
    Indicator.open({
      text: '获取定位中...',
      spinnerType: 'fading-circle'
    });
    this.getLocation()
      .then(() => {
        Indicator.close();
        this.searchShop();
      })
      .catch(() => {
        Indicator.close();
        this.searchShop();
      });
  },
  components: {
    TopHead,
    MTab
  },
  methods: {
    ...mapMutations(['initShops', 'appendShops']),
    // 此方法只用于获取定位，
    getLocation() {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        var geolocation = new qq.maps.Geolocation(
          'IAJBZ-TVJWX-PPD4B-74UEB-LGF2V-77B7Z',
          'myapp'
        );
        geolocation.getLocation(
          position => {
            console.log('position:', position);
            this.lat = position.lat;
            this.lng = position.lng;
            // 发送ajax请求，获取门店位置信息
            resolve(position);
            Indicator.close();
          },
          err => {
            console.log('定位失败', err);
            reject('定位失败');
            Indicator.close();
          }
        );
      });
    },
    // 改造：加载定位和加载后台数据分离，此方法只用来加载后台数据，定位完成后，加载后台数据
    searchShop() {
      Indicator.open({
        text: '获取商铺信息中...',
        spinnerType: 'fading-circle'
      });
      Servive.getShops({
        lat: this.lat,
        lng: this.lng,
        q: this.q
      }).then(res => {
        this.appendShops(res.data);
        this.initShops(res.data);
        console.log(this.shopsData);
        Indicator.close();
      });
    }
  },
  filters: {
    formatDtae(val) {
      let date = new Date(val);
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.visitshop {
  width: 100%;
}
.tab-bd {
  background-color: #fff;
  padding: 0 px2rem(28);
  .search-box {
    position: relative;
    background-color: #fafafa;
    border-bottom: px2rem(2) solid #ccc;
    i {
      font-size: px2rem(30);
      position: absolute;
      left: 0;
      top: px2rem(38);
      cursor: pointer;
    }
    .search {
      line-height: px2rem(106);
      height: px2rem(106);
      width: px2rem(680);
      padding-left: px2rem(38);
      font-size: px2rem(30);
      border: none;
    }
  }
  .shop-wrap {
    .shop-list {
      padding: 0 px2rem(28);
      background-color: #fff;
      .shop-item-link {
        display: flex;
        justify-content: space-between;
        border-bottom: px2rem(1) solid #ccc;
        .left-desc {
          flex: 1;
          padding-right: px2rem(30);
          .desc-hd {
            display: flex;
            justify-content: space-between;
            line-height: px2rem(80);
            h3 {
              font-size: px2rem(28);
              color: #000;
            }
            .shop-location {
              font-size: px2rem(24);
            }
          }
          .shop-id-wrap {
            height: px2rem(24);
            line-height: px2rem(24);
            font-size: px2rem(24);
            .shop-id {
              padding-right: px2rem(47);
            }
          }
        }
        .go-gt-btn {
          flex: 0 0 px2rem(62-28);
          line-height: px2rem(174);
          height: px2rem(174);
          i {
            font-size: px2rem(28);
          }
        }
      }
    }
  }
  .boss-wrap {
    overflow: hidden;
    line-height: px2rem(72);
    font-size: px2rem(24);
    height: px2rem(72);
    .boss {
      float: left;
    }
    .phone {
      i {
        font-size: px2rem(30);
      }
      float: right;
      color: #10903d;
    }
  }
}
</style>
