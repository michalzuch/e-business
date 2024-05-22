import cors = require('cors')
import express = require('express')
import router from './routes/users'

const app = express()
const PORT = 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
