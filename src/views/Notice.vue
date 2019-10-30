<template>
  <div class="notice">
    <TopHead title="公司公告" style="width:100%"><div slot="r"></div></TopHead>
    <div class="notice-wrap">
      <Loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
        id="loadmore1"
      >
        <ul class="notice-list">
          <!-- 遍历存到数组里的数据 -->
          <li v-for="item in NoticeList" :key="item.id" class="notice-item">
            <router-link :to="`/notice/${item.id}`">
              <div class="notice-wrap">
                <i
                  class="icon iconfont icon-yuandianzhong"
                  :class="{ readed: item.isRead }"
                ></i>
                <!-- 后台数据isRead如果为true的时候，就让他显示为灰色 ，加上样式类readed-->
                <div class="notice-bd">
                  <div class="notice-title">{{ item.title }}</div>
                  <p class="notice-date">{{ item.SubDate | dateFormat }}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </Loadmore>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import Service from '../service';
import { Loadmore } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Notice',
  data() {
    return {
      // NoticeList: [], //不再用这个，用vuex存的数据
      //是否全部加载完成，一到公告页面默认不全部加载
      allLoaded: false,
      //公告按日期排序，开始日期和结束日期
      startDate: null,
      endDtae: null
    };
  },
  computed: {
    // 把vuex的存的数据，通过展开运算符，mapState映射到这
    ...mapState(['NoticeList'])
  },
  filters: {
    dateFormat(val) {
      let d = new Date(val);
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
  },
  methods: {
    ...mapMutations(['initNoticeList', 'unshiftMoreNotice', 'pushMoreNotice']),
    loadTop() {
      //   顶部下拉加载数据
      Service.getNotice(this.startDate, 20, false).then(res => {
        //   unshift：从前面给她追加一个元素
        // 全部替换为vuex 里的突变
        this.unshiftMoreNotice(res.data.data.messages);
        this.startDate = new Date(this.NoticeList[0].SubDate);
        //加载完数据之后，重新计算列表的高度
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom() {
      Service.getNotice(this.endDtae, 20, true).then(res => {
        if (res.data.data.messages.length <= 0) {
          this.allLoaded = true;
          return;
        }
        this.pushMoreNotice(res.data.data.messages);
        this.endDtae = this.NoticeList[this.NoticeList.length - 1].SubDate;
        //加载完数据之后，重新计算列表的高度
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  },
  components: {
    TopHead,
    Loadmore
  },
  created() {
    //公告数据
    this.startDate = new Date();
    Service.getNotice(new Date(), 20, true).then(res => {
      console.log(res.data);
      // 存到数组里
      // this.NoticeList.push(...res.data.data.messages); 本地组件状态
      this.initNoticeList(res.data.data.messages); // vuex 触发突变，修改vuex中NoticeList里的数据
      this.endDtae = this.NoticeList[this.NoticeList.length - 1].SubDate;
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
#loadmore1 {
  color: #000;
  font-size: $text-size-mid;
  width: 100%;
  .notice-list {
    background-color: #fff;
    .notice-item {
      padding: px2rem(32) 0 0 px2rem(40);
      height: px2rem(125-32);
      border-bottom: px2rem(1) solid #ccc;
      width: 100%;
      .notice-title {
        font-size: $text-size-mid;
        line-height: $text-size-mid;
        color: #000;
      }
      .notice-date {
        font-size: px2rem(18);
        color: #666;
        line-height: px2rem(50);
      }
    }
  }
}
.notice-wrap {
  display: flex;
  i {
    flex: 0 0 px2rem(42);
    font-size: px2rem(20);
    line-height: px2rem(32);
    color: red;
  }
  i.readed {
    color: #ccc;
  }
}
</style>
