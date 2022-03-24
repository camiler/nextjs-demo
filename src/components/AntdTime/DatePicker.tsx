import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs"
import generatePicker from "antd/lib/date-picker/generatePicker"
import "dayjs/locale/zh-cn"
import locale from "antd/lib/date-picker/locale/zh_CN"

const Picker = generatePicker(dayjsGenerateConfig)

const DatePicker = (props) => {
  return <Picker {...props} locale={locale} />
}

export default DatePicker
