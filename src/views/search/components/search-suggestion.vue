<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in Suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载有好处：只会把使用到的成员打包到结果中

import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Suggestions: ['aa', 'bb', 'aabb,ccc'] // 联想建议数据列表
    }
  },
  watch: {
    searchText: {
      // 当 searchText 发送改变的时候就会调用 handler 函数
      // 注意： handler 函数名称是固定的

      // debounce 函数
      // 参数1： 一个函数
      // 参数2： 延迟时间，单位是毫秒
      // 返回值： 防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      // 参数1： 匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2： 匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
 /deep/ span.active {
    color: #3296fa;
  }
}
</style>
