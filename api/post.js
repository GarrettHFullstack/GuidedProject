const express = require("express")
const postRouter = express.Router()
const { getAllPosts } = require("../db/seed")

const { requireUser } = require('./utils');





postRouter.use( (req, res, next) => {
    console.log("entering the post section")
    next()
})

postRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;
  
    const tagArr = tags.trim().split(/\s+/)
    const postData = {};
  
    // only send the tags if there are some to send
    if (tagArr.length) {
      postData.tags = tagArr;
    }
  
    try {
      // add authorId, title, content to postData object
      // const post = await createPost(postData);
      // this will create the post and the tags for us
      // if the post comes back, res.send({ post });
      // otherwise, next an appropriate error object 
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

postRouter.get("/", async (req, res) => {
    const post = await getAllPosts();

    res.send(
        {
            post
        }
    )
})


module.exports = postRouter