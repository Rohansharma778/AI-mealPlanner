import ShoppingList from '../models/ShoppingList.js'



//generating shopping list from meal plan
export const generateFromModelPlan=async(req,res,next)=>{
    try {
        const {startDate,endDate}=req.body

        if(!startDate||!endDate){
            return res.status(400).json({
                success:false,
                message:'Please provide start-date and end-date'
            })
        }

        const items=await ShoppingList.generateFromModelPlan(req.user.id,startDate,endDate)

        res.status(200).json({
            success:true,
            message:'shopping list generated from meal plan',
            data:{items}
        })
    } catch (error) {
        next(error)
    }
}

//get shoppong list

export const getShoppingList=async(req,res,next)=>{
    try {
        const grouped=req.query.grouped==='true'

        const items=grouped
        ?await ShoppingList.getGroupedByCategory(req.user.id)
        :await ShoppingList.findByUserId(req.user.id)

        res.status(200).json({
            success:true,
            message:'your shopping list',
            data:{items}
        })
    } catch (error) {
        next(error)
    }
}

//add item to shopping list

export const addItem=async(req,res,next)=>{
    try {
        const item=await ShoppingList.create(req.user.id,req.body)

        res.status(201).json({
            success:true,
            message:'item added to shopping list',
            data:{item}
        })
    } catch (error) {
        next(error)
    }
}

//update shopping list item 

export const updateItem=async(req,res,next)=>{
    try {
        const {id}=req.params
        const item=await ShoppingList.update(id,req.user.id,req.body)

        if(!item){
            return res.status(404).json({
                success:false,
                message:'shopping list item not found'
            })
        }

        res.status(200).json({
            success:true,
            message:'item updated successfully',
            data:{item}
        })
    } catch (error) {
      next(error)  
    }
}

//toggle item checked status

export const toggleChecked=async(req,res,next)=>{
    try {
        const {id}=req.params
        const item=await ShoppingList.toggleChecked(id,req.user.id)

        if(!item){
            return res.status(404).json({
                success:false,
                message:'shopping list item not found'
            })
        }

        res.status(200).json({
            success:true,
            message:'item checked',
            data:{item}
        })
    } catch (error) {
        next(error)
    }
}

//delete shopping list item

export const deleteItem=async(req,res,next)=>{
    try {
        const {id}=req.params
        const item=await ShoppingList.delete(id,req.user.id)
        
        if(!item){
            return res.status(404).json({
                success:false,
                message:'shopping list itme not found'
            })
        }

        res.status(200).json({
            success:true,
            message:'list deleted successfully',
            data:{item}
        })
    } catch (error) {
        next(error )
    }
}


//clear checked item 

export const clearChecked=async(req,res,next)=>{
    try {
        const items=await ShoppingList.clearChecked(req.user.id)

        res.status(200).json({
            success:true,
            message:'checked items cleared',
            data:{items}
        })
    } catch (error) {
        next(error)
    }
}

//clear all items

export const clearAll=async(req,res,next)=>{
    try {
        const items=await ShoppingList.clearAll(req.user.id)

        res.json({
            success:true,
            message:'shopping list cleared',
            data:{items}
        })
    } catch (error) {
        next(error)
    }
}

//add chcked items to pantry

export const addCheckedToPantry=async(req,res,next)=>{
    try {
        const items=await ShoppingList.addCheckedToPantry(req.user.id);

        res.json({
            success:true,
            message:'checked items added to pantry',
            data:{items}
        })
    } catch (error) {
        next(error)
    }
}