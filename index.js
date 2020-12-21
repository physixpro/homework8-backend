const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/Facebook?retryWrites=true&w=majority',{ useUnifiedTopology:true, useNewUrlParser:true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback (){
    console.log("database is up and running")
} )

app.get('/', async(req, res) => {
    const feed = await db.collection('feed').find({}).toArray;
    res.json(feed)
})

app.get('/:name', async(req,res) => {
    const name = req.params.name 
    const feed = await db.collection('feed').find({name:name}).toArray()
    res.json(feed)
})

app.get('/status/:status', async(req,res) => {
    const status = req.params.status
    const feed = await db.collection('feed').find({status:status}).toArray()
    res.json(feed)
})

app.get('/sex/:sex', async(req,res) => {
    const sex = req.params.sex 
    const feed = await db.collection('feed').find({sex:sex}).toArray()
    res.json(feed)
}) 

app.post('/feed', async(req,res) => {
    const message = req.body;
    const x = await db.collection('feed').insertOne(message)
    console.log(message)
    res.json('successfully created')

    app.post('/pets', async (req,res) => {
        const pet = req.body;
        const x = await db.collection('pets').insertOne(pet)
        res.json('successfully created a pet document')
    })
})
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on port ${port}...`))