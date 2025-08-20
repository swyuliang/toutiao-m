<template>
  <van-cell class="comment-item">
    <van-image class="avatar" slot="icon" round :src="comment.aut_photo"></van-image>
    <div slot="title">
        <div class="title-wrap" >
          <div class="name">{{ comment.aut_name }}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              class="like-icon"
              :class="{liked: this.comment.is_liking}"
              :name="this.comment.is_liking ? 'good-job' : 'good-job-o'"
            />
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>
        <div class="content">{{ comment.content }}</div>
        <span class="pubdate">{{ comment.pubdate | dateTime('MM-DD HH:mm') }}</span>
        <van-button class="reply-btn" size="mini">{{ comment.reply_count }}回复</van-button>
    </div>
  </van-cell>
</template>

<script>
// import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: ['comment', 'index', 'changeCommentLike'],
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    async onCommentLike () {
      // console.log('onCommentLike')
      // const commentId = this.comment.com_id.toString()
      // if (this.comment.is_liking) {
      //   // 已点赞，取消点赞
      //   await deleteCommentLike(commentId)
      //   this.comment.like_count-- // eslint-disable-line
      // } else {
      //   // 未点赞，则添加点赞
      //   await addCommentLike(commentId)
      //   this.comment.like_count++ // eslint-disable-line
      // }
      // 更新视图
      // this.comment.is_liking = !this.comment.is_liking // eslint-disable-line
      this.changeCommentLike(this.index)
    }
  }
}
</script>

<style scoped lang="less">
.comment-item{
    .avatar{
        width: 72px;
        height: 72px;
        margin-right: 26px;
    }
    .title-wrap{
        display: flex;
        justify-content: space-between;
        .name{
          font-size: 28px;
          color: #406599;
        }
    }
    .content{
        font-size: 32px;
        color: #222;
    }
    .pubdate{
        font-size: 20px;
        margin-right: 20px;
    }
    .like-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .like-icon.liked {
        color: #1989fa
    }
}
</style>
