import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { SwipeableDrawer } from "@material-ui/core";
import { route } from "next/dist/server/router";
import { Router } from "next/dist/client/router";
import { useRouter } from "next/dist/client/router";
const DetailBill = (props) => {
    const router = useRouter();
    const { bill } = props;
    const [date, setDate] = useState('')
    const [show, setShow] = useState(false)
    const { detail } = props;

    const hanldeColor = (e) => {
        var status = null;
        if (e === 'Đã hủy đơn')
            status = "black"
        else if (e === 'Đã đặt hàng')
            status = "purple"
        else if (e === 'Đã giao hàng')
            status = "green"
        else if (e === 'Đang giao hàng')
            status = "blue"
        else
            status = "red"
        return {
            color: status
        }
            ;
    }
    const deleteItem = (id) => {

        axios.put("http://localhost:5035/bills/" + id, {
            Status: "Đã hủy đơn",
        }).then((res) => {
            swal("Thông Báo!", "Huỷ đơn hàng thành công", "success");
            router.push(router.asPath)

        }).catch((err) => {
            swal("Thông Báo!", "Huỷ đơn hàng thất bại", "error");
        });
        
    };
    useEffect(() => {
        const date = new Date(detail.BillDate)
        setDate(date.toLocaleDateString())
    }, [detail])
    const hide = () => {
        setShow(false)
    }
    return (
        <>



            <tr className="table_content_bill">
                <td className="bill_co1">
                    <span>{detail._id}</span>
                </td>
                <td className="bill_co2">
                    <span>{date}</span>
                </td>
                <td className="bill_img_body bill_co3">
                    {
                        detail.Products.map((item, index) => {
                            return <div key={index} className="img-name">
                                <div className="img-product">
                                    <img src={item.product.image} alt={item.product.image} />

                                </div>
                            </div>
                        })
                    }

                </td>
                <td className="bill_co4">

                    <span id="price"><NumberFormat value={detail.TotalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                </td>
                <td>
                    <div className="bill_status add_status_co">

                        <span className="alert_color" style={hanldeColor(detail.Status)}>{detail.Status}</span>
                    </div>
                </td>
                <td className="bill_co5">
                    <button className="btn_detail_bill" onClick={() => setShow(true)}>Chi tiết</button>
                    {
                        show ?
                            <div className="total" id="total">
                                <div
                                    className="mask_modal_login"
                                    onClick={() => {
                                        hide();
                                    }}
                                ></div>

                                <div className="container_modal">
                                    <div className=" header_modal">
                                        <div className="header_name">
                                            <img src="" className="header__img" />
                                            <span className="header_name_modal">Chi Tiết</span>
                                        </div>
                                        <div>
                                            <div className="header_info_function_add">
                                                <i
                                                    className="bx bx-x modal_icon_exit"
                                                    id="close"
                                                    onClick={() => {
                                                        hide();
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal_content add_body_modal">
                                        <div className="modal_content_body add_codit">
                                            {
                                                detail.Products.map((item, index) => {
                                                    return <div key={index} className="product1-detail" id="product1-detail">
                                                        <div className="product1-detail-head">

                                                            <div className="img-name">
                                                                <div className="img-product">
                                                                    <img src={item.product.image} alt={item.product.image} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="importer-detail">
                                                            <div className="produt-name">
                                                                <span className="name_">{item.product.name}</span>
                                                                <div>Màu: {item.product.color}</div>
                                                                <div>Size: {item.product.size}</div>
                                                                <div className="product-id">
                                                                    <span>Mã sản phẩm : </span>
                                                                    <span>{item.product.id}</span>
                                                                </div>
                                                            </div>
                                                            <div className="amount-price">
                                                                <div className="edit-amount-cart">

                                                                    <div className="amount">
                                                                       
                                                                        <span>{item.quantity}</span>
                                                                    </div>

                                                                </div>
                                                                <div className="cart-product-price">
                                                                    <span id="price"><NumberFormat value={item.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div> : ''
                    }

                </td>
              
                <td className="bill_co6">
                    <div className="delete-product">
                        {
                            detail.Status === 'Đã đặt hàng' ?
                                <button className="btn-delete" onClick={() => deleteItem(detail._id)}>Huỷ</button>
                                : ''
                        }

                    </div>
                </td>

            </tr>





            {/*  <div className="product1-detail " id="product1-detail">
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
                                <button className="btn-delete" onClick={() => deleteItem(detail._id)}>Huỷ</button>
                                : ''
                        }

                    </div>
                </div>
                <div>


                    <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                        Launch
                    </button>


                    <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="container-fluid">
                                        Add rows here
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
        </>
    )
}
export default DetailBill;