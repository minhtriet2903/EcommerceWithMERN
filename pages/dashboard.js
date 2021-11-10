import Showblock from "../components/Showblock";
import styled from "styled-components";
import Table from "../components/Table";
import DatePicker from "react-datepicker";
import axios from "axios";
import React, { useEffect, useState } from "react";
const Buttonscontaner = styled.div`
  display: flex;
  width: 100%;
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
const Devide = styled.table`
  width: 100%;
  height: 500px;
  font-family: roboto;
  & tr {
    width: 100%;
    height: 50%;
    td {
      width: 50%;
      height: 50%;
    }
  }
`;
const Mother = styled.div`
  background-color: #f0efef;
`;
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
function deformDate(s){
  // s.setMonth(s.getMonth());
  var re="";
  re+=String(s.getMonth() + 1).padStart(2, '0')+"-";
  re+=String(s.getDate()).padStart(2, '0')+"-";
  re+=s.getFullYear();
  return re;
}
function Cutrightmost(string, keep) {
  var re = string.substring(0, 15);
  if (re.length == string.length) {
    return re;
  }
  var i = re.length - 1;
  for (; re[i] != " "; i--);
  return re.substring(0, i) + "...";
}
function SoldProductsMapping(Pros, bills) {
  var re = {};
  for (var i = 0; i < Pros.length; i++) {
    re[Pros[i]._id] = [Cutrightmost(Pros[i].Name), Pros[i].Price, 0, 0];
  }
  for (var i = 0; i < bills.length; i++) {
    for (var j = 0; j < bills[i].Products.length; j++) {
      if (bills[i].Products[j].product != undefined) {
        if (re[bills[i].Products[j].product.id] != undefined) {
          re[bills[i].Products[j].product.id][2]+=bills[i].Products[j].quantity;
          re[bills[i].Products[j].product.id][3] +=
            re[bills[i].Products[j].product.id][1];
        }
      }
      // if (re[bills[i].Products[j].courseId] == undefined) {
      //   continue;
      // }
      // re[bills[i].Products[j].courseId][2]++;
      // re[bills[i].Products[j].courseId][3] +=
      //   re[bills[i].Products[j].courseId][1];
    }
  }
  var returnn = [];
  for (var i = 0; i < Pros.length; i++) {
    returnn.push(re[Pros[i]._id]);
  }
  return returnn;
}
function Users_Spended_Mapping(Users, bills) {
  var re = {};
  for (var i = 0; i < Users.tutorials.length; i++) {
    re[Users.tutorials[i]._id] = [Users.tutorials[i].name, 0, 0];
  }
  re["NoLogin"]=["Guest(NoLogin)",0,0];
  for (var i = 0; i < bills.length; i++) {
    if (re[bills[i].userId] == undefined) {
      console.log(bills[i].userId);
      continue;
    }
    for(let j = 0; j < bills[i].Products.length; j++){
      re[bills[i].userId][1]+=bills[i].Products[j].quantity;
      re[bills[i].userId][2]+=bills[i].Products[j].product.price;
    }
//    re[bills[i].userId][2] += bills[i].TotalPrice;
  }
  var returnn = [];
  for (var i = 0; i < Users.tutorials.length; i++) {
    returnn.push(re[Users.tutorials[i]._id]);
  }
  returnn.push(re["NoLogin"]);
  return returnn;
}
export default function Statictical({ data }) {
//  console.log(data.Total_Bills);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tableData, setTableData] = useState({Pros:data.Pros_Pre,Users:data.Users_Pre});
  const total = (da) => {
    var re = 0;
    for (var i = 0; i < da.length; i++) {
      for(var j = 0; j < da[i].Products.length; j++) {
        re += (da[i].Products[j].product.price)*(da[i].Products[j].quantity);
      }
      
    }
    return re;
  };
  const Count = (da) => {
    var re = 0;
    for (var i = 0; i < da.length; i++) {
      for(var j = 0; j < da[i].Products.length; j++) {
        re += da[i].Products[j].quantity;
      }
    }
    return re;
  };
  const filterWithDateRange = () => {
    setTableData({Pros:[], Users:[]});
    axios
      .get("http://localhost:5035/bills/dateRange?startDate="+deformDate(startDate)+"&endDate="+deformDate(endDate)
      )
      .then(function (response) {
        console.log(response);
        const pros=SoldProductsMapping(data.Curses,response.data);
        const users=Users_Spended_Mapping(data.Users,response.data);
        setTableData({Pros:pros, Users:users});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <ContentContainer>
      <Content>
        <Mother>
          <Buttonscontaner>
            <Showblock
              color={"red"}
              data={{
                time: "doanh thu tháng này",
                value: total(data.This_month_Bills),
                count: Count(data.This_month_Bills),
              }}
            />
            <Showblock
              color={"blue"}
              data={{
                time: "doanh thu tháng trước",
                value: total(data.Last_month_Bills),
                count: Count(data.Last_month_Bills),
              }}
            />
            <Showblock
              color={"green"}
              data={{
                time: "doanh thu hôm nay",
                value: total(data.Today_Bills),
                count: Count(data.Today_Bills),
              }}
            />
            <Showblock
              color={"yellow"}
              data={{
                time: "Tổng doanh thu",
                value: total(data.Total_Bills),
                count: Count(data.Total_Bills),
              }}
            />
          </Buttonscontaner>
          <p>Lọc theo ngày tạo hóa đơn</p>
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
          <Devide>
            <tr>
              <td>
                <Table
                  data={{
                    name: "Sản phẩm",
                    header: [
                      "Tên sản phẩm",
                      "Giá đơn vị",
                      "Số lượng bán",
                      "Tổng",
                    ],
                    rows: tableData.Pros,
                  }}
                />
              </td>
              <td>
                <Table
                  data={{
                    name: "Khách hàng",
                    header: ["Tên khách hàng", "Số hàng đã mua", "Tổng tiêu"],
                    rows: tableData.Users,
                  }}
                />
              </td>
            </tr>
          </Devide>
        </Mother>
      </Content>
    </ContentContainer>
  );
}



Statictical.getInitialProps = async (ctx) => {
  var This_month_Bills_Start_date = new Date();
  var Now = new Date();
  Now.setDate(Now.getDate()+1);
  This_month_Bills_Start_date.setDate(1);
  const resThismonthBills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
    deformDate(This_month_Bills_Start_date) +
      "&endDate=" +
      deformDate(Now)
  );
  const jsonThismonthBills = await resThismonthBills.json();

  var Last_month_Bills_Start_date = new Date();
  Last_month_Bills_Start_date.setDate(1);
  Last_month_Bills_Start_date.setMonth(
    Last_month_Bills_Start_date.getMonth() - 1
  );
  var Last_month_Bills_End_date = new Date(
    Last_month_Bills_Start_date
  );
  Last_month_Bills_End_date.setMonth(Last_month_Bills_End_date.getMonth() + 1);
  Last_month_Bills_End_date.setDate(0);
  const res_Last_month_Bills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
    deformDate(Last_month_Bills_Start_date) +
      "&endDate=" +
      deformDate(Last_month_Bills_End_date)
  );
  const json_Last_month_Bills = await res_Last_month_Bills.json();
  //console.log("http://localhost:5035/bills/dateRange?startDate="+Last_month_Bills_Start_date.toLocaleDateString()+"&endDate="+Last_month_Bills_End_date.toLocaleDateString());

  var Today = new Date();
  // console.log("http://localhost:5035/bills/dateRange?startDate=" +
  // deformDate(This_month_Bills_Start_date) +
  //   "&endDate=" +
  //   deformDate(Now));
  var Tomorrow = new Date();
  Tomorrow.setDate(Today.getDate() + 1);
  const res_Today_Bills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
    deformDate(Today) +
      "&endDate=" +
      deformDate(Tomorrow)
  );
  const json_Today_Bills = await res_Today_Bills.json();
  console.log("http://localhost:5035/bills/dateRange?startDate=" +
  deformDate(Last_month_Bills_Start_date) +
    "&endDate=" +
    deformDate(Last_month_Bills_End_date));

  const res_All_Bills = await fetch("http://localhost:5035/bills");
  const json_All_Bills = await res_All_Bills.json();
  //console.log(json_Total_Bills);

  const res_All_Courses = await fetch("http://localhost:5035/coursesAll");
  const json_All_Courses = await res_All_Courses.json();

  const res_All_Users = await fetch("http://localhost:5035/users?size=1000");
  const json_All_Users = await res_All_Users.json();

  return {
    data: {
      This_month_Bills: jsonThismonthBills,
      Last_month_Bills: json_Last_month_Bills,
      Today_Bills: json_Today_Bills,
      Total_Bills: json_All_Bills,
      Pros_Pre: SoldProductsMapping(json_All_Courses, json_All_Bills),
      Users_Pre: Users_Spended_Mapping(json_All_Users, json_All_Bills),
      Curses:json_All_Courses,
      Users:json_All_Users
    },
  };
};