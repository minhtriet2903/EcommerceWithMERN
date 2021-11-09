import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFax, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import {useRouter} from "next/router"
import cookies from "next-cookies";

function filtByShipperID(data,id){
  var re=[];
  for(let i=0;i<data.length; i++){
    if(data[i].idShipper==id){
      re.push(data[i]);
    }
  }
  return re;
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:5035/bills/");
  const json = await res.json();
  const {Acc} =cookies(ctx);
  const res31 = await fetch("http://localhost:5035/users/"+Acc);
  var json31 = await res31.json();
  return { data: filtByShipperID(json,Acc) };
};

const Content = styled.div`
  margin: 20px;
  background-color: white;
  height: auto;
  width: auto;
  padding: 12px;
  border-radius: 12px;
  justify-content: center;
`;
const Button = styled.button`
  border-radius: 8px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;
const Item = styled.div`
  padding-left: 16px;
  width: auto;
  flex-wrap: nowrap;
`;

export default function Home({ data }) {
  const [user, setUser] = useState();
  const [tableData, setTableData] = useState(data);
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [province, setProvince] = useState("All");
  const [method, setMethod] = useState("Theo ngày và thuộc tính");

  useEffect(() => {
    const Acc = cookieCutter.get("Acc");
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data && data);
      };
      fetchUser();
    }
  }, []);
  const router = useRouter();
  const setBillForShipper = (id, trangthai) => {
    const updateBillStatus = axios.put("http://localhost:5035/bills/" + id, {
      Status: trangthai,
    });


    const updateShipperBillQuantity = axios.put(
      "http://localhost:5035/users/" + id,
      {
        currentBillQuantity: user.currentBillQuantity - 1,
      }
    );

    axios
      .all([updateBillStatus, updateShipperBillQuantity])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
    window.location.reload();
  };
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "province") setProvince(value);
    else if (name == "status") setStatus(value);
    else setMethod(value);
  };
  const handleSubmit = () => {
    if (method == "Theo ngày và thuộc tính") {
      axios
        .get(
          "http://localhost:5035/bills",
          {
            params: {
              province,
              status,
              startDate,
              endDate,
            },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
          setTableData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (method == "Theo ngày") {
      axios
        .get(
          "http://localhost:5035/bills",
          {
            params: {
              startDate,
              endDate,
            },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
          setTableData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(
          "http://localhost:5035/bills",
          {
            params: {
              province,
              status,
            },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
          setTableData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Content>
        <p>Lọc theo ngày hóa đơn</p>
        <div className="row align-items-center">
          <div className="col-auto d-flex flex-row ">
            <p>Từ ngày</p>
            <div style={{ marginLeft: "8px" }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="col-auto d-flex flex-row ">
            <p>Đến ngày</p>
            <div style={{ marginLeft: "8px" }}>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="col-auto d-flex flex-row ">
            <p>Tỉnh</p>
            <div style={{ marginLeft: "16px" }}>
              <select
                className="form-control"
                id="province"
                required
                name="province"
                value={province}
                onChange={handleChange()}
              >
                <option>All</option>
                <option>Bình Dương</option>
                <option>Đồng Nai</option>
                <option>Vũng Tàu</option>
              </select>
            </div>
          </div>
          <div className="col-auto d-flex flex-row ">
            <p>Trạng thái </p>
            <div style={{ marginLeft: "16px" }}>
              <select
                className="form-control"
                id="status"
                required
                name="status"
                value={status}
                onChange={handleChange()}
              >
                <option>All</option>
                <option>Đã đặt</option>
                <option>Đang giao hàng</option>
                <option>Đã giao hàng</option>
                <option>Khách trả hàng</option>
              </select>
            </div>
          </div>
          <div
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="col-auto d-flex flex-row ">
            <Item>Lọc theo</Item>
            <div style={{ marginLeft: "16px" }}>
              <select
                className="form-control"
                id="method"
                required
                name="method"
                value={method}
                onChange={handleChange()}
              >
                <option>Theo ngày và thuộc tính</option>
                <option>Theo ngày</option>
                <option>Theo thuộc tính</option>
              </select>
            </div>
            <Button style={{ marginLeft: "16px" }} onClick={handleSubmit}>
              Lọc
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-striped"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Ngày hóa đơn</th>
                <th>Số lượng hàng</th>
                <th>Giá trị hóa đơn</th>
                <th>Trạng thái hóa đơn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item,index) => (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.BillDate}</td>
                  <td>{item.Products.length}</td>
                  <td>{item.TotalPrice}</td>
                  <td>{item.Status}</td>
                  <td>
                    {item.Status === "Đang giao hàng" && (
                      <Button
                        onClick={() =>
                          setBillForShipper(item._id, "Đã giao hàng")
                        }
                      >
                        {" "}
                        Đã giao hàng{" "}
                      </Button>
                    )}

                    {item.Status === "Đang giao hàng" && (
                      <Button
                        onClick={() =>
                          setBillForShipper(item._id, "Trả lại hàng")
                        }
                      >
                        {" "}
                        Trả lại hàng{" "}
                      </Button>
                    )}

                    <Link href={"/bill/" + item._id}>
                      <Button> Chi tiết </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="row">
            <div className="col">
              <h5>Sản phẩm phát triển bởi BUG</h5>
            </div>
            <div className="col">
              <h5>Mọi thắc mắc xin liên hệ</h5>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "12px" }} />
              <FontAwesomeIcon icon={faFax} style={{ marginRight: "12px" }} />
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
