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
    <div className="footer_body">
    <div className="footer_left_area_item">
        <div className="footer_big_font">LIÊN HỆ</div>
        <div className="footer_inline_contact">
            <span>Điện thoại: 0356374034</span>
        </div>
        <div className="footer_inline_contact">
            <span>Địa chỉ:  Số 06, Trần Văn Ơn, Phú Hòa, Thủ Dầu Một, Bình Dương</span>
        </div>
        <div className="footer_inline_contact">
            <span>Email: godoflordofbugs@gmail.com</span>
        </div>
    </div>
    <div className="footer_left_area_item">
        <div className="footer_big_font">THEO DÕI CHÚNG TÔI TẠI</div>
        <div className="footer_inline">
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Facebook</a>
            <a href="#">|</a>
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Instagram</a>
            <a href="#">|</a>
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Twitter</a>
        </div>

    </div>
    <div className="footer_right_area">
        <div className="footer_logo" onClick={() => { router.push("/") }}>
            <span className="name_logo">fn</span>
            <span className="name_logo_color">bg</span>
        </div>
        <p className="footer_vote">
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero facere reprehenderit tempore consequuntur officia nam nobis hic voluptates facilis voluptatibus?</span>
        </p>
    </div>
</div>
)
export default Footer