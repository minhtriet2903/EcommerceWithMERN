import React from "react";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { SwipeableDrawer } from "@material-ui/core";
const DetailBill = (props) =>{
    const {bill} = props;
    const {detail} = props;
    const hanldeColor = (e) =>{
        var status = null;
        if(e === 'Đã hủy đơn')
            status = "black"
        else if(e === 'Đã đặt hàng')
            status = "purple"
            else if(e === 'Đã giao hàng')
            status = "green"
            else if(e === 'Đang giao hàng')
            status = "blue"
        else   
            status = "red" 
        return {
            color: status
            }
            ;
    }
    const deleteItem =  (id) => {
       
         axios.put("http://localhost:5035/bills/" + id,{
            Status: "Đã hủy đơn",
        }).then((res) =>{
            swal("Thông Báo!", "Huỷ đơn hàng thành công", "success");

        }).catch((err) =>{
            swal("Thông Báo!", "Huỷ đơn hàng thất bại", "error");
        });
        window.location.reload();
      };
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
                          
                          <span className="alert_color" style={hanldeColor(detail.Status)}>{detail.Status}</span>
                      </div>
                      <div className="bill_status">
                          
                          <span className="alert_color">{detail.BillDate}</span>
                      </div> 
                    <div className="delete-product">
                        {
                            detail.Status === 'Đã đặt hàng' ?
                            <button className="btn-delete" onClick={() =>deleteItem(detail._id)}>Huỷ</button> 
                            :''
                        }
                        
                    </div>
                </div>

            </div> 
        </>
    )
}
export default DetailBill;