import { GetServerSideProps } from 'next'
import { SmileFilled } from '@ant-design/icons'
import { InputNumber } from 'antd'
import { DatePicker } from '../../components/AntdTime'
import dayjs from 'dayjs'
import useMounted from '../../hooks/useMounted'

interface AboutProps {
  id: number
  api: string
}
const About = (props: AboutProps) => {
  const mounted = useMounted()
  if (!mounted) return null
  console.log(props)
  return (
    <div className="p-6 md:p-12 lg:p-12 text-sm lg:text-lg">
      <div className="mb-2">
        <SmileFilled />
      </div>
      <div className="mb-2">
        <InputNumber min={2} max={50} />
      </div>
      <div className="mb-2">
        <DatePicker
          value={dayjs()}
          format="YYYY-MM-DD"
          style={{ width: 220 }}
        />
      </div>
      <p className="mb-2">id: {props.id}</p>
      <p className="mb-2">api from server side: {props.api}</p>
      <p className="mb-2 text-blue-400">
        api from client side: {process.env.NEXT_PUBLIC_API_URL}
      </p>
    </div>
  )
}

export default About

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(process.env.API_URL)
  return Promise.resolve({
    props: JSON.parse(JSON.stringify({ id: 13123, api: process.env.API_URL }))
  })
}
