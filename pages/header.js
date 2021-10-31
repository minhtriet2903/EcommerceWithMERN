import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import { actUpdateAmountCart, actDeleteInCart } from "./actions";
import ModalCartHeader from "./cart/modal";
import NumberFormat from "react-number-format";
import Breadcrumb from "./breadcrumbs";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { Login } from "./Login";

import cookieCutter from "cookie-cutter";
import cookies from "next-cookies";

import * as Message from "./constant/messages";

const Menubutton = styled.a`
  margin: 0;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transform: translate(0, 10px);
  border: 0px solid #ffffff;
  border-radius: 20px;
  height: 20px;
  margin-top: -20px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100px;
  display: flex;
  align-items: flex-start;
  float: right;
  cursor: pointer;
  font-size: 90%;
  &:hover {
    color: #c4c6c7;
    font-weight: 200%;
    transition: all 0.2s ease-out;
  }
`;

const Headerr = (props) => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const { actUpdateAmountCart } = props;
  const { actDeleteInCart } = props;
  const [valueFind, setValueFind] = useState("");
  const { cart } = props;
  const [amount, setAmount] = useState(0);
  const [male, setMale] = useState({
    type: "Nam",
    content: [
      "Áo sơ mi",
      "Áo thun",
      "Áo khoác",
      "Áo len",
      "Suit",
      "Quần jean",
      "Quần kaki",
      "Quần thể thao",
      "Đầm",
    ],
  });
  const [female, setFemale] = useState({
    type: "Nữ",
    content: [
      "Áo sơ mi",
      "Áo thun",
      "Áo khoác",
      "Áo len",
      "Suit",
      "Quần jean",
      "Quần kaki",
      "Quần thể thao",
      "Đầm",
    ],
  });
  const [kid, setKid] = useState({
    type: "Kid",
    content: [
      "Áo sơ mi",
      "Áo thun",
      "Áo khoác",
      "Áo len",
      "Suit",
      "Quần jean",
      "Quần kaki",
      "Quần thể thao",
      "Đầm",
    ],
  });

  const Total = () => {
    var result = 0;
    for (let i = 0; i < cart.length; i++) {
      result += cart[i].product.price * cart[i].quantity;
    }
    return result;
  };

  var ShowModal =
    cart.length > 0 ? (
      cart.map((item, index) => {
        return (
          <ModalCartHeader
            key={index}
            cart={item}
            actUpdateAmountCart={actUpdateAmountCart}
            actDeleteInCart={actDeleteInCart}
          />
        );
      })
    ) : (
      <li>{Message.MS_CART_EMPTY_MODAL}</li>
    );
  const showmodalcart = () => {
    document.getElementById("modal-cr").classList.toggle("ActiveModalCart");
  };
  useEffect(() => {
    window.onclick = function (eve) {
      if (eve.target === document.getElementById("outside_Modal")) {
        document.getElementById("modal-cr").classList.remove("ActiveModalCart");
      }
    };
  }, []);

  useEffect(() => {
    setAmount(cart.length);
  }, [cart]);
  const handleFind = () => {
    router.push({
      pathname: "/container/find",
      query: {
        result: valueFind,
      },
    });
  };
  useEffect(() => {
    if (router.pathname !== "/container/find") {
      setValueFind("");
    }
  }, [router]);
  useEffect(() => {
    const Acc = cookieCutter.get("Acc");
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data && data.name);
      };
      fetchUser();
    }
  }, []);
  var bachGround =
    router.asPath !== "/" ? (
      <>
        <div className="product-tittle-img">
          <h4 className="pd-tittle-name">
            <span>f</span>
            ashion
            <span> b</span>
            ug
          </h4>
        </div>
        <Breadcrumb />
      </>
    ) : (
      ""
    );

  /*  function ACC(Acc, ShowLogin, setShowLogin, ShowRegister, setShowRegister, Logout) {

    if (Acc == null) {
      return <><Menubutton onClick={() => setShowLogin(true)}>Đăng nhập</Menubutton><Menubutton onClick={() => setShowRegister(true)}>Đăng ký</Menubutton></>;
    }
    return <><Menubutton onClick={() => Logout()}>Đăng xuất</Menubutton><Menubutton href="/UserPage">{Acc}</Menubutton></>;
  } */
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);

  const Logout = () => {
    cookieCutter.set("Acc", "");
    setUser("");
    router.replace("/");
  };

  useEffect(() => {
    const header = document.getElementById("header");
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        if (header) {
          header.classList.remove("Active_header");
        }
      } else {
        if (header) {
          header.classList.add("Active_header");
        }
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);
  const hanldeNam = () => {
    router.push("/container/Nam?age=Adult");
  };

  return (
    <>
      <header className="header" id="header">
        <div className="out_line">
          <div className="out_line_body">
            <div className="header_body">
              <div
                className="header_logo"
                onClick={() => {
                  router.push("/");
                }}
              >
                <span className="name_logo">fn</span>
                <span className="name_logo_color">bg</span>
              </div>
              <div className="left_header">
                <div>
                  <i
                    className="fas fa-search icon_search"
                    onClick={handleFind}
                  ></i>
                  <input
                    className="input_header"
                    type="text"
                    value={valueFind}
                    onChange={(e) => {
                      setValueFind(e.target.value);
                    }}
                  />
                </div>

                <div className="icon_left_header">
                  <div className="border_icon_header">
                    <div>
                      {user ? (
                        <>
                          <span className="name_user_header">{user}</span>
                          <ul className="option_user">
                            <li
                              onClick={() => {
                                router.push("/UserPage");
                              }}
                            >
                              <i className="bx bxs-user"></i>
                              <span>Thông tin cá nhân</span>
                            </li>
                            <li onClick={Logout}>
                              <i className="bx bx-log-out"></i>
                              <span>Đăng xuất</span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <i
                          className="bx bx-user-circle icon_cart_user"
                          onClick={() => {
                            setShowLogin(true);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                  <div className="cart_detail ">
                    <i
                      className="bx bx-cart icon_cart_user"
                      id={"shopping-cart"}
                      onClick={showmodalcart}
                    >
                      <span className="amount_pro_header">
                        {amount > 0 ? "(" + amount + ")" : ""}
                      </span>
                    </i>
                    <div className="modal-cr" id="modal-cr">
                      <div className="modal-cr-body">
                        <ul>{ShowModal}</ul>
                        <div className="total_cart_modal">
                          <p>Tổng tiền : </p>
                          <span id="price">
                            <NumberFormat
                              value={Total()}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"đ"}
                            />
                          </span>
                        </div>

                        <div className="btn-checkout">
                          <Link href="/container/cartCon">
                            <a>THANH TOÁN</a>
                          </Link>
                        </div>
                        <div className="outside_Modal" id="outside_Modal"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom_header">
              <div className="bottom_header_body">
                <ul className="content_header_bt_body">
                  <li>
                    <span
                      onClick={() => {
                        router.push(`/container/${male.type}?age=Adult`);
                      }}
                    >
                      Nam
                    </span>
                    <div className="item_of_title">
                      <div className="item_of_title_body">
                        <div className="row_male">
                          {male.content.map((item, index) => {
                            return (
                              <Link
                                key={index}
                                href={`/container/${male.type}/${item}`}
                              >
                                <a>{item}</a>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        router.push(`/container/${female.type}?age=Adult`);
                      }}
                    >
                      Nữ
                    </span>
                    <div className="item_of_title">
                      <div className="item_of_title_body">
                        <div className="row_item">
                          <div className="row_male">
                            {female.content.map((item, index) => {
                              return (
                                <Link
                                  key={index}
                                  href={`/container/${
                                    female.type
                                  }/${item.toLowerCase()}`}
                                >
                                  <a>{item}</a>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        router.push(`/container/${kid.type}`);
                      }}
                    >
                      Trẻ Con
                    </span>
                    <div className="item_of_title">
                      <div className="item_of_title_body">
                        <div className="row_item">
                          <div className="row_male">
                            {kid.content.map((item, index) => {
                              return (
                                <Link
                                  key={index}
                                  href={`/container/${
                                    kid.type
                                  }/${item.toLowerCase()}`}
                                >
                                  <a>{item}</a>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Login show={ShowLogin} setShow={setShowLogin} />

      {bachGround}
    </>
  );
};
/* Headerr.getInitialProps = async (ctx) => {
  const { Acc } = cookies(ctx);
  const res31 = await fetch("http://localhost:5035/users/" + Acc);
  var json31 = await res31.json();
  
  return { data:  json31.name };
}; */
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    actUpdateAmountCart: (id, quantity) => {
      dispatch(actUpdateAmountCart(id, quantity));
    },
    actDeleteInCart: (id, color, size) => {
      dispatch(actDeleteInCart(id, color, size));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Headerr);