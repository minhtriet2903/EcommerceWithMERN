import React from "react";
import Slider from "react-slick";

import { useRouter } from "next/router";
import Link from "next/link";
import NumberFormat from "react-number-format";
import Product from "../product";
const Extend = (props) => {
  const router = useRouter();
  const { relate } = props;
  
  const path = `/container/${router.query.catogrory}`;
  const settings = {
    lazyLoad: "ondemand",
    slidesToShow:  relate.length >= 3 ? 3 : relate.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
    ],
  };

  const ShowColor = (color) => {
    return {
      backgroundColor: color,
      height: 20,
      width: 20,
      borderRadius: 15,
      margin: 0,
      padding: 5,
      cursor: "pointer",
      display: "inline-block",
    };
  };

  var related = relate
    ? relate.map((product, index) => {
        return (
          <div className="product-content-body" key={index}>
            <div className="product-content">
              <div className="product-img-content">
                {/*   <img src={props.product.Image} alt={props.product.Image}/>  */}
                <img
                  src={product.Image}
                  alt="http://thoitrangskinny.com/upload/9499587555_314953945_-27-11-2019-12-12-54.jpg"
                />
                <div className="product-detail-link">
                  <div className="product-detail-link-hover">
                    <Link
                      /* as={`/product/${props.product._id}`} */
                      href={`${path}/details?id=${product._id}`}
                    >
                      <a>VIEW</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="product-name_price-content">
                <Link href={`${path}/details?id=${product._id}`}>
                  <a>
                    <h5>{product.Name}</h5>
                  </a>
                </Link>
                <div className="product_price">
                  <p className="text-dark">
                    <NumberFormat
                      value={product.Price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </p>
                  <p className="text-discount">
                    <NumberFormat
                      value={product.Discount !== 0 ? product.Discount : ""}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </p>
                </div>
              </div>
              <div className="section_item_color">
                <label className="showColor_body color_item hove">
                  <span
                    style={ShowColor(product.colors)}
                    className="showColor"
                    id="Color"
                    onClick={() => {
                      router.push({
                        pathname: `${path}/details`,
                        query: {
                            id: product._id,
                            color: product.colors
                        },
                    })
                    }}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        );
      })
    : "";
  return (
    <div className="extension-product">
      <div className="extension-product-body">
        <div>
          <h4>SẢN PHẨM LIÊN QUAN</h4>

          <div className="">
            <Slider {...settings}>{related}</Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Extend;
