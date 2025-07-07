//setup.. this is similar to when we have our default tags in html
const express = require('express')
//cors is a middleware that allows us to host front end and backend on the same device
var cors = require('cors')
//activate or tell this app variable to be an express server
const app = express()
app.use(cors())
const router = express.Router()




//making an api using routes
//routes are used to handle browser requests. They look like urls. The difference is that when a browser requests a route, it is dynamically handled by using a function.

router.get("/songs", function(req, res){
    const songs = [
    {
        title: "We Found Love",
        artist: "Rihanna",
        popularity: 10,
        releaseDate: new Date("2011, 9, 22"),
        genre: ["electro house"]
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        releaseDate: new Date("2013, 11, 21"),
        genre: ["soul", "new soul"]
    }
    ];
  res.json(songs)
})


//all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)