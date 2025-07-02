<template>
  <div class="search-container">
    <!-- 搜索栏 -->
     <!-- Tips: 在 van-search 外层增加 form 标签，
      且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
      v-model="searchText"
      show-action
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      />
   </form>
    <!-- /搜索栏 -->
    <!-- 搜索历史记录 -->
     <SearchHistory/>
    <!-- /搜索历史记录 -->
    <!-- 联想建议 -->
    <SearchSuggestion/>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <searchResult/>
    <!-- /历史记录 -->
</div>
</template>

<script>
import SearchHistory from './components/searh-history'
import SearchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    searchResult
  },
  props: {},
  data () {
    return {
      searchText: ''
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
