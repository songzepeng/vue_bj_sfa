<template>
  <div class="shop-info">
    <TopHead title="店铺活动">
      <div slot="r">
        <span @click="stopVisit">结束拜访</span>
      </div>
    </TopHead>
    <div class="shop-info-bd">
      <h3>{{}}</h3>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import Service from '../service/index';
export default {
  name: 'ShopInfo',
  data() {
    return {};
  },
  created() {
    Service.getShopInfo(this.$route.params.id).then(res => {
      console.log(res.data);
    });
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

<style scoped></style>
