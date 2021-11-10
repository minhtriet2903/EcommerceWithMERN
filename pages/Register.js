import React,{useState,useEffect} from "react";

import Router from 'next/router'
import { VerifyCode } from "./verifyCode";


export const Register = ({ show, setShow, reshow }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [validatemessage, setvalidatemessage] = useState("");
  const [ShowVerify,setShowVerify]=useState(false);
  const [code,setcode]=useState(0);
  const hide = () => {
    setShow(false);
    setPassword("");
    setEmail("");
    setvalidatemessage("");
    setShow(false);
  };
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "role") {
      setRole(value);
    }

  };
  function checkEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (re.test(email)) {
      return true;
    }
    setvalidatemessage("Định dạng email không hợp lệ");
    return false;
  }
  function checkPass(pass) {
    if (pass.length > 5) {
      return true;
    }
    else {
      setvalidatemessage("Password có ít hơn 6 ký tự");
      return false;
    }
  }
  function staticcheck() {

    if (checkPass(password) && checkEmail(email)) {
      setvalidatemessage("");
      return true;
    }
    return false;
  }
  const Register = async () =>{
    
      hide();
      reshow(true);
 //     console.log(data.exist);
  }
  function randomNumber(len) {
    var re = 0;
    for (let i = 0; i < len; i++) {
      re *= 10;
      re += Math.floor(Math.random() * 10) % 10;
    }
    return re;
  }
  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '' || rePassword === '') {
      setvalidatemessage("Chưa nhập đủ thông tin");
    } else if (!staticcheck()) {
      return;
    }
    else if (password !== rePassword) {
      setvalidatemessage("Mật khẩu không trùng nhau");
    }
    else {
      const response = await fetch('http://localhost:5035/users/register', {
        method: 'POST',
        body: JSON.stringify({
          name, email, password, role
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.exist === 1)
        setvalidatemessage("Email đã tồn tại");
      else if (data.exist === 2) {
        setvalidatemessage("Tên đã tồn tại");
      } else {
      var verifycode = randomNumber(6);
        const response = await fetch("http://localhost:5035/users", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            subject: "Xác nhận Gmail",
            htmlContent: "Mã xác nhận của bạn là: " + verifycode,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
//        hide();
        /*  setLoginstate[0](setLoginstate[6](data.user.name, setLoginstate[1], setLoginstate[2], setLoginstate[3], setLoginstate[4], setLoginstate[5]));  */
        setcode(verifycode);
        setShowVerify(true);
      }
    }
  }
  /* cookieCutter.set('Acc', response.data.user._id);
       setLoginstate[0](setLoginstate[7](response.data.user.name,setLoginstate[2],setLoginstate[3],setLoginstate[4],setLoginstate[5],setLoginstate[6])); */
  return <>
    {show ? (
      <>
        <div className="total" id="total" >
          <div className="mask_modal_login" onClick={() => {
            hide();
          }}></div>

          <div className="container_modal_register">
            <div className=" header_modal">

              <div className="header_name">
                <img src="" className="header__img" />
                <span className="header_name_modal">Đăng Ký</span>
              </div>
              <div>
                <div className="header_info_function_add">

                  <i className='bx bx-x modal_icon_exit' id="close" onClick={() => {
                    hide();
                  }}></i>
                </div>
              </div>
            </div>
            <div className="modal_content">
              <div className="modal_content_body">
                <div>
                  <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/p3.png" />
                </div>
                <div className="first_modal_content">
                  {validatemessage !== "" ? <span className="catch_erro">{validatemessage}</span> : ''}
                  <div className="first_name">
                    <i className='bx bx-user-circle first_icon_content'></i>
                    <div className="first_content_name_detail">
                      <span className="tittle">Email </span>
                      <input type="text" className="name_input" placeholder=" ..."  id="thu" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="first_name">
                    <i className='bx bx-user-circle first_icon_content'></i>
                    <div className="first_content_name_detail">
                      <span className="tittle">Tên </span>
                      <input type="text" className="name_input" placeholder=" ..."  id="thu" onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <div className="first_name">
                    <i className='bx bx-lock-alt first_icon_content'></i>
                    <div className="first_content_name_detail">
                      <span className="tittle">Mật khẩu </span>
                      <input type="password" className="name_input" placeholder=" ..."  onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="first_name">

                    <i className='bx bx-lock-alt first_icon_content'></i>
                    <div className="first_content_name_detail">
                      <span className="tittle">Nhập lại mật khẩu </span>
                      <input type="password" className="name_input" placeholder=" ..."  onChange={(e) => setRePassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="btn_login">
                    {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                    <button onClick={handleSubmit}>Đăng Ký</button>
                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>
        <VerifyCode
          show={ShowVerify}
          setShow={setShowVerify}
          code={code}
          setSussessState={Register}
      />
      </>
    ) : null}
  </>
};