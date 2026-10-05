import dotenv from 'dotenv';
import {GoogleGenAI} from "@google/genai";

dotenv.config();

const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

if(!process.env.GEMINI_API_KEY){
    console.error('WARNING  : GEMINI AI KEY IS NOT SET ,AI FEATURES WILL NOT WORK.')
}

export const generateRecipe=async({ingredients,dietaryRestrictions=[],cuisineType='any',servings=4,cookingTime='medium'})=>{
    const dietaryInfo=dietaryRestrictions.length>0
    ?`Dietary restriction:${dietaryRestrictions.join(', ')}`
    :'No dietary restriction'

    const timeGuide={
        quick:'under 30 min',
        medium:'30-60 min',
        long:'over 60 min'
    }

        const prompt=`Generate a detailed recipe with the following requirments:
        Ingredients available: ${ingredients. join(', ')}
        ${dietaryInfo}
        Cuisine type: ${cuisineType}
        Servings: ${servings}
        Cooking time: ${timeGuide[cookingTime] || 'any'}
        Please provide a complete recipe in the following JSON format (return ONLY valid JSON, no markdown):
        {
        "name": "Recipe name",
        "description": "Brief description of the dish",
        "cuisineType": "${cuisineType}",
        "difficulty": "easy|medium|hard",
        "prepTime": number (in minutes),
        "cookTime": number (in minutes),
        "servings": ${servings},
        "ingredients": [
        {"name": "ingredient name", "quantity": number, "unit": "unit of measurement"}
        ],
        "instructions": [
        "Step 1 description",
        "Step 2 description"
        ],
        "dietaryTags": ["vegetarian", "gluten-free", etc.],
        "nutrition": {
        "calories": number,
        protein:number (grams),
        carbs:number (grams),
        fats:number (grams),
        fiber:number (grams)
        },
        "cookingTips":["tip 1","tip 2"]
        }
        make sure  the recipe is creative ,delicious and uses the provided ingredients effectively.`


        try{
            let response;

            // Retry Gemini request up to 3 times for temporary errors
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    console.log(`Gemini attempt ${attempt}/3`);

                    response=await ai.models.generateContent({
                        model:'gemini-3.8-flash',
                        contents:prompt
                    });

                    break;

                } catch (error) {
                    console.error(
                        `Gemini attempt ${attempt} failed:`,
                        error.status
                    );

                    // Retry only for temporary errors
                    if (
                        (error.status === 503 || error.status === 429) &&
                        attempt < 3
                    ) {
                        const delay = attempt * 2000;

                        console.log(
                            `Retrying in ${delay / 1000} seconds...`
                        );

                        await new Promise(resolve =>
                            setTimeout(resolve, delay)
                        );
                    } else {
                        throw error;
                    }
                }
            }

            const generateText=response.text.trim();

            //remove markdown code block if present
            let jsonText=generateText;

            if(jsonText.startsWith('```json')){
                jsonText=jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g,'')
            }
            else if (jsonText.startsWith('```')){
                jsonText=jsonText.replace(/```\n?/g,'')
            }
            const recipe=JSON.parse(jsonText);
            return recipe;
        }
        catch(error) {
            console.error('========== GEMINI API ERROR ==========');
            console.error(error);
            console.error('======================================');
        
            throw new Error('Failed to generate recipe. Please try again');
        }

}


export const generatePantrySuggestions=async(pantryItems,expiringItems=[])=>{
    const ingredients=pantryItems.map(item=>item.name).join(',');
    const expiringText=expiringItems.length>0
    ?`\nPriority ingredient (expiring soon):${expiringItems.join(',')}`
    : '';

    const prompt=`based on these available ingredients:${ingredients}${expiringText}
    Suggest 3 creative recipe ideas that use these ingredients.Return Only a JSON array of the strings (no markdown):
    ["Recipe idea 1","Recipe idea 2","Recipe idea 3"]
    
    Each suggestion should be a brief, appetizing  description (1-2 sentences).`
    try {
        const response =await ai.models.generateContent({
            model:'gemini-3.8-flash',
            contents:prompt
        })
        let generatedText=response.text.trim();

        //remove makdown if present
        if(generatedText.startsWith('```json')){
            generatedText=generatedText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
        }
        else if(generatedText.startsWith('```')){
            generatedText=generatedText.replace(/```\n?/g, '');
        }

        const suggestions=JSON.parse(generatedText);
        return suggestions;
    } catch (error) {
        console.error('Gemini API error:',error)
        throw new Error('Failed to generate suggestions');
    }
}

export const generatedCookingTips=async(recipe)=>{
    const prompt=`For this recipe:"${recipe.name}"
    Ingredients:${recipe.ingredients?.map(i=>i.name).join(', ')||'N/A'}
    Provide 3-5 helpful cooking tips to make this recipe better.Return only a JSON array of string (no markdown):
    ["Tip 1","Tip 2","Tip 3"]`;

    try {
        const response =await ai.models.generateContent({
            model:'gemini-3.8-flash',
            contents:prompt,
        })

        let generatedText=response.text.trim();
        if(generateText.startsWith('```json')){
            generateText=generateText.replace(/```json\n?/g, '').replace(/```\n?$/g, '')
        }
        else if(generatedText.startsWith('```')){
            generatedText=generatedText.replace(/```\n?/g, '');
        }

        const tips =JSON.parse(generatedText);
        return  tips
    } catch (error) {
        console.error('Gemini API error:',error)
        return ['Cook with love and paitence!']        
    }
}

export default{
    generateRecipe,
    generatePantrySuggestions,
    generatedCookingTips
}


