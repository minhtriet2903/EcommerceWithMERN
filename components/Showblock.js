import styled from "styled-components";

const Contaner = styled.div`
  height: 90%;
  width: 90%;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  color: #ffffff;
  box-shadow: 5px 4px 6px 3px rgba(36, 34, 34, 0.5);
  & h5 {
    font-size: 90%;
    font-weight: 500;
  }
  & h4 {
    font-size: 120%;
    font-weight: 600;
  }
  & h6 {
    font-size: 90%;
    font-weight: 500;
    margin-top: 40px;
    span {
      font-size: 120%;
      font-weight: 600;
    }
  }
`;

const Block = styled.div`
  height: 150px;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function Showblock({ data, color }) {
  return (
    <>
      <Block>
        <Contaner style={{ backgroundColor: setcolor(color) }}>
          <h5>{data.time}</h5>
          <h4>{prettynumber(data.value)}</h4>
          <h6>
            Tổng số lượng bán được: <span>{data.count}</span>
          </h6>
        </Contaner>
      </Block>
    </>
  );
}
function setcolor(color) {
  if (color == "red") {
    return "#e00c3a";
  } else if (color == "green") {
    return "#098f50";
  } else if (color == "blue") {
    return "#14a3bd";
  } else if (color == "yellow") {
    return "#c9cc28";
  } else {
    return "#969696";
  }
}
function prettynumber(num) {
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
