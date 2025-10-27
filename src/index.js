import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import pool from "./config/db.js";
import userRouter from "./routes/userRouter.js"
import errorHandler from "./middleware/errorHandler.js"

dotenv.config()

//app instance
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors())

//TEST the db
app.get("/", async (req,res)=>{
      console.log('start')
      const result= await pool.query('SELECT current_database()');
      console.log("end")
      res.send(`the db name is: ${result.rows[0].current_database} `)
})

//define routes 
app.use("/api", userRouter)

//error middleware
app.use(errorHandler)
//define PORT
const port = process.env.PORT || 3001
app.listen(port, ()=>{
      console.log("node api created at", port)
})

