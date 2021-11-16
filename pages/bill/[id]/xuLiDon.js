import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFax, faPhone } from "@fortawesome/free-solid-svg-icons";
import ModalPhanCongGH from "../../../components/ModalPhanCongGH";
import ModalHuyDon from "../../../components/ModalHuyDon";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

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

const Home = ({ item }) => {
  const [showPhanCongModal, setShowPhanCongModal] = useState(false);
  const [showModalHuyDon, setShowModalHuyDon] = useState(false);
  const [relativeTable, setRelativeTable] = useState([]);

  const getRelativeData = () => {
    axios
      .get("http://localhost:5035/coursesAll")
      .then(function (response) {
        let getAll = response.data;
        console.log(item.Products);
        let res = [];
        for (let j = 0; j < item.Products.length; j++) {
          for (let i = 0; i < getAll.length; i++) {
            if (item.Products[j].product.id === getAll[i]._id) {
              res.push(getAll[i]);
              break;
            }
          }
        }
        setRelativeTable(res);
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <ModalPhanCongGH
        onClose={() => setShowPhanCongModal(false)}
        show={showPhanCongModal}
        item={item}
      >
        Phan Cong Modal
      </ModalPhanCongGH>
      <ModalHuyDon
        onClose={() => setShowModalHuyDon(false)}
        show={showModalHuyDon}
        item={item}
      >
        Phan Cong Modal
      </ModalHuyDon>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <div>
            <h4>Chi tiết hóa đơn</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Mã hàng</th>
                    <th>Số lượng</th>
                    <th>Giá đơn vị</th>
                    <th>Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {item.Products.map((it,index) => (
                    <tr key={index}>
                      <td>{it.product.id}</td>
                      <td>{it.quantity}</td>
                      <td>{it.product.price}</td>
                      <td>{it.product.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4>Các sản phẩm cần kiểm tra</h4>
            <Button onClick={getRelativeData}>Những sản phẩm liên quan</Button>
            <div className="table-responsive" style={{ textAlign: "center" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Số lượng nhập</th>
                    <th>Số lượng bán</th>
                  </tr>
                </thead>
                <tbody>
                  {relativeTable.map((item,index) => (
                    <tr key={index}>
                      <td>{item.Name}</td>
                      <td>{item.enteringQuantity}</td>
                      <td>{item.soldQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button
              onClick={() => {
                setShowPhanCongModal(true);
              }}
            >
              Phân công giao hàng
            </Button>
            <Button
              onClick={() => {
                setShowModalHuyDon(true);
              }}
            >
              Hủy đơn hàng
            </Button>
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
