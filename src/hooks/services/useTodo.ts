import useSWR from 'swr'
import { apiGet } from '../../utils/request'

export function useTodoSearch() {
  const { data, error, ...rest } = useSWR('/api/todo', apiGet, {
    revalidateOnFocus: false
  })
  return {
    todos: data as any,
    isLoading: !error && !data,
    isError: error,
    ...rest
  }
}
