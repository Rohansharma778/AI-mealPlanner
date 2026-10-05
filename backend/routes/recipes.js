import express from 'express';
const router = express.Router();

import * as recipeController from '../controllers/RecipeController.js';
import authMiddleware from '../middleware/auth.js';

// All routes are protected
router.use(authMiddleware);

router.post('/generate', recipeController.generateRecipe);
router.get('/', recipeController.getRecipesSuggestions);
// Specific routes MUST come before /:id
router.get('/recent', recipeController.getRecentRecipes);
router.get('/stats', recipeController.getRecipeStats);
// Dynamic ID route comes AFTER specific routes
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.saveRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

export default router;
