<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="name-field-wrap">
        <van-field
          v-model="localName"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  //   props: ['name'],
  props: ['value'],
  data () {
    return {
      //   localName: this.name
      localName: this.value // v-model简写，props传递value
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
    //   console.log('完成')
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      try {
        // 请求提交更新用户昵称
        await updateUserProfile({
        //   name: this.localName // v-model简写
          name: this.value
        })
        // 更新成功 -> 修改父组件的 name -> 关闭弹出层
        // this.$emit('update-name', this.localName)
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.name-field-wrap {
    padding: 20px;
}
</style>
