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
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      :PropDeleteSearchHistory="PropDeleteSearchHistory"
      :PropClearAllSearchHistory="PropClearAllSearchHistory"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
</div>
</template>

<script>
import SearchHistory from './components/searh-history'
import SearchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
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
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据,从本地存储获取历史数据，如果本地存储没有数据则赋值空数组
    }
  },
  created () {},
  mounted () {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索记录
      // 要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    PropDeleteSearchHistory (index) {
      this.searchHistories.splice(index, 1)
    },
    PropClearAllSearchHistory () {
      this.searchHistories = []
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
