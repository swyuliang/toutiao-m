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
    <van-cell-group class="message-list">
      <van-cell title="单元格1"/>
      <van-cell title="单元格2"/>
      <van-cell title="单元格3"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格"/>
      <van-cell title="单元格1"/>
      <van-cell title="单元格2"/>
      <van-cell title="单元格3"/>
    </van-cell-group>
    <!-- /消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"/>
      <van-button type="primary" size="small">发送</van-button>
    </van-cell-group>
    <!-- 发送消息 -->
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: ''
    }
  },
  created () {},
  mounted () {},
  methods: {}
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
