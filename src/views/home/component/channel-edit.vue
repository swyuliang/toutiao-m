<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10"
      :border="false">
    <van-grid-item
      class="grid-item"
      v-for="(channel, index) in myChannels"
      :key="index"
      @click="onMyChannelClick(channel, index)"
    >
      <!--
        v-bind:class 语法
        一个对象，对象中的 key 表示要作用的 CSS 类名
        对象中的 value 要计算出布尔值
        true， 则作用该类名
        false， 不作用类名
      -->
      <van-icon
      v-show="isEdit && !fiexdChannels.includes(channel.id)"
        slot="icon"
        name="clear"
      ></van-icon>
      <span
        class="text"
        :class="{ active: index === active }"
        slot="text">{{ channel.name }}</span>
    </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
     <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >频道推荐</div>
    </van-cell>
    <van-grid class="recommed-grid" :gutter="10"
    :border="false">
    <van-grid-item
      class="grid-item"
      v-for="(channel, index) in recommendChannels"
      :key="index"
      icon="plus"
      :text="channel.name"
      @click="onAddChannel(channel)"
    />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [
        { id: 0, name: '推荐' },
        { id: 1, name: '推荐1' },
        { id: 2, name: '推荐2' },
        { id: 3, name: '推荐3' },
        { id: 4, name: '推荐4' },
        { id: 5, name: '推荐5' },
        { id: 6, name: '推荐6' },
        { id: 10, name: '推荐10' },
        { id: 11, name: '推荐11' },
        { id: 12, name: '推荐12' },
        { id: 13, name: '推荐13' },
        { id: 14, name: '推荐14' },
        { id: 15, name: '推荐15' },
        { id: 16, name: '推荐16' }
      ], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0] // 固定频道不允许被删除
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算属性会重新执行
    recommendChannels () {
      // 简化写法：数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
      // const channels = []
        // 数组的 find 方法：遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id // return channels
        })
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 遍历数组，找到满足条件的元素项
    //     const ref = this.myChannels.find(myChannels => {
    //       return myChannels.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ref) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels // 把计算结果返回
    // }
  },
  created () {
    this.loacdAllChannels()
  },
  mounted () {},
  methods: {
    async loacdAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel) // eslint-disable-line
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道ID
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          this.$toast('保持失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1.如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2.删除频道项
        this.myChannels.splice(index, 1) // eslint-disable-line
        // 3.如果删除的激活频道之前的频道，则更新激活的频道
        // 参数1：要删除的元素的索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4. 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;

    .title-text {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }

    /deep/.grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
          white-space: nowrap;
          background-color: #f4f5f6;
          .van-grid-item__text, .text {
              font-size: 28px;
              color: #222222;
              margin-top: 0;
          }
          .active {
            color: #f85959;
          }
          .van-grid-item__icon-wrapper {
            position: unset;
          }
        }
    }
    /deep/.my-grid {
      .grid-item {
        .van-icon-clear {
            position: absolute;
            right: 5px;
            top: -12px;
            font-size: 30px;
            color: #cacaca;
            z-index: 2;
        }
      }
    }

    /deep/.recommed-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
