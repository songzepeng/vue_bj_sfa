<template>
  <div class="login">
    <H1>欢迎登陆宝洁SFA系统</H1>
    <div class="top-hat"></div>
    <!-- logo区域 -->
    <div class="login-box">
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 登陆表单区域 -->
      <div
        class="input-group"
        :class="{ active: act_index === 1, error: errors.has('cno') }"
        style="display: block;"
      >
        <label for="cm_code">公司编号:</label>
        <input
          v-validate="{ required: true, max: 6, min: 4 }"
          name="cno"
          @focus="act_index = 1"
          type="number"
          id="cm_code"
          v-model="cm_code"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 2, error: errors.has('pno') }"
      >
        <label for="PNO">员工编号:</label>
        <input
          @focus="act_index = 2"
          type="number"
          id="PNO"
          v-model="PNO"
          v-validate="{ required: true, max: 12, min: 4 }"
          name="pno"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 3, error: errors.has('pwd') }"
      >
        <label for="Passwd">用户密码:</label>
        <input
          @focus="act_index = 3"
          type="password"
          id="Passwd"
          v-model="Passwd"
          v-validate="{ required: true, max: 12, min: 4 }"
          name="pwd"
        />
      </div>
      <div class="ck-row">
        <div
          class="ckbox-wrap"
          @click="rememberSet"
          :class="{ active: remember }"
        >
          <i
            class="iconfont"
            :class="{ 'icon-check-square': remember, 'icon-border': !remember }"
          ></i>
          <span>记住密码</span>
        </div>
        <div
          class="ckbox-wrap"
          @click="autologinSet"
          :class="{ active: autologin }"
        >
          <i
            class="iconfont"
            :class="{
              'icon-check-square': autologin,
              'icon-border': !autologin
            }"
          ></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="loginBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import '../assets/font/check/iconfont.css';
import { Indicator, Toast } from 'mint-ui';
import service from '../service/index';
export default {
  name: 'login',
  data() {
    return {
      act_index: 1,
      cm_code: '',
      PNO: '',
      Passwd: '',
      remember: false,
      autologin: false
    };
  },
  mounted() {
    //记住密码： 挂载完成后，拿到localStorage保存成功的各项数据
    let data = JSON.parse(localStorage.getItem('Login_data'));
    if (data) {
      // data（也就是缓存数据里有值）
      this.cm_code = data.CNO;
      this.Passwd = data.Passwd;
      this.PNO = data.PNO;
      (this.autologin = data.autologin), (this.remember = data.remember);
    }
    //页面挂载完成之后，用插件自带的方法进行强制校验表单，防止表单是空也可以提交的bug
    this.$validator.validate();
    // 挂载完成后：自动登录 如果自动登录为true选中状态，那么直接调用登录方法
    if (this.autologin) {
      this.loginBtnClick();
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    autologinSet() {
      // 设置打钩
      this.autologin = !this.autologin;
      // 处理点击自动登录记住密码也要被选中
      this.autologin && (this.remember = true); // 如果自动登录为true（打钩），那么记住密码也为true，短路表达式
    },
    rememberSet() {
      this.remember = !this.remember;
      !this.remember && (this.autologin = false);
    },
    loginBtnClick() {
      //判断表单校验是否全部通过
      // this.errors.any(); // 返回Boolen类型
      if (this.errors.any()) {
        // 如果有错误，那么返回true，没有返回false
        return;
      }
      // 发送后台请求之前，先弹出一个等待的层，（插件），防止2次点击
      Indicator.open('正在登陆...');
      // console.log("没有错误"); // 没有错误发送ajax请求
      service
        .login({
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.Passwd
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 1) {
            //登录成功处理
            // 记住用户名和密码处理
            localStorage.setItem(
              'Login_data',
              JSON.stringify({
                remember: this.remember,
                autologin: this.autologin,
                //  为true的时候记录上
                PNO: this.remember ? this.PNO : '',
                CNO: this.remember ? this.cm_code : '',
                Passwd: this.remember ? this.Passwd : ''
              })
            );
            // 解决刷新页面数据没有了的情况，把登录用户信息存到sessionstorage里面一份，让vuex里的数据直接从sessionstorage里拿就可以了
            sessionStorage.setItem('LoginUser', JSON.stringify(res.data.user));
            sessionStorage.setItem('LoginToken', res.data.token);
            // 把当前返回登录用户的信息存放到 vuex  赋值给 inituser
            // this.$store.commit("initUser", res.data.user);
            this.initUser(res.data.user);

            // 用户名密码都正确登录成功跳转到home路由页面处理
            this.$router.push('/home');
            Toast({
              message: '登陆成功！',
              position: 'top',
              duration: 3000
            });
            Indicator.close();
          } else {
            //用户名密码不正确登录失败处理
            Toast({
              message: '登陆失败！用户名或密码不正确啊老铁！',
              duration: 3000
            });
          }
          Indicator.close();
        })
        .catch(e => {
          console.log('登录异常失败', e);
          Toast({
            message: '登陆异常失败！' + e,
            position: 'top',
            duration: 3000
          });
          Indicator.close();
        });
    }
  }
};
</script>
<style lang="scss">
// 公共样式
@import '../lib/px2rem.scss';
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
@import '../lib/px2rem.scss';
@import '../assets/style/main.scss';
h1 {
  text-align: center;
  font-size: px2rem(36);
  height: px2rem(36);
  padding: px2rem(148-36-44) 0 px2rem(44) 0;
  line-height: px2rem(36);
  color: #fff;
}

.login {
  background-color: #2ade69;
  height: 100%;
}
.top-hat {
  width: px2rem(537);
  height: px2rem(18);
  background-color: #fff;
  margin: 0 auto;
  border-radius: px2rem(18) px2rem(18) 0 0;
}
@mixin loginStyle() {
  width: px2rem(600);
  background-color: #fff;
  margin: 0 auto;
  border-radius: px2rem(20);
}
.login-box {
  @include loginStyle();
  height: px2rem(836);
  .logo-wrap {
    padding: px2rem(80) 0;
    .logo-box {
      width: px2rem(190);
      height: px2rem(190);
      margin: 0 auto;
      background: url(../assets/logo_bj.png);
      background-size: cover;
    }
  }
  @mixin rowStyle() {
    padding: 0 px2rem(36);
    color: $text-color;
    width: px2rem(463-36 * 2);
  } // scss 里处理公共样式多次调用的
  .input-group {
    border: 2px solid #fff;
    border-radius: px2rem(45);
    font-size: $text-size-mid;
    line-height: px2rem(90);
    @include rowStyle();
    margin: 0 auto px2rem(30);
    input {
      border: 0 none;
      font-size: $text-size-mid;
      line-height: px2rem(90);
      width: px2rem(200);
      padding-left: 1em;
      // background-color: #e2e2e2;
    }
    input:focus {
      outline: none;
    }
  }
  .input-group.active {
    color: $act-color;
    border: 2px solid $act-color;
  }
  .input-group.error {
    color: red;
    border: 2px solid red;
  }
  .ck-row {
    font-size: $text-size;
    @include rowStyle();
    display: flex;
    justify-content: space-around;
    .ckbox-wrap {
      padding-top: px2rem(8);
      padding-left: px2rem(36);
      i {
        display: inline-block;
        height: px2rem(32);
        width: px2rem(32);
        font-size: px2rem(32);
      }
      span {
        position: relative;
        top: px2rem(-4);
        left: px2rem(5);
      }
    }
    .ckbox-wrap.active {
      color: $act-color;
    }
  }
}
.btn-wrap {
  @include loginStyle();
  height: px2rem(100);
  font-size: $text-size-imp;
  color: $act-color;
  text-align: center;
  line-height: px2rem(100);
  margin-top: px2rem(20);
  font-weight: 600;
  letter-spacing: px2rem(10);
}
</style>
