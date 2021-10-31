import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [user, setUser] = useState({ role: "Manager" });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "role") {
      setUser({ ...user, role: value });
    } else {
      setUser({ ...user, role: value });
    }
  };
  const router = useRouter();
  const handleLogin = () => {
    if (user && user.role === "Manager") {
      router.push("/admin");
    } else router.push("/course");
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
          <h2>login</h2>
          <div className="form-group mb-2">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              placeholder="Nhập tên sản phẩm"
              required
              name="role"
              value={user.role}
              onChange={handleChange()}
            />
          </div>
          <button onClick={handleLogin}> Login </button>
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
