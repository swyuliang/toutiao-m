<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${replyComment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('closeReply')"/>
    </van-nav-bar>
    <!-- /头部信息 -->
    <!-- 当前评论项 -->
    <CommentItem :comment="replyComment" />
    <!-- /当前评论项 -->
    <!-- 所有评论回复 -->
    <!-- <van-cell title="全部回复"/> -->
    <CommentList
      :source="replyComment.com_id"
      :type="'c'"
      @getlist="comlist = $event"
      @update-total-count="totalCommentCount = $event"
    ></CommentList>
    <!-- /所有评论回复 -->
     <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
     <!-- 发布评论回复 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
    <PostComment
      :target="replyComment.com_id"
      :articleId="articleId"
      @post-success="onPostSuccess"
    ></PostComment>
    </van-popup>
    <!-- /发布评论回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: ['replyComment', 'articleId'],
  data () {
    return {
      isPostShow: false,
      totalCommentCount: 0, // 评论总数据量
      comlist: [] // 存储子组件commentlist评论列表数据
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    onPostSuccess (data) {
      // 把发布成功的评论列表顶部，
      // this.xx.unshift(data)
      this.comlist.unshift(data)
      // 更新评论总数
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
 .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 400px;
      height: 60px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
  }
  </style>
