import React from "react";
import axios from "axios";
import { useState } from "react";

function Form() {
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [shipperArea, setShipperArea] = useState([]);
  const [areas, setAreas] = useState(["Bình Phước", "Bình Dương", "Tây Ninh", "Đồng Nai", "Vũng Tàu", "TP.Hồ Chí Minh", "Long An"]);

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
    } else if (name == "birthday") {
      setBirthday(value);
    } else if (name == "phoneNumber") {
      setPhoneNumber(value);
    } else if (name == "sex") {
      setSex(value);
    }
  };
  const handleSetShipperArea = (area) => () => {
    const clickedCategory = shipperArea.indexOf(area);
    const all = [...shipperArea];
    if (clickedCategory === -1) {
      all.push(area);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setShipperArea(all);
  };
  const handleSubmit = () => {
    if (role === "Shipper") {
      axios
        .post(
          "http://localhost:5035/users/register",
          {
            name,
            email,
            password,
            role,
            shipperArea,
            birthday,
            phoneNumber,
            sex,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(
          "http://localhost:5035/users/register",
          { name, email, password, role, birthday, phoneNumber, sex },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="container-md">
      <h2>Thêm mới tài khoản</h2>
      <form method="POST" onSubmit={handleSubmit} action="/user">
        <div className="form-group mb-2">
          <label htmlFor="name">Tên người dùng</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên người dùng"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email cá nhân</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập email"
            required
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Giới tính</label>
          <select
            className="form-control"
            id="sex"
            required
            name="sex"
            value={sex}
            onChange={handleChange()}
          >
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="birthday">Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            required
            name="birthday"
            value={birthday}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Nhập số điện thoại liên lạc"
            required
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password">Mật khẩu tài khoản</label>
          <input
            type="Password"
            className="form-control"
            id="password"
            placeholder="Vui lòng nhập mật khẩu"
            required
            name="password"
            value={password}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Vai trò</label>
          <select
            className="form-control"
            id="role"
            required
            name="role"
            value={role}
            onChange={handleChange()}
          >
            <option>Manager</option>
            <option>Shipper</option>
            <option>Customer</option>
          </select>
        </div>
        {role == "Shipper" && (
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="shipperArea">Khu vực đăng ký giao hàng</label>
            {areas.map((area, index) => (
              <div key={index}>
                <input type="checkbox" onChange={handleSetShipperArea(area)} />
                <label style={{ marginLeft: "8px" }}>{area}</label>
              </div>
            ))}
          </div>
        )}
        <hr />

        <button type="submit" className="btn btn-primary">
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
}
export default Form;
