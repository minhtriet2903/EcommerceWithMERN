import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import cookieCutter from "cookie-cutter";
import * as Config from "./../constant/config";
import { VerifyCode } from "../verifyCode";

const Total = (props) => {
  const router = useRouter();
  const { cart } = props;
  const { arr } = props;
  const [user, setUser] = useState("");

  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [code, setCode] = useState(0);
  const city = ["Bình Phước", "Bình Dương", "Tây Ninh", "Đồng Nai", "Vũng Tàu", "TP.Hồ Chí Minh", "Long An"]
  useEffect(() => {
    setTotal(cart);
  });
  useEffect(() => {
    const Acc = cookieCutter.get("Acc");
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data);
        setAddress(data.address);
        setEmail(data.email)
        setName(data.name)
        setPhone(data.phoneNumber)
        console.log(data)
      };
      fetchUser();
    }
  }, []);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleCity = (e) => {
    setProvince(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
  }
  const postBill = async () => {
    const response = await fetch(Config.API_URL_BILL, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        userName: name,
        totalPrice: cart,
        products: arr,
        phone: phone,
        province: province,
        address: address,
        idShipper: "",
        userEmail: email
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      console.log(data)
      cookieCutter.set("Bill", data.billId);
    
      props.actDeleteAllCart();
       router.push('/billdisplay'); 
    } else {
      swal("Thông Báo!", "Thanh toán không thành công thành công", "error");
    }
  }
  function randomNumber(len) {
    var re = 0;
    for (let i = 0; i < len; i++) {
      re *= 10;
      re += Math.floor(Math.random() * 10) % 10;
    }
    return re;
  }
  const handlePostBill = async () => {
    console.log(name + " " + email + " "+phone + " " + province + " "+ address + " ")
    if (name === "" || email === "" || phone === "" || province === "" || address === "") {
      swal(
        "Thông Báo!",
        "Vui lòng điền đầy đủ thông tin trước khi thanh toán!",
        "error"
      );
    }
    else {
      if (user._id) {
        postBill();
      } 
      else {
          var verifycode = randomNumber(6);
          const response = await fetch("http://localhost:5035/users", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              subject: "Xác nhận mua hàng",
              htmlContent: "Mã xác nhận của bạn là: " + verifycode,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setCode(verifycode);
          setShowVerifyEmail(true);
          swal(
            "Thông Báo!",
            "Một mã xác nhận vừa được gửi đển email của bạn!",
            "success"
          );
        
      }
    }
  };
  return (
    <>
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
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div className="detail_infor">
                <label>Số điện thoại :</label>
                <input type="text" placeholder="Số điện thoại ..." value={phone} onChange={handlePhone} />
              </div>
              <div className="detail_infor">
                <label>Email :</label>
                <input type="text" placeholder="Email ..." value={email} onChange={handleEmail} />
              </div>
              <div className="detail_infor">
                <label>Địa chỉ :</label>
                <input
                  type="text"
                  placeholder=" Số nhà ..."
                  value={address}
                  onChange={handleAddress}
                />
              </div>

              <div className="detail_infor">
                <label>Tỉnh :</label>
                <select onChange={handleCity}>
                  <option></option>
                  {
                    city.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-purchase">
          <div className="body_cart-purchase">
            <div className="cart-purchase-detail">
              <div className="cart-purchase-detail-body">
                <span className="title_total_">Thành tiền</span>
                <span className="price-total" id="price-total">
                  <NumberFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </span>
              </div>
            </div>
            <div className="btn-cart-purchase">
              <input
                type="button"
                value="THANH TOÁN"
                onClick={handlePostBill}
              />
            </div>
          </div>
        </div>
      </div>
      <VerifyCode
        show={showVerifyEmail}
        setShow={setShowVerifyEmail}
        code={code}
        setSussessState={postBill}
      />
    </>
  );
};
export default Total;