const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Backend!')
})

app.get('/register', (req, res) => {
    res.send('Welcome to register!')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
}) 