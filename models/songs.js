const db = require("../db")

const Song = db.model("Song", {
    //hidden category of _ID
    title: {type: String, required: true},
    artist: String,
    popularity: {type: Number, min:1, max:10},
    releaseDate: {type: Date, deafult: Date.now},
    genre: [String],
    username: String
})

module.exports = Song