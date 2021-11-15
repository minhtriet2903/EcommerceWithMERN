import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Contaner = styled.div`
  height: 100%;
  width: 95%;
  border-radius: 10px;
  text-align: center;
  color: #000;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 6px 3px rgba(36, 34, 34, 0.5);
  padding: 0.75rem 1rem;
  & h4 {
    text-align: left;
    height: 20px;
  }
  &:hover .Rows{
    height:350px;
    transition: all 0.5s ease-in-out;
    transition-delay: 0.5s;
  }
`;
const Block = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Rowheader = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.7);
  display: flex;
  font-weight: 700;
`;
const Row = styled.div`
  height: 40px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;
const Cell = styled.div`
  height: 100%;
  margin-left: 3px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Rows = styled.div`
  height: 300px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius:3px;
  overflow-y: scroll;
  &:-webkit-scrollbar {
    display: none;
  }
`;
function prettynumber(num) {
  for(let i = 0; i<num.length; i++) {
    if(num[i]<'0'||num[i]>'9'){
      return num;
    }
  }
  var numm = num.toString();
  var re = "";
  for (var i = 0; i < numm.length; i++) {
    re += numm[i].toString();
    if ((numm.length - i) % 3 == 1 && i != numm.length - 1) {
      re += ",";
    }
  }
  return re;
}
export default function Table({ data }) {
  function calTotal(dataa){
    var total=0;
    var counter=0;
    for(let i=0;i<dataa.rows.length;i++){
      total+=dataa.rows[i][dataa.rows[i].length-1];
      counter+=dataa.rows[i][dataa.rows[i].length-2];
    }
    var re=[];
    re.push("Tổng");
    for(let i=2;i<dataa.header.length-1;i++){
        re.push("");
    }
    re.push(counter);
    re.push(total);
    return re;
  }
  const [rowTotal, setRowTotal]= useState(calTotal(data));
  return (
    <>
      <Block>
        <Contaner>
          <h4>{data.name}</h4>
          <Rowheader>
            {data.header.map((item,index) => (
              <Cell key={index} style={{ width: 100 / data.header.length + "%" }}>
                {item}
              </Cell>
            ))}
          </Rowheader>
          <Rows className="Rows">
            {data.rows.map((row,index) => (
              <Row key={index}>
                {row.map((item,indexx) => (
                  <Cell key={indexx} style={{ width: 100 / data.header.length + "%" }}>
                    {prettynumber(item)}
                  </Cell>
                ))}
              </Row>
            ))}
          </Rows>
          <Row >
            {(calTotal(data)).map((item,indexx) => (
              <Cell key={indexx} style={{ width: 100 / data.header.length + "%" }}>
                {prettynumber(item)}
              </Cell>
            ))}
          </Row>
        </Contaner>
      </Block>
    </>
  );
}