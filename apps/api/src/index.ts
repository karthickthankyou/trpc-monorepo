require('dotenv').config()

import cors from 'cors'
import express from 'express'

import { trpcExpress } from '@foundation-trpc/trpc-server'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello mars!')
})

app.use('/trpc', trpcExpress)

app.listen(8080, () => console.log(`Listening on port 8080`))
