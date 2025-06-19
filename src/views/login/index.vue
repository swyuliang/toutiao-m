<template>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录" />
      <!-- /导航栏 -->

      <!-- 登录表单 -->
      <van-form @submit="onSubmit">
        <van-field
          name="用户名"
          placeholder="请输入手机号"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          type="password"
          name="验证码"
          placeholder="请输入验证码"
        >
           <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
           <template #button>
             <van-button class="send-sms-btn" round size="small" type="default">获取验证码</van-button>
           </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <!-- /登录表单 -->
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn{
    background-color: #ededed;
  }
}
</style>
