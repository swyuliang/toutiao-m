<template>
  <!--List 列表组件：瀑布流滚动加载，用于展示长列表。
  List 组件通过 loading和 finished 两个变量控制加载状态
  当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
  此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
  若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
  -load 事件：
    + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
    + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，
    List 会继续触发 load事件，直到内容铺满屏幕或者数据全部加载完成。
    -loading 属性： 控制加载中的 loading 状态
      + 非加载中， loading 为 false， 此时会根据列表滚动的位置判断是否
      触发 load 事件 (列表内容不足一屏幕时，会直接触发)
      + 加载中， loading为 true，表示正在发送异步请求，此时不会触发 load 事件
  - finshed 属性： 控制加载结束的状态
      + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
      + 所有数据加载结束， finished 为 true，此时不会触发load事件
  -->
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/compoments/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表的数据的数组
      loading: false, // 控制加载中loading状态，
      finished: false, // 控制加载结束的状态，如加载完所以数据 finished： true，然后提示没有更多
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel_id, // 频道id
          // timestamp 简单理解就是请求数据的页码
          // 请求第一页数据： 当前最新的时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求是要包含置顶
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        // 2.把请求结果数据放到 list 数组中
        const { results } = data.data
        // ...数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
        // 数据没有了，将 finished 设置为 true， 不再 load 加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel_id, // 频道id
          // timestamp 简单理解就是请求数据的页码
          // 请求第一页数据： 当前最新的时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: Date.now(), // 下拉刷新每次请求最新数据，所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求是要包含置顶文章，1-包含置顶，0-不包
        })
        // 2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3.关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
    // 初始化或滚动到底部的时候会触发调用 onload
    // onLoad () {
    // // 异步更新数据 1.请求获取数据
    // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     // 2.把请求结果数据放到 list 数组中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束 3.本次数据加载结束之后要把加载状态设置为结束
    //     // loading 关闭后才能触发下一次的加载更多
    //     this.loading = false

    //     // 数据全部加载完成 4.判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据了，把finished 设置为 true， 之后不再触发加载更多
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  height: 79vh;
  overflow-y: auto;
}
</style>
