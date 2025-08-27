<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :default-index = "defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: ['value'],
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  created () {},
  mounted () {},
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
    //   console.log('完成')
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时间
      })
      //   try {
      // 请求提交更新用户性别
      await updateUserProfile({
        gender: this.defaultIndex
      })
      // 更新成功 -> 修改父组件的 性别 -> 关闭弹出层
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    //   } catch (err) {
    //     if (err && err.response && err.response.status === 409) {
    //       this.$toast.fail('保存失败')
    //     }
    //   }
    }
  }
}
</script>

<style scoped lang="less"></style>
