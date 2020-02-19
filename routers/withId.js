const express = require("express")
const db = require('../data/db');
const router = express.Router()

router.get("/:id", (req, res) => {
    const {id} = req.params
    console.log("by id", req.params)
   db.findById(id)
   .then(data => {
       res.json(data)
   })
   .catch(error => res.status(500).json({
       message: "could not find post"
   }))
})

router.delete("/:id", (req, res) => {
    const {id} = req.params
   db.findById(id)
   .then(post => {
       if(!post){
           res.status(404).json({
               message: "post not found"
           })
       } else {
           db.remove(id)
           .then(() => {
               res.status(202).json({
                   message: "post has been deleted"
               })
           })
       }

   })
   .catch(error => res.status(500).json({
       message: "post could not be removed"
   }))
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {title, contents} = req.body

    if (!title || !contents) {
        res.status(400).json({
          message: "please provide a title and contents"
        })
      }

   db.findById(id)
   .then(data => {
       if(!data){
        res.status(404).json({
            message: "post not found"
        })
       } else {
           db.update(id, req.body)
           .then(() => {
               res.status(202).json({
                   message: "post has been edited"
               })
           })
       }
   })
   .catch(error => res.status(500).json({
       message: "could not find post"
   }))
})

module.exports = router