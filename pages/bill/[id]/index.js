import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import SideBar from "../../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFax,
  faHome,
  faPhone,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeleteNotificationModal from "../../../components/DeleteBillProductNotificationModal";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5035/bills");
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
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
export const getStaticProps = async (context) => {

  const id = context.params.id;
  const res = await fetch("http://localhost:5035/bills/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

const Home = ({ item }) => {
 
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  const [cmtId, setCmtId] = useState("false");
  return (
    <div>
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        prefix="course"
        cmtId={cmtId}
      >
        Hello from the modal!
      </DeleteNotificationModal>
     
      <ContentContainer>
        <Content>
          <Link href={"/bill"}>
            <Button>
              {" "}
              <FontAwesomeIcon icon={faHome} />{" "}
            </Button>
          </Link>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Mã hàng</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                
                  <th>Giá đơn vị</th>
                  <th>Giá trị</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {item.Products.map((it,index) => (
                  <tr key={index}>
                    <td>{it.product.id}</td>
                    <td>{it.product.name}</td>
                    <td>{it.quantity}</td>
                    <td>{it.product.price}</td>
                    <td>{it.product.price * it.quantity}</td>
                    <td>
                      <a
                        onClick={() => {
                          setShowModal(true),
                            setItemId(item._id),
                            setCmtId(it.courseId);
                        }}
                      >
                        <Button>
                          {" "}
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </Button>
                      </a>
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
};

export default Home;
