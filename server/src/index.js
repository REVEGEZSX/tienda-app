const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constantes')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

//importar rutas
const authRoutes = require('./routes/rutas')

//inicializar rutas
app.use('/api', authRoutes)

//ejecucion de la aplicacion
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`la aplicacion esta corriendo en: [http://localhost:${PORT}]`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
appStart()