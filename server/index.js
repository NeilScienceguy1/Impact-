const express = require("express")
const environment = require("dotenv")
const cors = require("cors")
const authRouter = require("./routes/auth.router")
const todoRouter = require("./routes/todo.router")
const tagRouter = require("./routes/tag.router")
const connectDB = require("./config/db")

environment.config({
    path: "./config/config.env",
})

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/todo", todoRouter)
app.use("/api/tag", tagRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...")
})