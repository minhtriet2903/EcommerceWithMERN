import React, { useState } from "react";
const Cart = ({ children }) => {
    return (
        <>
            <div className="section-cart">
                <div className="section-cart-body">
                    <div className="cart-border">

                        <div className="cart-central">
                            <div className="header-title">
                                <div className="page-title">
                                    <h3>Giỏ hàng của bạn</h3>
                                </div>                            
                            </div>
                            <div className="cart-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;
