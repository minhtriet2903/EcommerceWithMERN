import styled from "styled-components";

const Display = styled.footer `
    height:500px;
    width:100%;
    background-color:rgb(155, 212, 235);
    text-align:center;
    padding-top: 100px;
`;
const Menu = styled.div `
    height:80px;
    width:70%;
    border-top:1px solid white;
    border-bottom:1px solid white;
    margin-left: 15%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color:transperant;
`;
const TableOptions=styled.table`
    height:100%;
    width:60%;
    background-color:transperant;
`;
var rowcount=2;
var cellcount=4;
const RowOption= styled.tr`
    width:100%;
`;
const CellOption= styled.td`
    height:100%;
    font-size:25px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover{
        color:rgb(20, 20, 20);
        font-weight: bold;
        font-size:35px;
    }
`;
const Medias= styled.div`
    height:130px;
    width:30%;
    margin-left: 35%;
    justify-content: center;
    background-color:transperant;
    margin-top: 15px;
`;
const Head=styled.header`
    font-size:35px;
    height:40%;
`;
const Items= styled.div`
    height:60%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color:transperant;
    width:100%;
`;
const ItemsCellOption= styled.td`
    height:40px;
    font-size:30px;
    width:40px;
`;
const Item=styled.img`
    width:40px;
    height:40px;
    cursor: pointer;
    background-color:transperant;
`
const Footer=()=>(
    <Display>
        <Menu>
            <TableOptions>
                <RowOption>
                    <CellOption>
                        Home
                    </CellOption>
                    <CellOption>
                        About
                    </CellOption>
                    <CellOption>
                        Shop
                    </CellOption>
                </RowOption>
            </TableOptions>
        </Menu>
        <Medias>
         
            <Items>
            <TableOptions>
                <RowOption>
                    <ItemsCellOption>
                        <Item src="imgs/iconfb.jpg"/>
                    </ItemsCellOption>
                    <ItemsCellOption>
                        <Item src="imgs/iconfb.jpg"/>
                    </ItemsCellOption>
                    <ItemsCellOption>
                        <Item src="imgs/iconzalo.jpg"/>
                    </ItemsCellOption>
                </RowOption>
            </TableOptions>
            </Items>
        </Medias>
    </Display>
)
export default Footer