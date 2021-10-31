import React, { useState, useEffect } from "react";

import { useRouter } from 'next/router';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

const Productcontent = (props) => {
    const router = useRouter()
    const path = `/container/${router.query.catogrory}`;

    const ShowColor = (color) => {
        return {
            backgroundColor: color,
            height: 20,
            width: 20,
            borderRadius: 15,
            margin: 0,
            padding: 5,
            cursor: 'pointer',
            display: 'inline-block',

        }
    }
    function remov(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str.replace(/[ ()]/g, '-');
    }

    return (
        <>
            <div className="product-content-body">
                <div className="product-content">
                    <div className="product-img-content">
                        {/*   <img src={props.product.Image} alt={props.product.Image}/>  */}
                        <img src={props.product.Image} />
                        <div className="product-detail-link">
                            <div className="product-detail-link-hover">

                                <Link

                                    href={`${path}/details?id=${props.product._id}`}

                                ><a>VIEW</a></Link>

                            </div>
                        </div>
                    </div>
                    <div className="product-name_price-content">
                        <Link
                            href={`${path}/details?id=${props.product._id}`}><a><h5>{props.product.Name}</h5></a></Link>
                        <div className="product_price">
                            <p className="text-dark">
                                <NumberFormat value={props.product.Price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            </p>
                            <p className="text-discount">
                                <NumberFormat value={props.product.Discount !== 0 ? props.product.Discount : ''} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            </p>
                        </div>
                    </div>
                    <div className="section_item_color">
                        <label className="showColor_body color_item hove">
                            <span style={ShowColor(props.product.colors)}
                                className="showColor"
                                id="Color"
                                onClick={() => {
                                    router.push({
                                        pathname: `${path}/details`,
                                        query: {
                                            id: props.product._id,
                                            color: props.product.colors
                                        },
                                    })
                                }}
                            ></span>
                        </label>
                    </div>
                    {/*  <div className="product-action-content">
                    <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart" onClick={() => onaddTocart(props.product)} ><i className="fas fa-cart-plus icon-cart"></i></button>
      
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Productcontent;