import React from "react";

import NumberFormat from 'react-number-format';
const DetailBill = (props) =>{
    const {bill} = props;
    const {detail} = props;
 
    return (
        <>
              <div className="product1-detail " id="product1-detail">
                <div className="product1-detail-head">
                 
                    <div className="img-name">
                        <div className="img-product">
                              <img src={bill.product.image} alt={bill.product.image} />  
                            
                        </div>
                    </div>
                </div>
                <div className="importer-detail">
                    <div className="produt-name">
                         <p>{bill.product.name} (Màu: {bill.product.color}, Size: {bill.product.size})
                        </p>
 
                        <div className="product-id">
                            <span>Mã sản phẩm : </span>
                             <span>{bill.product.id}</span> 
                        </div>
                    </div>
                    <div className="amount-price">
                        <div className="edit-amount-cart">
                            <div className="minus">
                              
                            </div>
                            <div className="amount">
                              
                               <span>{bill.quantity}</span> 
                            </div>
                            <div className="minus">
                               
                            </div>
                        </div>
                        <div className="cart-product-price">
                             <span id="price"><NumberFormat value={bill.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span> 
                        </div>
                       
                    </div>
                     <div className="bill_status">
                          
                          <span>{detail.Status}</span>
                      </div>
                      <div className="bill_status">
                          
                          <span>{detail.BillDate}</span>
                      </div> 
                    <div className="delete-product">
                         <button className="btn-delete">Huỷ</button> 
                    </div>
                </div>

            </div> 
        </>
    )
}
export default DetailBill;