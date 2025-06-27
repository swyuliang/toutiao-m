import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// dayjs 默认语言是英文，我们这里配置为中文

dayjs.locale('zh-cn')  // 配置全局使用

// dayjs() 获取当前最新时间
console.log(dayjs().format('YYYY-MM-DD'))