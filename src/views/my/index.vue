<template>
  <div class="my-container">
    <!-- 登录状态头部 -->
    <div v-if="user" class="header user-info">
     <div class="base-info">
       <div class="left">
         <van-image
           class="avatar"
           :src="userInfo.photo"
           round
           fit="cover"
         />
         <span class="name">{{ userInfo.name }}</span>
       </div>
       <div class="right">
         <van-button size="mini" round>编辑资料</van-button>
       </div>
     </div>
     <div class="base-stats">
       <div class="data-item">
         <span class="count">{{ userInfo.art_count }}</span>
         <span class="text">头条</span>
       </div>
       <div class="data-item">
         <span class="count">{{ userInfo.follow_count }}</span>
         <span class="text">关注</span>
       </div>
       <div class="data-item">
         <span class="count">{{ userInfo.fans_count }}</span>
         <span class="text">粉丝</span>
       </div>
       <div class="data-item">
         <span class="count">{{ userInfo.like_count }}</span>
         <span class="text">获赞</span>
       </div>
     </div>
   </div>
    <!-- /登录状态头部 -->
    <!-- 未登录状态头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- /未登录状态头部 -->
     <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
     <!-- /宫格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      clickable
      @click="onLogout"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: { name: '黑马', art_count: 11, follow_count: 22, fans_count: 33, like_count: 44, photo: '' } // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 如果用户登录了， 则请求加载用户数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出登录状态
      // 在组件中要使用 this.$dialog 来调用组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的user + 本地存储中的 user)
          this.$store.commit('setUser', null)
          console.log('成功执行这')
        })
        .catch(() => {
        // on cancel
          console.log('取消执行这')
        })
    },

    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (errS) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
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
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
