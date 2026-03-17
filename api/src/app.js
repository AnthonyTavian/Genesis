require('dotenv').config()

const express = require('express')
const db = require('./db/database')
const cors = require('cors')
const sessionRoutes = require('./routes/session')
const offerRoutes = require('./routes/offer')
const rescueRoutes = require('./routes/rescue')

const app = express()
app.use(express.json())

app.use(cors())


const PORT = process.env.PORT || 3000

app.use('/session', sessionRoutes)
app.use('/offers', offerRoutes)
app.use('/rescues', rescueRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

module.exports = app