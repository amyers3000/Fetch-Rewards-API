const express = require('express')
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())


// Test
// app.get('/', (req, res) => {
//     res.send('Home')
// })

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
