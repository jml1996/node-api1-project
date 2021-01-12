// import the server and start it
const server = require('./api/server')

server.listen(5000, () => {
    console.log(`Listening on 5000`)
})

// Ports allow many programs to run on same computer
// api.com port 5000, 3000, etc.
// We cannot start more than one program on the same port
// 