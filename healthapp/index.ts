import express, { type Request, type Response } from 'express'

const app = express()
const port = 3003

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
