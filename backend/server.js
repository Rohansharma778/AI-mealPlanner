import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import pantryRoutes from './routes/pantry.js'
import recipeRoutes from './routes/recipes.js'
import mealPlanRoutes from './routes/mealPlan.js'
import ShoppingListRoutes from "./routes/shoppingList.js";

dotenv.config()

const app=express();
const PORT=process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))    


app.get('/',(req,res)=>{
    res.json({message:'AI Recipe generate API'})
})

//API routes
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/pantry',pantryRoutes)
app.use('/api/recipes',recipeRoutes)
app.use('/api/meal-plans',mealPlanRoutes)
app.use('/api/shopping-list',ShoppingListRoutes)



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Environment :${process.env.NODE_ENV ||'development'}`); 
})
