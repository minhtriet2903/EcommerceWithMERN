import * as types from "../constant/actionType";

export const actAddtoCart = (product, quantity) =>{ 
    return {
        type:types.ADD_TO_CART,
        product:product,
        quantity:quantity 
    }
}

export const actDeleteInCart = (id,color,size) =>{
    return {
        type:types.DElETE_IN_CART,
        id:id,
        color:color,
        size:size
    }
}

export const actUpdateAmountCart = (product,quantity) =>{
    return {
        type:types.UPDATE_AMOUNT_CART,
        product,
        quantity:quantity
    }
}

export const actDeleteAllCart = () =>{
    return {
        type:types.DElETE_ALL_CART,
    }
}

export const actFetchProduct = (product) =>{
    return {
        type:types.FETCH_PRODUCT,
        product
    }
}

export const actFetchDetailProduct = (detail) =>{
    return {
        type:types.FETCH_DETAIL_PRODUCT,
        detail
    }
}

export const actAddDetailToCart = (product,quantity) =>{
    return {
        type:types.ADD_DETAIL_TO_CART,
        product,
        quantity
      
    }
}

export const actFetchColor = (color) =>{
    return {
        type:types.ADD_FETCH_COLOR,
        color
        
    }
}
export const actFetchSizer = (size) =>{
    return {
        type:types.ADD_FETCH_SIZE,
        size
        
    }
}