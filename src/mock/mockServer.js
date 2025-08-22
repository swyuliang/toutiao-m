// 引入mockjs
import Mock from 'mockjs'

// 把JSON数据格式引入进来,json,图片的资源默认暴露
import channels from './channels'
import mychannels from './mychannels'
import articles from './articles'
import articlebyid10001 from './articlebyid10001'
import articlebyid10002 from './articlebyid10002'
import articlebyid10003 from './articlebyid10003'
import articlebyid10030 from './articlebyid10030'
import comments from './comments'
import addcomment from './addcomment'
// mock数据：第一个参数请求地址 ，第二个参数：请求数据
Mock.mock('/mock/channels', { code: 200, data: channels })
Mock.mock('/mock/mychannels', { code: 200, data: mychannels })
Mock.mock('/mock/articles', { code: 200, data: articles })
Mock.mock('/mock/articlebyid/10001', { code: 200, data: articlebyid10001 })
Mock.mock('/mock/articlebyid/10002', { code: 200, data: articlebyid10002 })
Mock.mock('/mock/articlebyid/10003', { code: 200, data: articlebyid10003 })
Mock.mock('/mock/articlebyid/10030', { code: 200, data: articlebyid10030 })
Mock.mock('/mock/deletefollowing/201', { code: 200, data: null })
Mock.mock('/mock/following', 'post', function (target) {
  if (target === 201) {
    return Mock.mock({
      code: 200,
      data: null
    })
  }
})
Mock.mock('/mock/collections', 'post', function (target) {
  if (target === 201) {
    return Mock.mock({
      code: 200,
      data: null
    })
  }
})
Mock.mock('/mock/likings', 'post', function (target) {
  if (target === 201) {
    return Mock.mock({
      code: 200,
      data: null
    })
  }
})
Mock.mock('/mock/deletecollections/10001', { code: 200, data: null })
Mock.mock('/mock/deletelikings/10001', { code: 200, data: null })
Mock.mock('/mock/comments?type=a&source=10001&limit=5', { code: 200, data: comments, message: 'success' })
Mock.mock('/mock/comments?type=c&source=10000&limit=5', { code: 200, data: comments, message: 'success' })
Mock.mock('/mock/addcommentlike', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/deletecommentlike/10000', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/deletecommentlike/10001', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/deletecommentlike/10002', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/deletecommentlike/10003', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/deletecommentlike/10004', { code: 200, data: null, message: 'success' })
Mock.mock('/mock/addcomment', { code: 200, data: addcomment, message: 'success' })
