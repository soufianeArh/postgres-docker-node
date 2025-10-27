import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const {Pool} = pkg;

const pool=new Pool({
      host: process.env.PGHOST,
      // port:Number(process.env.PGPORT),
      port:process.env.PGPORT,
      user: process.env.USER,
      password:process.env.USERPASSWORD,
      database: process.env.DBNAME
})

pool.on("connect", ()=>{
      console.log("db connected via pool")
});

export default pool