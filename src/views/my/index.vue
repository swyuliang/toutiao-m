<template>
  <div class="my-container">
    <!-- 未登录状态头部 -->
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- /未登录状态头部 -->
     <!-- 登录状态头部 -->
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            src=""
            round
            fit="cover"
          />
          <span class="name">黑马</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="base-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">点赞</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
     <!-- /登录状态头部 -->
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  component: {},
  props: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;// 设置弹性布局
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;    // 设置弹性布局
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }

  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          border: 3px solid #fff;
          width: 132px;
          height: 132px;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .base-stats {
      // height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
}
</style>
