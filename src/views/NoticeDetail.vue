<template>
  <div class="NoticeDetail">
    <TopHead title="公告详情"><div slot="r"></div></TopHead>
    <h3>{{ Notice.title }}</h3>
    <p>{{ Notice.to }}</p>
    <div>{{ Notice.text }}</div>
    <P id="p1">{{ Notice.date }}</P>
    <P id="p1">{{ Notice.address }}</P>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import { mapState, mapMutations } from 'vuex';
import Service from '../service/index';
export default {
  name: 'NoticeDetail',
  data() {
    return {
      Notice: null
    };
  },
  computed: {
    ...mapState(['NoticeList'])
  },
  methods: {
    ...mapMutations(['setNoticeReaded'])
  },
  created() {
    const NoticeId = this.$route.params.id;
    //初始化前，从vuex里拿到的返回的公共数据里找到相对于的id的详情信息
    this.Notice = this.NoticeList.find(item => item.id == NoticeId);
    //设置已读
    Service.getNoticeReaded(NoticeId);
    this.setNoticeReaded(NoticeId);
  },
  components: {
    TopHead
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.NoticeDetail {
  color: #000;
  font-size: $text-size-mid;
  line-height: 1.5;
}
h3 {
  font-size: px2rem(30);
}
#p1 {
  margin-right: 0;
}
</style>
