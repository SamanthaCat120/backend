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
//Grab a single song in the database
router.get("/songs/:id", async (req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
     catch (err) {
            res.status(400).send(err)
    }
})


//added a song to the database
router.post("/songs", async(req,res) => {
    try{
        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch (err){
        res.status(400).send(err)
    }
})

//update is to update an exisiting record/resource/database entry. It uses a put request.
router.put("/songs/:id", async (req, res) => {
    //first find the song that needs to be updated
    //request id of song from request and find it in the database to be updated
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
        }
    })

router.delete("/songs/:id", async (req, res) => {
        //method or function in mongoose/mongo to delete a single instance of a song or object
    try {
        const song = await Song.findById(req.params.id)
        await Song.deleteOne({_id: song._id})
        res.status(204).send()
    }

    catch(err){
                res.status(400).send(err)
            }
    })


//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)
