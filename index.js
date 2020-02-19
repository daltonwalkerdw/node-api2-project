const express = require('express')

const basic = require("./routers/basic")
const comments = require("./routers/comments")
const withId = require("./routers/withId")

const server = express()

server.use(express.json())
server.use("/api/posts", basic)
server.use("/api/posts", withId)
server.use("/api/posts", comments)



server.listen(8080, () => {
    console.log("Server is listening on port 8080")
} )