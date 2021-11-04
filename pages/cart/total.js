import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import cookieCutter from "cookie-cutter";
import * as Config from "./../constant/config";
const Total = (props) => {
  const router = useRouter();
  const { cart } = props;
  const { arr } = props;
  const [user, setUser] = useState("");
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const city = ["Bình Phước","Bình Dương","Tây Ninh","Đồng Nai","Vũng Tàu","TP.Hồ Chí Minh","Long An"]
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
      };
      fetchUser();
    }
  }, []);

  const handleCity = (e) => {
    setProvince(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePostBill = async () => {
    if (province !== "" && address !== "") {
      const response = await fetch(Config.API_URL_BILL, {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          userName: user.name,
          totalPrice: cart,
          products: arr,
          province: province,
          address: address,
          idShipper: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        swal("Thông Báo!", "Thanh toán thành công", "success");
        props.actDeleteAllCart();
      } else {
        swal("Thông Báo!", "Thanh toán thành công", "danger");
      }
    } else {
      swal(
        "Thông Báo!",
        "Vui lòng điền đầy đủ thông tin trước khi thanh toán!",
        "warning"
      );
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
                  value={user.name}
                />
              </div>
              <div className="detail_infor">
                <label>Số điện thoại :</label>
                <input type="text" placeholder="Số điện thoại ..." />
              </div>
              <div className="detail_infor">
                <label>Email :</label>
                <input type="text" placeholder="Email ..." value={user.email} />
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
                  <option>--</option>
                  {
                    city.map((item,index) =>{
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
                <span>Thành tiền</span>
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
    </>
  );
};
export default Total;
