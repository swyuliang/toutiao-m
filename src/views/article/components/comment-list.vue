<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- <van-cell v-for="(comment,index) in list" :key="index" :title="comment.content"/> -->
    <comment-item v-for="(comment,index) in list" :key="index" :comment="comment" :index="index" :changeCommentLike="changeCommentLike"/>
    </van-list>
  </div>
</template>

<script>
import { getComments, addCommentLike, deleteCommentLike } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: ['source'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页的数据的页码
      limit: 5 // 每页大小
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 修改子组件comment的状态
    async changeCommentLike (index) {
      console.log(this.list[index])
      const commentId = this.list[index].com_id.toString()
      if (this.list[index].is_liking) {
        // 已点赞，取消点赞
        await deleteCommentLike(commentId)
        this.list[index].like_count-- // eslint-disable-line
      } else {
        // 未点赞，则添加点赞
        await addCommentLike(commentId)
        this.list[index].like_count++ // eslint-disable-line
      }
      this.list[index].is_liking = !this.list[index].is_liking
    },
    async onLoad () {
      // 异步更新数据
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit// 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      console.log(data)
      // 2. 把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 将本次的 loading 关闭
      this.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        // 如果有，更新获取下一页数据的页码
        this.offset = data.data.last_id
      } else {
        // 如果没有，则将 finished 设置为ture， 不再触发加载更多了
        this.finished = true
      }
      // // setTimeout 仅做示例， 真实场景一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
