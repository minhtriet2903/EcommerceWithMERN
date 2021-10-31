import styled from "styled-components";

const Contaner = styled.div`
  height: 90%;
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
`;
const Block = styled.div`
  height: 50%;
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
  height: 200px;
  overflow-y: scroll;
  &:-webkit-scrollbar {
    display: none;
  }
`;
export default function Table({ data }) {
  return (
    <>
      <Block>
        <Contaner>
          <h4>{data.name}</h4>
          <Rowheader>
            {data.header.map((item) => (
              <Cell style={{ width: 100 / data.header.length + "%" }}>
                {item}
              </Cell>
            ))}
          </Rowheader>
          <Rows>
            {data.rows.map((row) => (
              <Row>
                {row.map((item) => (
                  <Cell style={{ width: 100 / data.header.length + "%" }}>
                    {item}
                  </Cell>
                ))}
              </Row>
            ))}
          </Rows>
        </Contaner>
      </Block>
    </>
  );
}
