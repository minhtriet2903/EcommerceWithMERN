import styled from "styled-components";
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
function OutLineButton1({ value }) {
  return <OutLineButton>{value}</OutLineButton>;
}
export default OutLineButton1;
