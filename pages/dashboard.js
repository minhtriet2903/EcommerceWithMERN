import Showblock from "../components/Showblock";
import styled from "styled-components";
import Table from "../components/Table";

const Buttonscontaner = styled.div`
  display: flex;
  width: 100%;
`;
const Devide = styled.table`
  width: 100%;
  height: 700px;
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
export default function Statictical({ data }) {
  const total = (da) => {
    var re = 0;
    for (var i = 0; i < da.length; i++) {
      re += da[i].TotalPrice;
    }
    return re;
  };
  const Count = (da) => {
    var re = 0;
    for (var i = 0; i < da.length; i++) {
      re += da[i].Products.length;
    }
    return re;
  };
  return (
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
      <Devide>
        <tr>
          <td>
            <Table
              data={{
                name: "Sản phẩm",
                header: ["Tên sản phẩm", "Giá đơn vị", "Số lượng bán", "Tổng"],
                rows: data.Pros_Pre,
              }}
            />
          </td>
          <td>
            <Table
              data={{
                name: "Khách hàng",
                header: ["Tên khách hàng", "Số hàng đã mua", "Tổng tiêu"],
                rows: data.Users_Pre,
              }}
            />
          </td>
        </tr>
      </Devide>
    </Mother>
  );
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
          re[bills[i].Products[j].product.id][2]++;
          re[bills[i].Products[j].product.id][3] +=
            re[bills[i].Products[j].product.id][1];
        }
      }
      if (re[bills[i].Products[j].courseId] == undefined) {
        continue;
      }
      re[bills[i].Products[j].courseId][2]++;
      re[bills[i].Products[j].courseId][3] +=
        re[bills[i].Products[j].courseId][1];
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
  for (var i = 0; i < bills.length; i++) {
    if (re[bills[i].userId] == undefined) {
      continue;
    }
    re[bills[i].userId][1]++;
    re[bills[i].userId][2] += bills[i].TotalPrice;
  }

  var returnn = [];
  for (var i = 0; i < Users.tutorials.length; i++) {
    returnn.push(re[Users.tutorials[i]._id]);
  }
  return returnn;
}
Statictical.getInitialProps = async (ctx) => {
  var This_month_Bills_Start_date = new Date();
  var Now = new Date().toLocaleDateString();
  This_month_Bills_Start_date.setDate(1);
  const resThismonthBills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
      This_month_Bills_Start_date.toLocaleDateString() +
      "&endDate=" +
      Now
  );
  const jsonThismonthBills = await resThismonthBills.json();

  var Last_month_Bills_Start_date = new Date();
  Last_month_Bills_Start_date.setDate(1);
  Last_month_Bills_Start_date.setMonth(
    Last_month_Bills_Start_date.getMonth() - 1
  );
  var Last_month_Bills_End_date = new Date(
    Last_month_Bills_Start_date.toLocaleDateString()
  );
  Last_month_Bills_End_date.setMonth(Last_month_Bills_End_date.getMonth() + 1);
  Last_month_Bills_End_date.setDate(0);
  const res_Last_month_Bills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
      Last_month_Bills_Start_date.toLocaleDateString() +
      "&endDate=" +
      Last_month_Bills_End_date.toLocaleDateString()
  );
  const json_Last_month_Bills = await res_Last_month_Bills.json();
  //console.log("http://localhost:5035/bills/dateRange?startDate="+Last_month_Bills_Start_date.toLocaleDateString()+"&endDate="+Last_month_Bills_End_date.toLocaleDateString());

  var Today = new Date();
  const res_Today_Bills = await fetch(
    "http://localhost:5035/bills/dateRange?startDate=" +
      Today.toLocaleDateString() +
      "&endDate=" +
      Today
  );
  const json_Today_Bills = await res_Today_Bills.json();
  //console.log("http://localhost:5035/bills/dateRange?startDate="+Today.toLocaleDateString()+"&endDate="+Today.toLocaleDateString() );

  const res_All_Bills = await fetch("http://localhost:5035/bills");
  const json_All_Bills = await res_All_Bills.json();
  //console.log(json_Total_Bills);

  const res_All_Courses = await fetch("http://localhost:5035/courses");
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
    },
  };
};
