const express = require("express")
const db = require('../data/db');
const router = express.Router()

router.get("/:postId/comments", (req, res) => {
    const  { postId }  = req.params
    console.log("howdy", req.params)
    db.findPostComments(postId)
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                res.status(404).json({
                    message: "comments not found"
                })
            }
        })
        .catch(error => res.status(500).json({
            message: "could not get comment"
        }))
})

router.post("/:id/comments", (req, res) => {
    const { text } = req.body
    if(text){
         db.findById(req.params.id)
            .then(([post]) => {
                if (post) {
                     db.insertComment({...req.body, post_id: req.params.id})
                     .then(({id}) => {

                         db.findCommentById(id).then(([comment]) => {
                             res.status(201).json(comment)

                         })
                     })
                     .catch(error => res.status(500).json({
                message: "could not post comment"
            }))
                } else {
                    res.status(404).json({
                        message: "post with the id has not been found"
                    })
                }
            })
            .catch(err => res.status(500).json({
                error: "their was a error saving the comment"
            })) 
           } else {
               res.status(400).json({
                   error: "no comment inserted"
               })
           }
        
            
    })







module.exports = router