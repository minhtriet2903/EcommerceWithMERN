import React from "react";
const ProductCart = (props) => {
    const DeleteAll = () =>{
        props.actDeleteAllCart();
    }
    return (
        <>
            <div className="cart-left-content">
                <div className="cart-number">
                    <div className="cart-header-body">
                        <div className="cart-header">
                            <div className="cart-header-title">    
                                <div className="name-shop">
                                    <span>FB</span>
                                </div>
                                <div className="btn-delete-all">                                 
                                    <button type="button" onClick={DeleteAll}>Xoá tất cả</button>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div className="cart-product-amount-body">
                        <div className="cart-product-amount">
                            <div className="product1-body">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductCart;