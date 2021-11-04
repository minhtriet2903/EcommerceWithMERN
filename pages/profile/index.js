import React from "react";
import DetailBill from "./detailbill";
import NumberFormat from 'react-number-format';
const HistoryBill = (props) =>{
    const {bill} = props;
    const {detail} = props;

    return (
        <>
        <div className="detail_bill_body">
            {
                bill.map((item,index) =>(
                    item.Products.map((product,inde) =>{
                        return <DetailBill key={index} bill={product} detail={item}/>
                    })
                )) 
               /*  bill.map((item,index) =>{
                    
                        return <DetailBill key={index} bill={item} detail={item}/>
                  
                }) */
            }
           
            </div>
        </>

    )
}
export default HistoryBill;