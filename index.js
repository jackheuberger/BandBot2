const express = require('express')
const bodyparser = require('body-parser')
const axios = require('axios')
const util = require('util')
const fs = require('fs')

require('dotenv').config()

const readFile = util.promisify(fs.readFile)

const app = express()
app.use(bodyparser.json())
const port = 3333

params = {
    bot_id: process.env.BOT_ID,
    text: "Hello World!"
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    console.log(req.body)
    if(req.body.text.toLowerCase().includes('chazz')){
        quote = await pullQuote()
        axios.post("https://api.groupme.com/v3/bots/post", {bot_id: process.env.BOT_ID, text: `"${quote}"`})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

async function pullQuote() {
    let quotes = await readFile('lists/ChazzQuotes.txt')
    quotes = quotes.toString().split('\n')
    return quotes[Math.floor(Math.random() * quotes.length)]
}