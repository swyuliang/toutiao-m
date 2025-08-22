<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="文章详情" >
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{ article.title }}</h1>
      <!-- /标题 -->
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          slot="icon"
          fit="cover"
          round
          class="avatar"
          :src="article.aut_photo" />
          <div slot="label" class="pubdate">{{ article.pubdate | relativeTime}}</div>
          <van-button
          round
          size="small"
          :type="article.is_followed ?
          'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          class="follow-btn"
          :loading ="isFollowLoading"
          @click="onFollow"
          >{{ article.is_followed ? '已关注' : '关注'}}</van-button>
      </van-cell>
      <!-- 文章正文 -->
       <div class="markdown-body" v-html="article.content" ref="article-content">
       </div>
      <!-- /文章正文 -->
      <!-- 文章评论列表 -->
      <CommentList
        :source="articleId"
        :type="'a'"
        @getlist="comlist = $event"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      ></CommentList>
      <!-- /文章评论列表 -->
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showPopup"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="totalCommentCount"
        color="#777"
      ></van-icon>
      <van-icon
        :name="article.is_collected? 'star' : 'star-o'"
        :color="article.is_collected? 'orange' : '#777'"
        @click="onCollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#1989fa' : '#777'"
        @click="onLike"
      ></van-icon>
      <van-icon
        name="share"
        color="#777"
      ></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <PostComment
        :target="articleId"
        @post-success="onPostSuccess"
      ></PostComment>
    </van-popup>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
     <van-popup
      v-model="isReplyShow"
      position="bottom"
    >
      <!-- 这里使用 v-if 的目的是让组件随着弹出层的显示进行渲染和销毁，
           防止加载过的组件不重新渲染导致数据不会重新加载的问题 -->
      <CommentReply
        v-if="isReplyShow"
        :replyComment="replyComment"
        @closeReply="isReplyShow=false"></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
// 组件中获取动态路由参数：
// 方式一：this.$route.params.xxx
// 方式二：props传参，props：true
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: ['articleId'],
  data () {
    return {
      replyComment: {}, // 当前回复评论对象
      totalCommentCount: 0, // 评论总数据量
      comlist: [], // 存储子组件commentlist评论列表数据
      isPostShow: false, // 控制发布评论显示状态
      isReplyShow: false, // 控制回复显示状态
      article: {}, // 文章数据
      isFollowLoading: false // 关注用户按钮的loading状态
      // isCollectLoading: false // 收藏文章的loading张贴
    }
  },
  created () {
    this.loadArticle()
  },
  mounted () {
    // this.getlist()
  },
  methods: {
    onReplyClick (comment) {
      // console.log('onReplyClick', comment)
      this.replyComment = comment
      console.log('replyComment', this.replyComment)
      // 展示回复内容
      this.isReplyShow = true
    },
    onPostSuccess (data) {
      // 把发布成功的评论列表顶部，
      // this.xx.unshift(data)
      this.comlist.unshift(data)
      // 更新评论总数
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    },

    showPopup () {
      this.isPostShow = true
    },
    async onCollect () {
      // this.isCollectLoading = true
      this.$toast.loading({
        message: '操作中',
        forbidClick: true // 禁止点击背景
      })
      try {
        if (this.article.is_collected) {
        // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没有收藏，添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      // this.isCollectLoading = false
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () {
      // this.isCollectLoading = true
      this.$toast.loading({
        message: '操作中',
        forbidClick: true // 禁止点击背景
      })
      try {
        if (this.article.attitude === 1) {
        // 已点赞，取消点赞
          await deleteLike(this.articleId)
          this.article.attitude = -1
        } else {
          // 没有点赞，添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      // this.isCollectLoading = false
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    async onFollow () {
      // 开启按钮的 loading 状态
      this.isFollowLoading = true
      try {
        if (this.article.is_followed) {
        // 已关注，取消关注
          await deleteFollow(this.article.aut_id)
        } else {
          // 没有关注，添加关注
          await addFollow(this.article.aut_id)
        }
        // 更新视图
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    },
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      // console.log(data)
      this.article = data.data
      // 数据改变影响视图更新（操作DOM）不是立即的
      // 如果需要再修改数据之后马上操作被该数据影响的视图DOM，需要把这个代码放到$nextTick中
      // 得到所有的img标签，给img注册点击事件
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
      // 在事件处理函数中调用 ImagePreview（） 预览
    },
    handlePerviewImage () {
    // 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgPaths,
            startPosition: index // 起始位置
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.article-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: auto;
}
.title{
  font-size: 40px;
  color: #3a3a3a;
  padding: 28px;
  background-color: #fff;
  margin: 0;
}
.user-info{
  .avatar{
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
  .name{
    font-size: 24px;
    color: #333
  }
  .pubdate{
    font-size: 22px;
    color: #b4b4b4
  }
  .follow-btn{
    width: 170px;
    height: 58px;
  }
}
.markdown-body{
  padding: 28px;
  background-color: #fff;
  font-size: 28px;
}
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
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
</style>
