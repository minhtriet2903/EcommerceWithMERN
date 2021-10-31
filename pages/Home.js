import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table";
import Button from "../components/Button";
//import OutLineButton from "../components/OutLineButton";
import Modal from "../components/Modal";

const OutLineButton = styled.button`
  border-radius: 20px;
  border-color: lightskyblue;
  color: lightcoral;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;
export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <OutLineButton onClick={() => setShowModal(true)}>
        Open Modal
      </OutLineButton>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        Hello from the modal!
      </Modal>
    </div>
  );
}
