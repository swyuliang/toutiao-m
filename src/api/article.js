/****
* 文章请求模块
*/
// import request from '@/utils/request'
import mockRequests from '@/utils/mockAjax'
/*********
 * 请求获取文章列表数据
 */
// export const getArticles = params => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_1/articles',
//     params: params
//   })
// }
export const getArticles = () => {
  return mockRequests({
    method: 'GET',
    url: '/articles'
  })
}

// 获取文章详情
// export const getArticleById = articleId => {
//   return request({
//     method: 'GET',
//     url: `/app/v1_1/articles/${articleId}`
//   })
// }
export const getArticleById = articleId => {
  return mockRequests({
    method: 'GET',
    url: `/articlebyid/${articleId}`
  })
}

// 收藏文章
export const addCollect = articleId => {
  return mockRequests({
    method: 'POST',
    url: '/collections',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export const deleteCollect = articleId => {
  return mockRequests({
    method: 'DELETE',
    url: `/deletecollections/${articleId}`
  })
}
// 点赞文章
export const addLike = articleId => {
  return mockRequests({
    method: 'POST',
    url: '/likings',
    data: {
      target: articleId
    }
  })
}
// 取消点赞文章
export const deleteLike = articleId => {
  return mockRequests({
    method: 'DELETE',
    url: `/deletelikings/${articleId}`
  })
}
