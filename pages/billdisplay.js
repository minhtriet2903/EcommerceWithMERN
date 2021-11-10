import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import cookies from "next-cookies";
import cookieCutter from "cookie-cutter";
const BillDisplay = (props) => {
    const {data} = props;
   /*  const [data, setData] = useState();
   
    useEffect(() => {
        const Bill = cookieCutter.get("Bill");
        const fetchh = async () => {
            const response = await fetch(`http://localhost:5035/bills/${Bill}`)
            const data = await response.json();
            setData(data);
            swal("Thông Báo!", "Bạn có thể chụp lại hoá đơn để tránh những sai sót", "success");
        }
        fetchh();
       
    }, [])
    console.log(haha) */
    console.log(data)
    var detail = data ? data.Products.map((item, index) => {
        return (
            <div key={index} className="product1-detail" id="product1-detail">
                <div className="product1-detail-head">

                    <div className="img-name">
                        <div className="img-product">
                            <img src={item.product.image} alt={item.product.image} />

                        </div>
                    </div>
                </div>
                <div className="importer-detail">
                    <div className="produt-name">
                        <p>{item.product.name} (Màu: {item.product.color}, Size: {item.product.size})
                        </p>

                        <div className="product-id">
                            <span>Mã sản phẩm : </span>
                            <span>{item.product.id}</span>
                        </div>
                    </div>
                    <div className="amount-price">
                        <div className="edit-amount-cart">
                            <div className="minus">
                                
                            </div>
                            <div className="amount">
                                <input type="text" name="amount" id="amount" value={item.quantity} />
                            </div>
                            <div className="minus">
                               
                            </div>
                        </div>
                        <div className="cart-product-price">
                            <span id="price"><NumberFormat value={item.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                        </div>
                    </div>
                    <div className="delete-product">

                    </div>
                </div>
          
           
            </div>
        )
    }) : '';
    return (
        <>
            {data ? <div className="section-cart">
                <div className="section-cart-body">
                    <div className="cart-border">

                        <div className="cart-central">
                            <div className="header-title">
                                <div className="page-title">
                                    <h3>Hoá Đơn Của Bạn</h3>
                                </div>
                            </div>
                            <div className="cart-content">
                                <div className="cart-left-content">
                                    <div className="cart-number">
                                        <div className="cart-header-body">
                                            <div className="cart-header">
                                                <div className="cart-header-title">
                                                    <div className="name-shop">
                                                        <span>FB</span>
                                                    </div>
                                                    <div className="btn-delete-all">
                                                      
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-product-amount-body">
                                            <div className="cart-product-amount">
                                                <div className="product1-body">
                                                    {detail}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cart-right-content">
                                    <div className="billing_address">
                                        <div className="billing_address_body">
                                            <h3>Thông tin thanh toán</h3>
                                            <div className="receiver_infor">
                                                <div className="detail_infor">
                                                    <label>Họ và tên :</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Họ và tên ..."
                                                        value={data.userName}
                                                    />
                                                </div>
                                                <div className="detail_infor">
                                                    <label>Số điện thoại :</label>
                                                    <input type="text" placeholder="Số điện thoại ..." value={data.Phone}/>
                                                </div>
                                                <div className="detail_infor">
                                                    <label>Email :</label>
                                                    <input type="text" placeholder="Email ..." value={data.userEmail} />
                                                </div>
                                                <div className="detail_infor">
                                                    <label>Địa chỉ :</label>
                                                    <input
                                                        type="text"

                                                        value={data.Address}

                                                    />
                                                </div>

                                                <div className="detail_infor">
                                                    <label>Tỉnh :</label>
                                                    <input
                                                        type="text"

                                                        value={data.Province}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-purchase">
                                        <div className="body_cart-purchase">
                                            <div className="cart-purchase-detail">
                                                <div className="cart-purchase-detail-body">
                                                    <span>Thành tiền</span>
                                                    <span className="price-total" id="price-total">
                                                        <NumberFormat
                                                            value={data.TotalPrice}
                                                            displayType={"text"}
                                                            thousandSeparator={true}
                                                            suffix={"đ"}
                                                        />
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
            </div> : ''}

        </>
    )
}

export default BillDisplay;
BillDisplay.getInitialProps = async (a)=>{
    const {Bill} = cookies(a)
    const response = await fetch(`http://localhost:5035/bills/${Bill}`)
    const dataa = await response.json();
    return {
        data:dataa
    }
}