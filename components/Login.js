import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import Router from "next/router";
import { toast, ToastContainer } from "react-nextjs-toast";

export const Login = ({ show, setShow, setShowRegister, setLoginstate }) => {
  const hide = () => {
    setPassword("");
    setEmail("");
    setPassnoity("");
    setShow(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [Passnoity, setPassnoity] = useState("");

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "role") {
      setRole(value);
    }
  };
  const handleSubmit = () => {
    setPassnoity("để coi đúng hôn");
    console.log(email);
    axios
      .post(
        "http://localhost:5035/users/login",
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response.data.user);
        cookieCutter.set("Acc", response.data.user._id);
        setLoginstate[0](
          setLoginstate[7](
            response.data.user.name,
            setLoginstate[2],
            setLoginstate[3],
            setLoginstate[4],
            setLoginstate[5],
            setLoginstate[6]
          )
        );
        setPassnoity("Đúng rồi");
        hide();
      })
      .catch(function (error) {
        console.log(error);
        setPassnoity("Sai rồi");
      });
  };
  const Regis = () => {
    hide();
    setShowRegister(true);
  };
  console.log(123123);
  return <>{show ? <></> : ""}</>;
};
