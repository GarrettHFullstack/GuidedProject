const express = require("express")
const tagsRouter = express.Router()
const {getAllTags} = require("../db/seed")

tagsRouter.use((req,res,next) => {
    console.log("now entering tag zone")
    next()
})

tagsRouter.get("/", async (req, res) => {
    const tags = await getAllTags();

    res.send(
        {
            tags
        }
    )
})

module.exports = tagsRouter