const express=require("express")
const cookieParser = require('cookie-parser');

const db=require("./models/index")
const { userRoute } = require("./routes/user.routes")
const { authenticate } = require("./middleware/auth");
const { postRoute } = require("./routes/post.routes");
const { commentRoute } = require("./routes/comment.routes");

const cors=require("cors")

require("dotenv").config()
const app=express()
app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Welcome to Backend")
})


app.use("/", userRoute)
app.use("/api", postRoute)
app.use("/", commentRoute)

db.sequelize.sync().then(()=>{
    app.listen(4500, ()=>{
        console.log("Server started");
    })
})