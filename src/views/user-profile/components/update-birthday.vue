<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: ['value'],
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
    //   console.log('完成')
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时间
      })

      // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      //   try {
      // 请求提交更新用户出生日期
      await updateUserProfile({
        birthday: date
      })
      // 更新成功 -> 修改父组件的 出生日期 -> 关闭弹出层
      this.$emit('input', date)
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
