import express from 'express'
import cors from 'cors'

import routes from './routes'
import authMiddleware from './middlewares/auth' 

const app = express()

app.use(express.json())
app.use(cors())
app.use(authMiddleware)
app.use(routes)


app.listen(process.env.PORT || 4000)
