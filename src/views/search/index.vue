<template>
  <div class="search-container">
    <!-- 搜索栏 -->
     <!-- Tips: 在 van-search 外层增加 form 标签，
      且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form class="search-form" action="/">
      <van-search
      v-model="searchText"
      show-action
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
      />
   </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <searchResult
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
     <SearchHistory v-else />
    <!-- /搜索历史记录 -->
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
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
