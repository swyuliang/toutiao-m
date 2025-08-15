/**
 * 频道请求模块
 */
// import request from '@/utils/request'
import mockRequests from '@/utils/mockAjax'

/**
 * 获取所有频道列表
 */

// export const getAllChannels = () => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_0/channels'
//   })
export const getAllChannels = () => {
  return mockRequests({
    method: 'GET',
    url: '/channels'
  })
}
/**
 * 添加用户频道
 */
// export const addUserChannel = channel => {
//   return request({
//     method: 'PATCH',
//     url: '/app/v1_0/user/channels',
//     data: {
//       channels: [channel]
//     }
//   })
// }
export const addUserChannel = channel => {
  return mockRequests({
    method: 'PATCH',
    url: '/channels',
    data: {
      channels: [channel]
    }
  })
}
/**
 * 删除用户指定频道
 */
// export const deleteUserChannel = channelId => {
//   return request({
//     method: 'DELETE',
//     url: `/app/v1_0/user/channels/${channelId}`
//   })
// }
export const deleteUserChannel = channelId => {
  return mockRequests({
    method: 'DELETE',
    url: `/channels/${channelId}`
  })
}

// ************mock*************
