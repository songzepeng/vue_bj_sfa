<template>
  <div class="myprogress">
    <div class="label">{{ val }}<span v-if="isShowPercent">%</span></div>
    <div class="pie-wrap" ref="pie"></div>
    <H3>{{ title }}</H3>
  </div>
</template>

<script>
import echarts from 'echarts';
// 引入饼状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default {
  name: 'myprogress',
  props: {
    // 饼状图组件
    title: { type: String, required: true },
    val: { type: Number, required: true },
    isShowPercent: { type: Boolean, required: true, default: false }
  },
  data() {
    return {};
  },
  mounted() {
    this.initCircle();
  },
  watch: {
    //   后台数据发生改变的时候，再调一下数据
    val: function() {
      this.initCircle();
    }
  },
  methods: {
    // 调用饼图数据，封装成一个方法
    initCircle() {
      let data = [];
      if (this.isShowPercent) {
        data.push({ value: this.val, name: '' });
        data.push({ value: 100 - this.val, name: '' });
      } else {
        data.push({ value: 0, name: '' });
        data.push({ value: 100, name: '' });
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.pie);
      // 绘制图表
      myChart.setOption({
        color: ['rgb(102,208,113)', 'rgb(223,223,223)'],
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['95%', '100%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '48',
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
@mixin hwwrap {
  width: px2rem(175);
  height: px2rem(175);
}
.myprogress {
  position: relative;
  text-align: center;
  color: #000;
  font-family: 'PingFang SC';
  .label {
    line-height: px2rem(175);
    position: absolute;
    @include hwwrap;
    left: 0;
    top: 0;
    font-size: px2rem(48);
    span {
      vertical-align: super;
      font-size: $text-size-small;
    }
  }
  h3 {
    font-size: $text-size;
    padding: px2rem(27) 0 px2rem(52);
    line-height: $text-size;
  }
  .pie-wrap {
    @include hwwrap;
  }
}
</style>
