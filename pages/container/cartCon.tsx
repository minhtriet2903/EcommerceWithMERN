
import React, { useState, useEffect } from 'react';
import Cart from "../cart";
import { connect } from 'react-redux';
import Total from '../cart/total';
import CartItem from "../cart/cartitem";
import * as Message from "../constant/messages";
import ProductCart from '../cart/productcart';
import { actDeleteInCart, actUpdateAmountCart,actDeleteAllCart  } from '../actions';

const CartContainer = (props) => { //props contain cart and cart contain product, quantity, and 1 action to delete cart of each other 
    const {cart} = props;
    const {actDeleteAllCart} = props;
   const Calculator = (cart) =>{
        var result = 0;
        if(cart.length > 0){
            for(var i =0 ;i< cart.length ; i++){
                result += (cart[i].product.price * cart[i].quantity);
            }
        }
        return result;
   }
    const showTotal = (cart) =>{
        var result = null;
        var arr = null;
        
        if(cart.length > 0){
             arr = cart.map((item,index) =>{return item })
                result = <Total cart={Calculator(cart)} arr={arr} actDeleteAllCart={actDeleteAllCart}/>;
            }
            return result;
        }
           
    const showCartItem = (carts) =>{
        var result = Message.MS_CART_EMPTY;
        const {actDeleteInCart} = props;
        const {actUpdateAmountCart} = props;
            if(carts.length > 0){
                result = carts.map((item,index) =>{
                    return <CartItem key={index} item={item} actDeleteInCart={actDeleteInCart} actUpdateAmountCart={actUpdateAmountCart}/>                 
                })
            }
        return result;
    }
  
    return (
        <>          
            <Cart>      
                 <ProductCart actDeleteAllCart={actDeleteAllCart}>    
                    {showCartItem(cart)}
                 </ProductCart>
                {showTotal(cart)}
            </Cart>
        </>
    )
}
const mapStateToProps = state => {
    return{
        cart : state.cart
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {  
        actDeleteInCart:(id,color,size) =>{    
             
            dispatch(actDeleteInCart(id,color,size));     
        },
         actUpdateAmountCart:(product,quantity) =>{
             
            dispatch(actUpdateAmountCart(product,quantity));     
        },
        actDeleteAllCart:() =>{
            dispatch(actDeleteAllCart()); 
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
