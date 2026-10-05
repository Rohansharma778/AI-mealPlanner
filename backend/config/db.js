import pg from "pg";
import dotenv from "dotenv";

dotenv.config()

const {Pool} = pg;

const pool=new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
});

pool.query("SELECT NOW()",(err,res)=>{
    if(err){
        console.error('database connection failed',err)
    }
    else{
    console.log('database connected',res.rows[0]);
    }
})
export default pool;