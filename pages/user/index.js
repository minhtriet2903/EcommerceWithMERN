import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import SideBar from "../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFax,
  faPhone,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeleteNotificationModal from "../../components/DeleteNotificationModal";
import axios from "axios";

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:5035/users?size=10&page=0");
  const json = await res.json();
  return { data: json };
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
export default function Home({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  const [role, setRole] = useState("All");
  const [page, setPage] = useState(0);
  const [userTable, setUserTable] = useState(data.tutorials);
  const array = [...Array(data.totalPages)];

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRole(value);
  };
  const handleChangePage = (index) => {
    setPage(index);
  };
  const handleChangePageIndex = async (index) => {
    await handleChangePage(index);
    if (role != "All") {
      axios
        .get("http://localhost:5035/users?size=10", {
          params: {
            page: index,
            role: role,
          },
        })
        .then((res) => {
          console.log(res);
          setUserTable(res.data.tutorials);
        });
    } else {
      axios
        .get("http://localhost:5035/users?size=10", {
          params: {
            page: index,
          },
        })
        .then((res) => {
          console.log(res);
          setUserTable(res.data.tutorials);
        });
    }
  };
  const filterWithRole = async () => {
    axios
      .get("http://localhost:5035/users?size=10&page=0", {
        params: {
          role: role,
        },
      })
      .then((res) => {
        console.log(res);
        setUserTable(res.data.tutorials);
        setPage(0);
      });
  };
  return (
    <div>
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        prefix="user"
      >
        Hello from the modal!
      </DeleteNotificationModal>
    
      <ContentContainer>
        <Content>
          <div
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p>Vai trò</p>
            <div style={{ marginLeft: "16px" }}>
              <select
                className="form-control"
                id="role"
                required
                name="role"
                value={role}
                onChange={handleChange()}
              >
                <option>All</option>
                <option>Manager</option>
                <option>Shipper</option>
                <option>Customer</option>
              </select>
            </div>
            <Button onClick={filterWithRole} style={{ marginLeft: "16px" }}>Lọc</Button>
          </div>

          <Link href="/user/addUser">
            <Button style={{ marginTop: "16px" }}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />{" "}
              Thêm tài khoản
            </Button>
          </Link>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {array.map((value, index) =>
                index == page ? (
                  <li className="page-item ">
                    <a className="page-link bg-info" href="#">
                      {index + 1}
                    </a>
                  </li>
                ) : (
                  <li className="page-item ">
                    <a
                      className="page-link "
                      href="#"
                      onClick={() => handleChangePageIndex(index)}
                    >
                      {index + 1}
                    </a>
                  </li>
                )
              )}
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="table-responsive" style={{ textAlign: "center" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>email</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {userTable.map((item,index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>{item.createDate}</td>
                    <td>
                      <Link href={"/user/" + item._id}>
                        <Button>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </Link>
                      <a
                        onClick={() => {
                          setShowModal(true), setItemId(item._id);
                        }}
                      >
                        <Button>
                          {" "}
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </Button>
                      </a>
                      <Link href={"/user/" + item._id}>
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
