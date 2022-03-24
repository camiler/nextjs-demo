let todos = ['take care of baby', 'finish nextjs todo demo', 'reading book']

export default function handler(req, res) {
  const {
    query: { key },
    body,
    method
  } = req

  switch (method) {
    case 'GET':
      const result = key ? todos.filter((item) => item.includes(key)) : todos
      res.status(200).json(result)
      break
    case 'POST':
      res.status(200).json(todos.push(body.todo))
      break
    case 'DELETE':
      if (!key) {
        res.status(400)
      } else {
        todos = todos.filter((item) => !item.includes(key))
        res.status(200).json(todos)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
