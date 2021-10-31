import styled from "styled-components";
const Button = styled.button`
  border-radius: 20px;
  background-color: lightskyblue;
  color: lightcoral;
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
function Button1({ value }) {
  return <Button>{value}</Button>;
}

export default Button1;
