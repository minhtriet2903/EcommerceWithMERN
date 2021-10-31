import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Headerr from "../header";
const ModalCart = (props) =>{
    const {cart} = props;
    var ShowModal = cart.map((item, index) => (

        <li key={index}>
          <div> <img src={item.product.image} alt={item.product.image} /></div>
          <div> <span>{item.product.name}</span></div>
          <div className="amount"> <input type="text" name="amount" className="quantity-cart" value={item.quantity} onChange={ChangeAmount}/></div>
          <div>  <span>{item.product.price}</span></div> 
        </li>
    
      ))
    return (
        <>
         
        </>
    )
}
const mapStateToProps = state => {
    return {
      cart: state.cart
    }
  }
  const mapDispatchToProps = (dispatch,props) =>{
    return {  
       
         actUpdateAmountCart:(id,quantity) =>{
             
            dispatch(actUpdateAmountCart(id,quantity));     
        }
       
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(ModalCart);