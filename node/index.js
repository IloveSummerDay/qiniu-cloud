import dotenvx from '@dotenvx/dotenvx'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import testRouter from './test.js'

dotenvx.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', testRouter)

app.listen(12306, () => {
    console.log(`Server is running on port ${12306}`)
})
