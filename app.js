//setup.. this is similar to when we have our default tags in html
const express = require('express')
//activate or tell this app variable to be an express server
const app = express()

//start the web server... app.listen(portNumber, function)
app.listen(3000, function(){
    console.log('Listening on port 3000')
})

//making an api using routes
//routes are used to handle browser requests. They look like urls. The difference is that when a browser requests a route, it is dynamically handled by using a function.

//GET or a regular request when somenoe goes to http://localhost:3000/hello. When using a function and a route, we almost alays have a parameter or handle a response and request
