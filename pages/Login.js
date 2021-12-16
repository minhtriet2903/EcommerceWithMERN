import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { Register } from "./Register";
import { SetPassword } from "./forgotPass";
import cookies from 'js-cookie'
export const Login = ({ show, setShow, getName }) => {
  const router = useRouter();

  const hide = () => {
    setPassword("");
    setEmail("");
    setPassnoity("");
    setShow(false);
  };
  const [ShowRegister, setShowRegister] = useState(false);
  const [ShowSetPassword, setShowSetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [Passnoity, setPassnoity] = useState("");
  useEffect(() => {
    if (show) document.getElementById("thu").focus();
  }, [show]);

  const handleSubmit = async () => {
   
    if (email && password) {
      const response = await fetch("http://localhost:5035/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          role: role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (data.user) {
       
       cookies.set("Acc",data.user._id,{expires : 1/24});
        hide();
        if (data.user.role === "Manager") router.push("/course");
        else if (data.user.role === "Shipper") router.push("/shipperAdmin");
        else{
       
          window.location.reload()
        } 
      } else {
        swal("Thông Báo!", "Sai mật khẩu hoặc tài khoản", "error");
        setPassnoity("Sai mật khẩu hoặc tài khoản");
      }
    } else {
      swal("Thông Báo!", "Chưa điền đủ thông tin", "error");
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
                  <span className="header_name_modal">Đăng Nhập</span>
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
                    <div className="first_name">
                      <i className="bx bx-lock-alt first_icon_content"></i>
                      <div className="first_content_name_detail">
                        <span className="tittle">Mật khẩu </span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder=" ..."
                         
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                      <button onClick={handleSubmit}>Đăng nhập</button>
                    </div>
                    <div className="bottom_modal">
                      <span
                        onClick={() => {
                          setShowSetPassword(true);
                          hide();
                        }}
                      >
                        <a>Quên mật khẩu</a>
                      </span>
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
      <SetPassword show={ShowSetPassword} setShow={setShowSetPassword} />
    </>
  );
};
