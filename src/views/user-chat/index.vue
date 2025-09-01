<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="小智同学">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
        v-for="(item, index) in message"
        :key="index"
        :title="item.msg"/>
    </van-cell-group>
    <!-- /消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"/>
      <van-button
        type="primary"
        size="small"
        @click="onSend"
      >发送</van-button>
    </van-cell-group>
    <!-- 发送消息 -->
  </div>
</template>

<script>
// 引入socket.io
import { getItem, setItem } from '@/utils/storage'
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messages: getItem('chat-messages') || [] // 消息列表
    }
  },
  created () {
    // 建立连接
    const socket = io('http://localhost')
    this.socket = socket
    socket.on('connect', () => {
      console.log('连接建立成功')
    })
    // socket.on('event', function (data) {})
    socket.on('disconnect', () => {
      console.log('断开连接了')
    })
    // 发送消息
    // socket.emit('消息类型'，消息内容) // 发消息
    // socket.on('消息类型'，function (data) { data消息 }) // 收消息
    // 监听 message 事件， 接收服务端消息
    socket.on('message', data => {
      // 把对方发给我的消息放到数组中
      console.log(data)
      this.messages.push(data)
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      // 请求发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把用户发出的消息存储到数组中
      this.messages.push(data)

      // 清空输入框
      this.message = ''
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    message () {
      setItem('chat-message', this.message)
      // 数据改变影响视图更新这件事不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  }
}
</script>

<style scoped lang="less">
.send-message-wrap {
    display: flex;
    padding: 0 28px;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: auto;
}
</style>
