const express = require('express')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

// middleware
app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true })
    
)

// Routes
app.use('/points', require('./routes/points'))
app.get('*', (req, res) => {
    res.status(404).send('404 Error')
})


const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
