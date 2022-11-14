require("dotenv").config()
const express = require("express")
console.log(process.env.JWT_SECRET)
const jwt = require("jsonwebtoken")
const usersRouter = express.Router();
const { getAllusers,getUserByUsername,createUsers } = require("../db/seed")
usersRouter.use((req,res,next) => {
    console.log("A request to /users")

    next();
})

usersRouter.get("/", async (req, res)=> {
    try {
    const users = await getAllusers();
    
    res.send({
        users
    })
    }catch(error){
        console.log(error)
    }
})
usersRouter.use("/login", async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password){
         next({
             name: "MissingCredentialError",
             message: "Please supply both username and password"
         })
    }
 
    try{
     const user = await getUserByUsername(username)
        console.log("this is the user:", user.password)
     if (user && user.password == password){
         const token = jwt.sign({ username: user.id, password: user.username}, process.env.JWT_SECRET);
        
         res.send({ message: "you're logged in!", token: token })
     } else{
         next({
             name: "InvalidCredentialError",
             message: "Invalid Password or Username"
         })
     }
    }catch(error){
         next(error)
    }
 })
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name, location } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      } else {
        const user = await createUsers({
            username,
            password,
            name,
            location,
          });
          console.log(user)
          const token = jwt.sign({ 
            username
          }, process.env.JWT_SECRET, {
            expiresIn: '1w'
          });
      
          res.send({ 
            message: "thank you for signing up",
            token 
          });
      }
  
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });



module.exports =  usersRouter