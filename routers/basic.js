const express = require("express")
const db = require('../data/db');
const router = express.Router()

router.get("/", (req, res) => {
   db.find()
   .then(post => {
       res.json(post)
   })
   .catch(error => res.status(500).json({
       message: "could not get post"
   }))
})

router.post("/", (req, res) => {
  const {title, contents} = req.body

  if (!title || !contents) {
    res.status(400).json({
      message: "please provide a title and contents"
    })
  }

    db.insert({title, contents})
    .then((res) => db.findById(res.id))
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => res.status(500).json({
        message: "could not add post"
    }))
 })


module.exports = router