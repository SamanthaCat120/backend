const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:password255@songdb.w372fin.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", {useNewUrlParser: true})

module.exports = mongoose