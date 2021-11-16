import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";

const Modal = ({ show, onClose, children, title, item }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const getShippers = () => {
    axios
      .get("http://localhost:5035/users/shippers", {
        params: { area: item.Province },
      })
      .then((res) => {
        setShippers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function cut(sstring){
    var re="";
    for(let i=0;i<sstring.length;i++){
      if(sstring[i]>='A'&&sstring[i]<='Z'){
        break;
      }
      re+=sstring[i];
    }
    return re;
  }
  const router = useRouter();
  const setBillForShipper = (shipper) => {
    axios
      .get("http://localhost:5035/coursesAll")
      .then((res) => {
        let getAll = res.data;
        console.log(item.Products);
        for (let j = 0; j < item.Products.length; j++) {
          for (let i = 0; i < getAll.length; i++) {
            if (item.Products[j].product.id === getAll[i]._id) {
              getAll[i].soldQuantity += item.Products[j].quantity;
              axios
                .put("http://localhost:5035/courses/" + getAll[i]._id, {
                  soldQuantity: getAll[i].soldQuantity,
                })
                .then((res) => {
                  console.log("ok");
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .put("http://localhost:5035/users/" + shipper._id, {
        currentBillQuantity: shipper.currentBillQuantity + 1,
      })
      .then((res) => {
        console.log("ok");
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .put("http://localhost:5035/bills/" + item._id, {
        idShipper: shipper._id,
        shipperName: shipper.name,
        Status: "Đang giao hàng",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

        axios
          .post("http://localhost:5035/users/"  , {
            email: item.userEmail,
            subject: "Thông báo đơn hàng đang được giao",
            htmlContent: `
              Đơn hàng ngày:${cut(item.BillDate)} của bạn đang được giao
              Trân Trọng!
              `
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      
    router.push("/bill");
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title }
        <StyledModalBody>
          <h2>
            Phân công hóa đơn id = {item._id} tại khu vực: {item.Province}
          </h2>
          <button onClick={getShippers}>Phân công</button>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Khu vực đăng kí</th>
                  <th>Số lượng đơn đang giao</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {shippers.map((shipper,index) => (
                  <tr key={index}>
                    <td>{shipper.name}</td>
                    <td>{shipper.shipperArea}</td>
                    <td>{shipper.currentBillQuantity}</td>
                    <td>
                      <button onClick={() => setBillForShipper(shipper)}>
                        Phân công
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
