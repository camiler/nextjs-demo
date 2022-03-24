import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Input, message, Skeleton } from 'antd'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useTodoSearch } from '../../hooks/services/useTodo'
import { apiDelete, apiGet, apiPost } from '../../utils/request'

const debounce: any = (func, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
const Todo = () => {
  const [value, setValue] = useState<string>('')
  const { mutate } = useSWRConfig()
  const { todos, isError, isLoading, mutate: searchMutate } = useTodoSearch()

  const debouncedSearch = debounce(async (key) => {
    const res = await apiGet(`/api/todo?key=${key}`)
    mutate(`/api/todo`, res, {
      revalidate: false,
      populateCache: true
    })
  }, 300)

  const handleDelete = async (key) => {
    const res = await apiDelete(`/api/todo?key=${key}`)
    if (res) {
      message.success('remove success')
      searchMutate()
    }
  }

  // the same width handleDelete
  const handleAdd = async () => {
    const res = await apiPost('/api/todo', { todo: value })
    if (res) {
      message.success('add success')
      searchMutate()
    }
  }

  if (isLoading) return <Skeleton active />
  if (isError) return <Empty />
  return (
    <>
      <div className="mb-3">
        <Input
          className="w-40 mr-3"
          onChange={(e) => {
            setValue(e.target.value)
          }}
          value={value}
        ></Input>
        <Button onClick={handleAdd}>add todo</Button>
      </div>
      <div className="mb-3">
        <Input
          placeholder="please input key to search todos"
          className="w-64 mr-3"
          onInput={(e) => {
            debouncedSearch(e.currentTarget.value)
          }}
        ></Input>
      </div>
      <Card title="todo list" className="">
        {(todos || []).map((item) => {
          return (
            <div className="p-2 leading-7 h-7" key={item}>
              <span className="inline-block mr-3">{item}</span>
              <DeleteOutlined
                onClick={() => handleDelete(item)}
                className="text-red-400 inline-block align-middle"
              />
            </div>
          )
        })}
      </Card>
    </>
  )
}

// export const getServerSideProps = async () => {
//   const data = await apiGet('/api/todo')
//   return { props: { list: data } }
// }

export default Todo
