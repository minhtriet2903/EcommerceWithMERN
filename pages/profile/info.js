import React, { useState, useEffect } from "react";

import axios from "axios";
const Info = ({ data }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    setEmail(data.email);
    setName(data.name);
    setPhone(data.phoneNumber);
    setSex(data.sex);
    setAddress(data.address);
  }, [data]);
  function UpdateCloud() {
    axios
      .put(
        "http://localhost:5035/users/" + data._id,
        { sex: sex,phoneNumber:phone, address: address },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log("sussces");
        swal("Thông Báo!", "Thay đổi thành công", "success");
      })
      .catch(function (error) {
        swal("Thông Báo!", "Thay đổi thất bại", "error");
        console.log("error");
        console.log(error);
      });
  }
  return (
    <>
      <div className="info_title">
        <p>Hồ sơ của tôi</p>
        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className="info_detail_pro">
      <div className="name_account_detail wk">
          <label>Tên</label>

          <span className="detail_info_content">{data.name}</span>
        </div>
        <div className="email_account_detail wk">
          <label>Email</label>

          <span className="detail_info_content">{email}</span>
        </div>
       

        <div className="phone_account_detail wk">
          <label>Số Điện Thoại</label>
          <input
            className="detail_info_content"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="name_account_detail wk">
          <label>Giới Tính</label>

          <div>
            <input
              type="radio"
              value="Nam"
              name="gt"
              checked={sex === "Nam" ? "checked" : ""}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            />
            <span>Nam</span>
          </div>
          <div>
            <input
              type="radio"
              value="Nữ"
              name="gt"
              checked={sex === "Nữ" ? "checked" : ""}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            />
            <span>Nữ</span>
          </div>
        </div>
        <div className="address_account_detail wk">
          <label>Địa Chỉ</label>
          <textarea
            className="detail_info_content"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          >
            {data.address}
          </textarea>
        </div>

        <div className="btn_save wk">
          <button className="btn_save_bt" onClick={UpdateCloud}>
            Lưu
          </button>
        </div>
      </div>
    </>
  );
};
export default Info;
