import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'

const TELEGRAM_FEAT_URL = '/api/tg-feat-flag'

const app = express()
const PORT = 3000

app.use(cors())

app.get(TELEGRAM_FEAT_URL, (_: Request, res: Response) => {
  const isTelegramShareEnabled = true
  res.json({ isTelegramShareEnabled })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`)
})
