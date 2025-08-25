<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        width="30"
        height="30"
        round
        center
        fit="cover"
        :src="user.photo"/>
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"></van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday"></van-cell>
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }">
      <!-- v-model简写
        当你传递给子组件的数据既要使用又要修改，例如这里的name
        这种情况可以使用 v-model简写代替下面内容
        :name = user.name
        @update-name="user.name = $event"
      -->
    <!--v-model="user.name"
        默认传递一个名字叫 value 的数据
        :value = "user.name"
        默认监听 input 事件 @input="user.name = $event"
        v-model 的本质还是父子组件通信，它仅仅是简化
    -->
      <UpdateName
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow = false"
    ></UpdateName>
    </van-popup>
    <!-- /修改昵称 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      //   console.log('getUserProfile', data)
      this.user = data.data
    }
  }
}
</script>

<style scoped lang="less">
van-popup{
    background-color: #f5f7f9;
}
</style>
