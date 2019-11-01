<template>
  <div class="signin">
    <TopHead title="商铺签到">
      <div slot="r" @click="submitSign">
        <span>√</span>
      </div>
    </TopHead>
    <input
      @change="uploadImg"
      accept="image/*"
      type="file"
      class="input-file"
      ref="file"
    />
    <div class="img-box-wrap">
      <ImgBtn
        class="img-box"
        :isred="false"
        iconclass="icon-camera"
        val="拍摄照片"
        @click="$refs.file.click()"
      ></ImgBtn>
      <div
        @click="img.checked = !img.checked"
        v-for="img in imgs"
        class="img-box"
        :key="img.url"
      >
        <div v-if="img.checked" class="check-hover">
          <span>√</span>
        </div>
        <img width="100%" height="100%" :src="img.url" />
      </div>
      <ImgBtn
        class="img-box"
        :isred="false"
        iconclass="icon-shanchu"
        val="删除照片"
        style="color:red;"
        @click="removeImg"
      ></ImgBtn>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import ImgBtn from '../components/ImgBtn';
import Service from '../service/index';
import canvasResize from 'canvas-resize';
import Utility from '../common/Utility';
import { Toast } from 'mint-ui';
// console.log(process.env.VUE_APP_BASEURL);
export default {
  name: 'signin',
  data() {
    return {
      imgs: []
    };
  },
  components: {
    TopHead,
    ImgBtn
  },
  created() {
    Service.SubmitSigin({
      id: Date.now(),
      shopId: this.$route.params.id,
      SubOn: new Date().toLocaleDateString(),
      imgs: this.imgs.map(item => item.url)
    }).then(res => {
      this.imgs = res.data.imgs;
      console.log(res.data);
    });
  },
  methods: {
    // 签到
    submitSign() {
      Service.SubmitSigin({
        id: Date.now(),
        shopId: this.$route.params.id,
        SubOn: new Date().toLocaleDateString(),
        imgs: this.imgs.map(item => item.url)
      })
        .then(() => {
          Toast({
            message: '在此店铺签到成功，数据已返回到服务端',
            position: 'middle',
            duration: 2000,
            className: 'qiand'
          });
        })
        .catch(() => {
          Toast({
            message: '签到失败',
            position: 'middle',
            duration: 2000
          });
        });
    },
    // 删除图片操作处理
    removeImg() {
      this.imgs = this.imgs.filter(item => item.checked === false);
      Toast({
        message: '删除成功！',
        position: 'top',
        duration: 2000
      });
    },
    uploadImg() {
      //   console.log(this.$refs.file.files[0]);
      let formData = new FormData();
      let file = this.$refs.file.files[0];
      // 引入封装好的方法，配合canvas-resize插件，对上传的图片进行压缩再上传
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.7, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback: baseStr => {
          let fileBlob = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append('imgF', fileBlob);
          Service.uploadImg(formData)
            .then(res => {
              console.log(res);
              // 使用环境变量的地址
              this.imgs.push({
                checked: false,
                url: `${process.env.VUE_APP_BASEURL}${res.data.img}`
              });
            })
            .catch(() => {
              // 后台数据规定上传图片大小不得大于200kb
              console.log('上传失败,图片大小不符合规定！');
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
.mint-toast-text {
  font-size: px2rem(50) !important;
}
.signin {
  background-color: #fff;
  .input-file {
    height: 0;
    width: 0;
    position: absolute;
    visibility: hidden;
  }
  .check-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-color: #ccc;
    span {
      position: absolute;
      right: px2rem(28);
      top: px2rem(28);
      font-size: px2rem(28);
      color: #000;
    }
  }
}
.img-box-wrap {
  padding: px2rem(28);
  padding-bottom: 0;
  overflow: hidden;
  .img-box {
    border: px2rem(1) solid #ccc;
    height: px2rem(220);
    width: px2rem(220);
    box-sizing: border-box;
    float: left;
    margin-right: px2rem(16);
    margin-bottom: px2rem(28);
    position: relative;
  }
  .img-box:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
