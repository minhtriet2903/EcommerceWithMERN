import React from "react";
import DetailBill from "./detailbill";
import NumberFormat from 'react-number-format';
const HistoryBill = (props) => {
    const { bill } = props;
    const { detail } = props;

    return (
        <>
            <div className="detail_bill_body">
                <div className="bill_title">
                    <p>Lịch sử mua hàng</p>
                   
                </div>
                <div className="hisBill_detail_content">
                {
                    bill.map((item, index) => (
                        item.Products.map((product, inde) => {
                            return <DetailBill key={index} bill={product} detail={item} />
                        })
                    ))
                    /*  bill.map((item,index) =>{
                         
                             return <DetailBill key={index} bill={item} detail={item}/>
                       
                     }) */
                }
                </div>

            </div>
        </>

    )
}
export default HistoryBill;