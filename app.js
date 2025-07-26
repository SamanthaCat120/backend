//setup.. this is similar to when we have our default tags in html
const express = require('express')
//cors is a middleware that allows us to host front end and backend on the same device
var cors = require('cors')


const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users")
const Song = require("./models/songs")
//activate or tell this app variable to be an express server
const app = express()

app.use(cors())

app.use(bodyParser.json())
const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json("Missing username or password");
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
//authenticate or login
//post request - when you login, you're creating a new session
router.post("/auth", async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
        return;
    }
    //try to find username in database, see if it matches with a username and password
    //await finding a user
    try {
    let foundUser = await User.findOne({ username: req.body.username });
    
    if (!foundUser) {
        return res.status(401).json({ error: "Bad Username" });
    }

    if (foundUser.password !== req.body.password) {
        return res.status(401).json({ error: "Bad Password" });
    }

    const token = jwt.encode({ username: foundUser.username }, secret);
    res.json({
        username2: foundUser.username,
        token,
        auth: 1
    });

} catch (err) {
    res.status(400).send(err);
}
});

//check status of user with a valid token, see if it matches the frontend token
router.get("/status", async (req, res) => {
    //check if the token is valid
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing X-Auth"})
    }
    //if x-auth contains the token (it should)
    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token, secret)
        
        //send back all username and status fields to the user or frontend

        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "Invalid jwt token"})
    } 
})



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

var port = process.env.PORT || 3000
app.listen(port)
