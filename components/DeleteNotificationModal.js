import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { faCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const DeleteNotificationModal = ({
  show,
  onClose,
  children,
  title,
  id,
  prefix,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const router = useRouter();
  const deleteItem = () => {
    axios.delete("http://localhost:5035/" + prefix + "s/" + id);
  };
  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          {prefix == "bill" && (
            <div>
              <h2>Bạn có chắc muốn xóa hóa đơn với id = {id}</h2>
              <a href="/bill">
                <Button
                  onClick={deleteItem}
                  style={{ background: "red", color: "whitesmoke" }}
                >
                  Xóa
                </Button>
                <Button>Hủy</Button>
              </a>
            </div>
          )}
          {prefix == "course" && (
            <div>
              <h2>Bạn có chắc muốn xóa sản phẩm với id = {id}</h2>
              <a href="/course">
                <Button
                  onClick={deleteItem}
                  style={{ background: "red", color: "whitesmoke" }}
                >
                  Xóa
                </Button>
                <Button>Hủy</Button>
              </a>
            </div>
          )}
          {prefix == "user" && (
            <div>
              <h2>Bạn có chắc muốn xóa tài khoản với id = {id}</h2>
              <a href="/user">
                <Button
                  onClick={deleteItem}
                  style={{ background: "red", color: "whitesmoke" }}
                >
                  Xóa
                </Button>
                <Button>Hủy</Button>
              </a>
            </div>
          )}
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

export default DeleteNotificationModal;
