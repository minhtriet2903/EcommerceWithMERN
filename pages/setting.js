import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFax,
  faPhone,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
const UserSection = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  border-radius: 8px;
  margin: 16px 16px;
`;
const UserName = styled.p`
  color: black;
  text-decoration: none;
`;
const UserInfo = styled.div`
  display: flex;
`;
const UserInfoTitle = styled.div`
  font-weight: bold;
`;
const UserInfoContent = styled.div`
  margin-left: 20px;
`;

const Setting = () => {
  return (
    <div>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <UserSection>
            <UserImg
              src="http://localhost:5035/upload/images/default.png"
              width="200px"
              height="200px"
            ></UserImg>
            <UserInfo>
              <UserInfoTitle>
                <UserName>Họ và tên</UserName>
                <UserName>Ngày sinh</UserName>
                <UserName>Email</UserName>
                <UserName>Địa chỉ</UserName>
                <UserName>Số điện thoại</UserName>
              </UserInfoTitle>
              <UserInfoContent>
                <UserName>Họ và tên</UserName>
                <UserName>Ngày sinh</UserName>
                <UserName>Email</UserName>
                <UserName>Địa chỉ</UserName>
                <UserName>Số điện thoại</UserName>
              </UserInfoContent>
            </UserInfo>
          </UserSection>
        </Content>
      </ContentContainer>
    </div>
  );
};

export default Setting;
