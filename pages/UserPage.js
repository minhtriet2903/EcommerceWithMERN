import styled from "styled-components";
import Frame from "../components/Frame";
import axios from "axios";
import React, { useState, useEffect } from "react";
import cookies from "next-cookies";
import cookieCutter from "cookie-cutter";
import { useRef } from "react";
import Info from "./profile/info";
import ChangePass from "./profile/changePass";
/* import {ChangePassword} from '../components/ChangePassword';
import {UpdateAddress} from '../components/UpdateAddress'; */

export default function UserPage({ data }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [selectProvince, setSelectProvince] = useState("");
  const [statePage, setStagePage] = useState(true);

  useEffect(() => {
    setEmail(data.email);
    setPhone("022222333");
    setSex(data.sex);
    setAddress(data.address);
  }, [data]);

  function GetDate(fulltime) {
    const dateTime = new Date(fulltime);

    return dateTime.toLocaleDateString();
  }

  const Dv = useRef([]);
  const ShowMode = (title) => {
    return <h6>{title}</h6>;
  };

  const handleDrop = () => {
    const content = document.getElementById("change_pass");

    content.classList.toggle("active_drop");
  };
  const handleInfo = (e) => {
    const tar = document.querySelectorAll(".index");
    const i = Number(e.target.attributes.num.value);
    tar.forEach((l) => l.classList.remove("default_color"));
    tar[i - 1].classList.add("default_color");
    if (i === 1) setStagePage(true);
    else setStagePage(false);
  };
  return (
    <>
      <div className="profile">
        <div className="profile_body">
          <div className="profile_option">
            <div className="name_img">
              <div className="profile_img">
                <img
                  src="https://ln.hako.re/img/noava.png"
                  alt="https://ln.hako.re/img/noava.png"
                />
              </div>
              <div className="profile_name">
                <span className="profile_name_ti">{data.name}</span>
                <div className="preview_pro">
                  <i className="bx bx-pencil"></i>
                  <span>Sửa Hồ Sơ</span>
                </div>
              </div>
            </div>
            <div className="info_detail">
              <div className="pro_account" id="pro_account">
                <div onClick={handleDrop}>
                  <i className="bx bx-user"></i>
                  <span>Tài khoản của tôi</span>
                </div>

                <ul className="change_pass active_drop" id="change_pass">
                  <li
                    className="index default_color"
                    num="1"
                    onClick={handleInfo}
                  >
                    Hồ sơ
                  </li>
                  <li className="index" num="2" onClick={handleInfo}>
                    Đổi mật khẩu
                  </li>
                </ul>
              </div>

              <div className="info_bill">
                <i className="bx bx-shopping-bag"></i>
                <span>Lịch sử mua hàng</span>
              </div>
            </div>
          </div>
          <div className="profile_content">
            {statePage ? <Info data={data} /> : <ChangePass data={data} />}
          </div>
        </div>
      </div>
    </>
  );
}
UserPage.getInitialProps = async (ctx) => {
  const { Acc } = cookies(ctx);

  const res21 = await fetch("http://localhost:5035/users/" + Acc);
  var json21 = await res21.json();

  /*   const res11 = await fetch("http://localhost:5035/users/" + Acc + "/bills");
        var json11 = await res11.json();
        for (var i = 0; i < json11.length; i++) {
            for (var j = 0; j < (json11[i].Products).length; j++) {
                var courseId = (json11[i].Products)[j].courseId;
                if ((json11[i].Products)[j].courseId == undefined) {
                    courseId = (json11[i].Products)[j].product.id;
                }
                const res21 = await fetch("http://localhost:5035/courses/" + courseId);
                const json21 = await res21.json();
                if (!json21) {
                    (json11[i].Products)[j].courseName = "Không tồn tại";
                    continue;
                }
                (json11[i].Products)[j].courseName = json21.Name;
            }
        } */

  return { data: json21 };
};
