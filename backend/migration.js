import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from 'pg';


const {Pool}=pkg;
const __filename=fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename)

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 8000,
    host: process.env.DB_HOST
});


async function runMigration(){
    const client =await pool.connect()

    try {
        console.log('running database migration')

        //read schema
        const schemaPath=path.join(__dirname,'config','schema.sql')
        const schemaSql=fs.readFileSync(schemaPath,'utf8')
        
        //excute the schema
        await client.query(schemaSql)

        console.log('db migration complted successfully')
        console.log('table created:',)
        console.log('   -users');
        console.log('   -user_preferences');
        console.log('   -pantry items');
        console.log('   -recipes');
        console.log('   -recipes_ingrediants');
        console.log('   -recipes_nutrition');
        console.log('   -meal_plans');
        console.log('   -shopping_list_items');
    } catch (error) {
        console.error(`ERROR:${error}`)
        process.exit(1)
    }finally{
        client.release()
        await pool.end()
    }
}

runMigration()