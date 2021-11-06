import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import cookieCutter from "cookie-cutter";
import { shallowEqual } from "react-redux";
import axios from "axios";
const ChangePass = ({ data }) => {
  const router = useRouter();
  const [password, setPassWord] = useState("");
  const [newPassword, setNewPassWord] = useState("");
  const [RePassword, setRePassWord] = useState("");
  /*      const fetchPass = async () =>{
                 const res21 = await fetch("http://localhost:5035/users/checkPassword" ,{
                     method: 'POST',
                     body: JSON.stringify({
                         password:password,
                         curUserPassword:newPassword
                     }),
                     headers: {
                         'Content-Type': 'application/json'
                 });
                 var json21 = await res21.json();
             }
         })   */

  const handlePost = async () => {
    if (newPassword === RePassword && newPassword.length >= 6) {
      const res21 = await fetch("http://localhost:5035/users/checkPassword", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          curUserPassword: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      var data1 = await res21.json();
      console.log(data1);
      if (data1.password === 1) {
        axios
          .put(
            "http://localhost:5035/users/" + data._id,
            { password: newPassword },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(function (response) {
            console.log("sussces");
            swal("Thông Báo!", "Thay đổi mật khẩu thành công", "success");
             cookieCutter.set("Acc", "");
          
            document.cookie = "Acc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("/"); 
          })
          .catch(function (error) {
            swal("Thông Báo!", "Thay đổi thất bại", "error");
            console.log("error");
            console.log(error);
          });
      } else {
        swal("Thông Báo!", "Mật khẩu cũ không hợp lệ", "error");
      }
    } else {
      swal("Thông Báo!", "Mật khẩu phải lớn hơn hoặc bằng 6 ký tự", "error");
    }
  };
  return (
    <>
      <div className="info_title">
        <p>Đổi mật khẩu</p>
        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className="info_detail_pro">
        <div className="phone_account_detail wk">
          <label>Mật khẩu cũ</label>
          <input
            type="password"
            className="detail_info_content"
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        <div className="phone_account_detail wk">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="detail_info_content"
            onChange={(e) => setNewPassWord(e.target.value)}
          />
        </div>
        <div className="email_account_detail wk">
          <label>Nhập lại mật khẩu</label>

          <input
            type="password"
            className="detail_info_content"
            onChange={(e) => setRePassWord(e.target.value)}
          />
        </div>

        <div className="btn_save wk">
          <button className="btn_save_bt" onClick={handlePost}>
            Lưu
          </button>
        </div>
      </div>
    </>
  );
};
export default ChangePass;
