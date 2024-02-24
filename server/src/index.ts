/* eslint-disable node/prefer-global/process */
import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'

import { config } from 'dotenv'

config({ path: '../.env.local' })

const app = express()
const PORT = process.env.VITE_PORT || 3002
const TELEGRAM_FEAT_URL = process.env.VITE_TELEGRAM_FEAT_URL

app.use(cors())

app.get(TELEGRAM_FEAT_URL, (_: Request, res: Response) => {
  const isTelegramShareEnabled = true
  res.json({ isTelegramShareEnabled })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`)
})
