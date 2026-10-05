import Recipe from '../models/Recipe.js'
import PantryItem from '../models/PantryItem.js'
import {generateRecipe as generateRecipeAI,generatePantrySuggestions as generatePantrySuggestionAI} from '../utils/gemini.js'

//generate recipe using AI
export const generateRecipe = async (req, res, next) => {
    try {
        const {
            ingredients = [],
            usePantryIngredients = false,
            dietaryRestrictions = [],
            cuisineType = 'any',
            servings = 4,
            cookingTime = 'medium'
        } = req.body;

        let finalIngredients = [...ingredients];

        // Add pantry ingredients if required
        if (usePantryIngredients) {
            const pantryItems = await PantryItem.findByUserId(req.user.id);

            const usePantryIngredientsNames =
                pantryItems.map(item => item.name);

            finalIngredients = [
                ...new Set([
                    ...finalIngredients,
                    ...usePantryIngredientsNames
                ])
            ];
        }

        if (finalIngredients.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one ingredient'
            });
        }

        // Generate recipe using Gemini
        const recipe = await generateRecipeAI({
            ingredients: finalIngredients,
            dietaryRestrictions,
            cuisineType,
            servings,
            cookingTime
        });

        res.status(200).json({
            success: true,
            message: 'Recipe generated successfully',
            data: { recipe }
        });

    } catch (error) {
        next(error);
    }
};


//save recipe
export const saveRecipe=async(req,res,next)=>{
    try {
        const recipe=await Recipe.create(req.user.id,req.body);
        res.status(201).json({
            success:true,
            message:'Recipe saved successfully',
            data:{recipe}
        })
    } catch (error) {
        next(error);
    }
}


//get all recipes
export const getRecipesSuggestions=async(req,res,next)=>{
    try {
        const {search,cuisine_type,difficulty,dietary_tag,max_cook_time,sort_by,sort_order,limit,offset}=req.query;

        const recipes=await Recipe.findByUserId(req.user.id,{
            search,
            cuisine_type,
            difficulty,
            dietary_tag,
            max_cook_time,
            sort_by,
            sort_order,
            limit:limit?parseInt(limit):undefined,
            offset:offset?parseInt(offset):undefined
        })      
        res.json({
            success:true,
            data:{recipes}
        });
    } catch (error) {
        next(error);
    }
}

//get recent recipes

export const getRecentRecipes=async(req,res,next)=>{
    try {
        const limit=parseInt(req.query.limit)
        const recipes=await Recipe.getRecent(req.user.id,limit)

        res.json({
            success:true,
            data:{recipes}
        })
    } catch (error) {
        next(error);
    }
}

//get recipe by id

export const getRecipeById=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const recipe=await Recipe.findById(id,req.user.id);

        if(!recipe){
            return res.status(400).json({
                success:false,
                message:'recipe not found'
            })
        }

        res.json({
            success:true,
            message:'The required recipe',
            data:{recipe}
        })
    } catch (error) {
        next(error);
    }
}

//update recipe
export const updateRecipe=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const recipe=await Recipe.update(id,req.user.id,req.body);

        if(!recipe){
            return res.status(404).json({
                success:false,
                message:'recipe not found'
            })
        }

        res.json({
            success:true,
            message:'Recipe updated successfully',
            data:{recipe}
        })
    } catch (error) {
       next(error ) 
    }
}

//get recipe stats

export const getRecipeStats=async(req,res,next)=>{
    try {
        const stats=await Recipe.getStats(req.user.id);

        res.json({
            success:true,
            data:{stats}
        })
    } catch (error) {
        next(error)
    }
}

export const deleteRecipe=async(req,res,next)=>{
    try {
        const {id}=req.params
        const result=await Recipe.delete(id,req.user.id);

        if(!result){
            return res.status(404).json({
                success:false,
                message:'recipe not found'
            })
        }

        res.status(200).json({
            success:true,
            message:'recipe deleted successfully',
            data:{result}
        })
    } catch (error) {
        next(error)
    }
}

