import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NumberFormat from "react-number-format";
import Slider from "react-slick";
import Description from "./description";
import Extend from "./extendtion";

const Detail = (props) => {
  const router = useRouter();
  const { detail } = props;
  const { relate } = props;
  const { chooseColor } = props;

  const [sizee, setSize] = useState(null);
  const [color, setColor] = useState(chooseColor);
  const [image, setImage] = useState([
    detail.Image,
    detail.Image,
   
  ]);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [amount, setAmount] = useState(1);
  const [product, setPorduct] = useState({
    id: "",
    name: "",
    price: 0,
    color: color,
    size: sizee,
    image: "",
  });
  useEffect(() => {
    setColor(detail.colors);
    setSize(detail.size);
    setImage([detail.Image,
    detail.Image,
    detail.Image,
    detail.Image,])
  }, [detail]);
  useEffect(() => {
    setColor(chooseColor);
  }, [chooseColor]);

  useEffect(() => {
    setPorduct({
      id: detail._id,
      name: detail.Name,
      price: detail.Price,
      color: color,
      size: sizee,
      image: detail.Image,
    });
  }, [color, sizee]);

  const settings = {
    className: "img_center",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };
  const settingss = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  const ShowColor = (color) => {
    return {
      backgroundColor: color,

      borderRadius: 15,
      margin: 0,
      padding: 5,
      cursor: "pointer",
      display: "inline-block",
    };
  };

  const Calcula = (event) => {
    if (event.target.value === "+") {
      if (amount < 100000 && (detail.enteringQuantity - detail.soldQuantity)> amount){
        setAmount((pre) => {
          return pre + 1;
        });
      }else{
        swal("Thông báo","Số lượng tồn kho không thể đáo ứng hơn","error")
      }
    } else {
      if (amount > 1)
        setAmount((pre) => {
          return pre - 1;
        });
    }
  };

  const addcart = (e) => {
    e.preventDefault();
    swal("Thông Báo!", "Thêm thành công", "success");
    props.actAddDetailToCart(product, amount);
  };
  const Purchase = (e) => {
    e.preventDefault();
    props.actAddDetailToCart(product, amount);
    router.push("/container/cartCon");
  };
  const handlecm = () => {
    document.getElementById("arrows").classList.toggle("activeArrow");
    document.getElementById("cm_stack").classList.toggle("activecm");
  };

  const handleChoose = (index, sizee) => {
    setSize(sizee);
    const size = document.querySelectorAll(".ShowSize");
    size.forEach((l) => l.classList.remove("active"));
    size[index].classList.toggle("active");
  };

  const handleChooseColor = (index, colorr) => {
    setColor(colorr);
    const color = document.querySelectorAll(".showColor_body");
    color.forEach((l) => l.classList.remove("activeColor"));
    color[index].classList.toggle("activeColor");
  };
  /* var showSize = detail.size ? detail.size.map((item, index) => {
        return <label key={index}
            className="ShowSize active"
        >
            {item}
        </label>
    }) : ''; */
  /*   var showColor = detail.colors ? detail.colors.map((color, index) => {
          console.log()
          return <label key={index} className={chooseColor === color ? "showColor_body color_item activeColor" : "showColor_body color_item activeColor"}>
              <span style={ShowColor(color)}
                  className="showColor"
                  id="Color"
                  onClick={() => { handleChooseColor(index, color) }}
              ></span>
          </label>
      }) : ''; */

  var ShowImage = image.map((item, index) => {

    return (
      <div key={index}>
        <img src={item} alt={item} />
      </div>
    );
  });
  var related = relate ? (
    <>
      <Extend relate={relate.data} />
    </>
  ) : (
    ""
  );
  return (
    <>
      <div className="body-detail">
        <div className="body-main-detail">
          <div className="content-detail">
            <div className="img-product-dt">
              {/*  <img src={detail.image} alt={detail.image} /> */}
              <Slider asNavFor={nav2} ref={(c) => setNav1(c)} {...settings}>
                {ShowImage}
              </Slider>
              <Slider asNavFor={nav1} ref={(c) => setNav2(c)} {...settingss}>
                {ShowImage}
              </Slider>
            </div>
          </div>
          <div className="product-dt-info">
            <h4>{detail.Name}</h4>
            <div className="product-dt-id">
              <span className="product-dt-tittle-name">
                Mã sản phẩm : {detail._id}
              </span>
            </div>
            <div className="product-dt-price">
              <span className="main_price">
                {" "}
                <NumberFormat
                  value={detail.Price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
              <span className="discount_detail">
                {" "}
                <NumberFormat
                  value={detail.Discount !== 0 ? detail.Discount : ""}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
            </div>
            <div className="product-dt-color">
              <span className="product-dt-tittle-name">Màu sắc :</span>
              <div>
                <label
                  className={
                    chooseColor === color
                      ? "showColor_body color_item activeColor"
                      : "showColor_body color_item activeColor"
                  }
                >
                  <span
                    style={ShowColor(detail.colors)}
                    className="showColor"
                    id="Color"
                  ></span>
                </label>
              </div>
            </div>
            <div className="product-dt-size">
              <span className="product-dt-tittle-name">Kích thước :</span>
              <div>
                <label className="ShowSize active">{detail.size}</label>
              </div>
            </div>
            <div className="product-condition">
              <span className="product-dt-tittle-name">
                Tình trạng : {(detail.enteringQuantity - detail.soldQuantity) > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <div className="amount-n-body">
              <div className="amount-n">
                <label className="product-dt-tittle-name">Số lượng</label>
                <div className="edit-amount">
                  <div className="minus">
                    <input
                      type="button"
                      id="minuss"
                      value="-"
                      className="minus"
                      onClick={Calcula}
                    />
                  </div>
                  <div className="amount">
                    <input
                      type="text"
                      name="amount"
                      id="amounts"
                      value={amount}
                      onChange={(event) => {
                        setAmount(Number(event.target.value));
                      }}
                    />
                  </div>
                  <div className="minus">
                    <input
                      type="button"
                      id="pluss"
                      value="+"
                      className="plus"
                      onClick={Calcula}
                    />
                  </div>
                </div>
              </div>
            </div>
            
              <div className={(detail.enteringQuantity - detail.soldQuantity) > 0 ?'btn-action' : 'btn-action active_hide_btn'} >
                <button
                  type="submit"
                  className="btn-action-purchase"
                  onClick={Purchase}
                >
                  MUA NGAY
                </button>
                <button
                  type="submit"
                  className="btn-action-addcart"
                  onClick={addcart}
                >
                  <i className="fas fa-cart-plus icon-cart"></i>
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
            

            <div className="product_cm_detail">
              <div className="cm-tittle" onClick={handlecm}>
                <h3>Chi Tiết Sản Phẩm</h3>
                <span id="arrows">^</span>
              </div>
              <div className="cm_stack" id="cm_stack">
                <p dangerouslySetInnerHTML={{ __html: detail.Description }}></p>
              </div>
            </div>
            <div className="contact">
              <p>Share : </p>
              <div>
                <i className="fab fa-facebook-f face"></i>
                <i className="fab fa-twitter twitter"></i>
                <i className="fab fa-instagram instagram"></i>
              </div>
            </div>
          </div>
        </div>
        <Description detail={detail} />
        {related}
      </div>
    </>
  );
};
export default Detail;
