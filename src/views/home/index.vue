<template>
  <div class="home-container">
          <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar">
        <van-button
          class="search-btn"
          slot="title"
          type="info"
          size="small"
          round
          icon="search"
        >搜索
        </van-button>
      </van-nav-bar>
      <!-- /导航栏 -->
      <!-- 频道列表 -->
       <!--
        通过v-model绑定当前激活标签对应的索引值，默认情况启用第一个标签
        通过 animated 属性可以开启切换标签内容时的转场动画。
        通过 swipeable 属性可以开启滑动切换标签页。
       -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
        >
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
        <!-- /文章列表 -->
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>
      <!-- /频道列表 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [
        { id: 0, name: '推荐' },
        { id: 1, name: '推荐1' },
        { id: 2, name: '推荐2' },
        { id: 3, name: '推荐3' },
        { id: 4, name: '推荐4' },
        { id: 5, name: '推荐5' },
        { id: 6, name: '推荐6' }
      ] // 频道列表
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    i.van-icon {
     font-size: 32px;
    }
   }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0px;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 80px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 80px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-color: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
