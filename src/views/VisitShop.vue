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
              <div class="left-desc">
                <div class="desc-hd">
                  <h3 class="shop-name">
                    {{ item.name }}
                  </h3>
                  <div class="shop-location">
                    <i
                      class="icon iconfont icon-location"
                      style="font-size:46px"
                    ></i>
                    <span> &lt; {{ item.distance }}米</span>
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
export default {
  name: 'VisitShop',
  data() {
    return {
      q: '',
      lat: '',
      lng: '',
      shopsData: null
    };
  },
  created() {
    Servive.getShops({ lat: this.lat, lng: this.lng }).then(res => {
      this.shopsData = res.data;
      console.log(this.shopsData);
      // eslint-disable-next-line no-undef
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
          Servive.getShops({ lat: this.lat, lng: this.lng }).then(res => {
            this.shopsData = res.data;
            console.log(this.shopsData);
          });
        },
        err => {
          console.log('定位失败', err);
        }
      );
    }, {});
  },
  components: {
    TopHead,
    MTab
  },
  methods: {
    searchShop() {
      console.log(this.q);
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
      .shop-item {
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
