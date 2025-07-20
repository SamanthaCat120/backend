//setup.. this is similar to when we have our default tags in html
const express = require('express')
//cors is a middleware that allows us to host front end and backend on the same device
var cors = require('cors')
//activate or tell this app variable to be an express server

const bodyParser = require('body-parser')
const Song = require("./models/songs")
const app = express()

app.use(cors())

app.use(bodyParser.json())
const router = express.Router()

//grab all the songs in a database
router.get("/songs", async (req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)



//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)