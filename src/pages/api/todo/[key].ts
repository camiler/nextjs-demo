const todos = ['take care of baby', 'finish nextjs todo demo', 'reading book']

export default function handler(req, res) {
  const {
    query: { key },
    method
  } = req

  if (method === 'GET') {
    const result = key ? todos.filter((item) => item.includes(key)) : todos
    res.status(200).json(result)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
