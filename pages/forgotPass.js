import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { Register } from "./Register";
import { VerifyCode } from "./verifyCode";
import { UpdatePassword } from "./updatePassword";

export const SetPassword = ({ show, setShow, getName }) => {
  const router = useRouter();

  const hide = () => {
    setEmail("");
    setPassnoity("");
    setShow(false);
  };
  const [ShowRegister, setShowRegister] = useState(false);
  const [ShowVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setuserId] = useState("");
  const [code, setcode] = useState("");
  const [Passnoity, setPassnoity] = useState("");
  const [showUpdate, setshowUpdate] = useState("");
  useEffect(() => {
    if (show) document.getElementById("thu").focus();
  }, [show]);
  function randomNumber(len) {
    var re = 0;
    for (let i = 0; i < len; i++) {
      re *= 10;
      re += Math.floor(Math.random() * 10) % 10;
    }
    return re;
  }
  const getUserIdByEmail = async () => {
    const response = await fetch("http://localhost:5035/users?size=100", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
   
    for (let i = 0; i < data.tutorials.length; i++) {
      if (data.tutorials[i].email == email) {
        return data.tutorials[i]._id;
      }
    }
    return null;
  };
  const handleSubmit = async () => {
    if (email) {
      const response = await fetch("http://localhost:5035/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: ".",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.exists != 0) {
        var verifycode = randomNumber(6);
        const response = await fetch("http://localhost:5035/users", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            subject: "Xác nhận đổi mật khẩu",
            htmlContent: "Mã xác nhận của bạn là: " + verifycode,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
       
        hide();
        /*  setLoginstate[0](setLoginstate[6](data.user.name, setLoginstate[1], setLoginstate[2], setLoginstate[3], setLoginstate[4], setLoginstate[5]));  */
        setcode(verifycode);
        var idd = await getUserIdByEmail();
      
        setuserId(idd);
        setShowVerify(true);
      } else {
        setPassnoity("Tài khoản không tồn tại");
      }
    } else {
      setPassnoity("Chưa điền đủ thông tin");
    }
  };
  const Regis = () => {
    hide();
    setShowRegister(true);
  };
  const reshow = (e) => {
    setShow(e);
  };
  return (
    <>
      {show ? (
        <>
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
                  <span className="header_name_modal">Quên mật khẩu</span>
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
              <div className="modal_content">
                <div className="modal_content_body">
                  <div>
                    <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/p3.png" />
                  </div>
                  <div className="first_modal_content">
                    {Passnoity !== "" ? (
                      <span className="catch_erro">{Passnoity}</span>
                    ) : (
                      ""
                    )}
                    <div className="first_name">
                      <i className="bx bx-user-circle first_icon_content"></i>
                      <div className="first_content_name_detail">
                        <span className="tittle">Email</span>
                        <input
                          type="text"
                          className="name_input"
                          placeholder=" ..."
                          id="thu"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                      <button onClick={handleSubmit}>Tiếp</button>
                    </div>
                    <div className="bottom_modal">
                      <span
                        onClick={() => {
                          setShowRegister(true);
                          hide();
                        }}
                      >
                        Đăng ký
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Register show={ShowRegister} reshow={reshow} setShow={setShowRegister} />
      <VerifyCode
        show={ShowVerify}
        setShow={setShowVerify}
        code={code}
        setSussessState={setshowUpdate}
      />
      <UpdatePassword show={showUpdate} id={userId} setShow={setshowUpdate} />
    </>
  );
};