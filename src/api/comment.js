import mockRequests from '@/utils/mockAjax'
/**
 * 文章评论相关请求模块
 */

// 获取评论
export const getComments = params => {
  return mockRequests({
    method: 'GET',
    url: '/comments',
    params
  })
}

// 对评论或评论回复点赞
export const addCommentLike = commentId => {
  return mockRequests({
    method: 'POST',
    url: '/addcommentlike',
    data: {
      target: commentId
    }
  })
}
// 取消对评论或评论回复点赞
export const deleteCommentLike = commentId => {
  return mockRequests({
    method: 'DELETE',
    url: `/deletecommentlike/${commentId}`
  })
}
