import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import SideBar from "../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFax,
  faFilter,
  faPhone,
  faPlus,
  faSortUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeleteNotificationModal from "../../components/DeleteNotificationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:5035/coursesAll");
  console.log(res);
  const json = await res.json();

  return { data: json};
};

const ContentContainer = styled.div`
  padding-left: 250px;
`;
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
const DateFilter = styled.div`
  display: flex;
`;
export default function Home({ data }) {
 
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  const [img,setImg] = useState("");
  const [esc, setEsc] = useState(false);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tableData, setTableData] = useState(data);

  const filterWithDateRange = () => {
    axios
      .get("http://localhost:5035/courses/dateRange", {
        params: {
          startDate,
          endDate,
        },
      })
      .then(function (response) {
        console.log(response);
        setTableData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getEscTopSale = () => {
    if (esc) {
      var tmp_tale = [...tableData];
      tmp_tale.sort(function (a, b) {
        var itemA = a.soldQuantity;
        var itemB = b.soldQuantity;
        if (itemA < itemB) {
          return -1;
        }
        if (itemA > itemB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      setTableData(tmp_tale);
      setEsc(false);
    } else {
      var tmp_tale = [...tableData];
      tmp_tale.sort(function (a, b) {
        var itemA = a.soldQuantity;
        var itemB = b.soldQuantity;
        if (itemA < itemB) {
          return 1;
        }
        if (itemA > itemB) {
          return -1;
        }
        // names must be equal
        return 0;
      });
      setTableData(tmp_tale);
      setEsc(true);
    }
  };

  return (
    <div>
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        img={img}
        prefix="course"
      >
        Hello from the modal!
      </DeleteNotificationModal>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <p>Lọc theo ngày nhập hàng</p>
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
            <div className="col-auto ">
              <Button onClick={() => filterWithDateRange()}>Lọc</Button>
            </div>
          </div>
          <Link href="/course/addProduct">
            <Button>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />{" "}
              Thêm sản phẩm
            </Button>
          </Link>
          <nav aria-label="Page navigation example"></nav>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>Tên</th>
                  <th>Hình minh họa</th>
                  <th>Ngày nhập hàng</th>
                  <th>Số lượng nhập</th>
                  <th>
                    Số lượng bán{" "}
                    <FontAwesomeIcon
                      onClick={getEscTopSale}
                      icon={faFilter}
                      style={{ marginRight: "8px" }}
                    />{" "}
                  </th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                 {tableData.map((item,index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>
                      <img src={item.Image} width="50px" height="50px" />
                    </td>
                    <td>{item.DateIn}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.enteringQuantity}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.soldQuantity}</td>
                    <td style={{ textAlign: "center" }}>
                      <Link href={"/course/" + item._id}>
                        <Button>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </Link>
                      <a
                        onClick={() => {
                          setShowModal(true), setItemId(item._id) ; setImg(item.Image);
                        }}
                      >
                        <Button>
                          {" "}
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </Button>
                      </a>
                      <Link href={"/course/" + item._id + "/comments"}>
                        <Button> Bình luận </Button>
                      </Link>
                    </td>
                  </tr>
                )) } 
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
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ marginRight: "12px" }}
                />
                <FontAwesomeIcon icon={faFax} style={{ marginRight: "12px" }} />
              </div>
            </div>
          </div>
        </Content>
      </ContentContainer>
    </div>
  );
}
