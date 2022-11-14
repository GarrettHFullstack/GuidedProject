
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { getUserById } = require("../db")
const { JWT_SECRET } = process.env
const express = require("express")
const apiRouter = express.Router();


apiRouter.use(async (req, res, next) => {
    console.log("first middleware router")
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
        console.log(token)
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id); 
        }
        
        next();
      } catch ({ name, message }) {
        console.log("this was said")
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });



const usersRouter = require("./users")
apiRouter.use("/users", usersRouter)

const tagRouter = require("./tags")
apiRouter.use("/tags", tagRouter)

const postRouter = require("./post")
apiRouter.use("/posts", postRouter)

apiRouter.use((error, req,res, next) => {
    res.send({
        name: error.name,
        message: error.message
    })
})

module.exports = apiRouter