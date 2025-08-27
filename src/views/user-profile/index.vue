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
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange">
    <!-- /导航栏 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"/>
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"></van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isEditGenderShow = true"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow = true"></van-cell>
    <!-- 修改头像 -->
     <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }">
      <UpdatePhoto
        v-if="isEditPhotoShow"
        :file="previewImage"
        @update-photo="user.photo = $event"
        @close="isEditPhotoShow = false"
      ></UpdatePhoto>
    </van-popup>
    <!-- /修改头像 -->
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
    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom">
      <UpdateGender
        v-if="isEditGenderShow"
        v-model="user.gender"
        @close="isEditGenderShow = false"
      ></UpdateGender>
    </van-popup>
    <!-- /修改性别 -->
    <!-- 修改生日 -->
     <van-popup
      v-model="isEditBirthdayShow"
      position="bottom">
      <UpdateBirthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      ></UpdateBirthday>
    </van-popup>
    <!-- /修改生日 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑昵称组件的显示状态
      isEditGenderShow: false, // 编辑性别组件的显示状态
      isEditBirthdayShow: false, // 编辑生日组件的显示状态
      isEditPhotoShow: false, // 编辑头像组件的显示状态
      previewImage: null // 预览图片
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
    },
    onFileChange () {
      // console.log('123')
      // 展示弹出层，在弹出层中预览图片
      const file = this.$refs.file.files[0]
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      // console.log('blob', blob)
      this.previewImage = file
      this.isEditPhotoShow = true
      // 为了解决相同上传相同文件不触发 change 事件，所有手动清空 file 的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
van-popup{
    background-color: #f5f7f9;
}
.update-photo-popup{
  background-color: black;
}
</style>
