import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styled from "styled-components";
import { Login } from './Login';
import { Register } from './Register';
import cookieCutter from 'cookie-cutter';
import axios from "axios";
// var a=function(){
//     console.log('hello');
// }
// var Tags={ 
//     "NamKid":{
//         "All":Array(100),
//         "count":0
//     },
//     "NuKid":{
//         "All":Array(100),
//         "count":0
//     },
//     "NamAdult":{
//         "All":Array(100),
//         "count":0
//     },
//     "NuAdult":{
//         "All":Array(100),
//         "count":0
//     }
// };
// function Tagsfilter(tag,filt){
//     if(tag[0]==filt){
//         var tmp=Tags[filt];
//         for (let i = 0; i < tmp["count"]; i++) {
//             if(tmp["All"][i]==tag[1]){
//                 return "null";
//             }
//         }
//         tmp["All"][tmp["count"]]=tag[1];
//         tmp["count"]=tmp["count"]+1;
//         console.log('a'+filt);
//         return 'nam';
//     }
//     return "NULL";
// }
const Navbarmenu=styled.div`
display: flex;
    height: 60px;
    width: 100%;
    margin-top: 0px;
    background-color: #012a42;
    color:white;
    text-align: center;
    font-family: roboto ;
    font-weight: 100;
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.4);
    opacity: 100%;
    position: sticky;
    top:0px;
`;
const Tabemenu=styled.table`
    width: 100%;
`;
const Leftside=styled.td`
    text-align: left;
    display: flex;
    width: 45%;
    margin-left:5%;
    transform: translate(0px, -10px);

`;
const Rightside=styled.td`
    text-align: right;
    width: 50%;
`;
const Dropdownlist=styled.a`
    margin-right:-50px;
    padding: 1.5rem;
    text-align: left;
    color:white;
    text-decoration: none;
    border: 0px solid #eaeaea;
    border-radius: 10px;
    height: 40px;
    transition: color 0.15s ease, border-color 0.15s ease;
    width: 240px;
    display: inline;
    background-color: transparent;
    transition: transform  0.2s ease-in-out, opacity 0.3s ease-in-out;
    &:hover .Optionslist {
        background-color: transparent;
        opacity: 100%;
        pointer-events: auto;
        transform:translate(0px,13px);
    }
    &:hover {
        font-weight: 200%;
        color: black;
        transition: all 0.25s ease-out;
    }
`;
const Optionslist=styled.div`
    opacity: 0%;
    position: relative;
    width: 250px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    pointer-events: none;
    margin-left: -27px; 
    transition: transform 0.5s ease-in-out, opacity 0.3s ease-in-out;
    transform: translate(0px,-30px);
    border-radius:4px;
    border:1px solid grey;
    position: sticky;
    box-shadow:0px 5px 5px 4px rgb(175, 174, 174);
    &:hover {
        pointer-events: auto;
    }
`;
const Option=styled.a`
    display: block;
    background-color: #ffffff;
    color: black;
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-decoration: none;
    padding: 10px 20px;
    position: sticky;
    &:hover {
        color: black;
        border-left: 3px solid rgb(4, 50, 56);
        background-color: #cfe9fa;
    }
    
`;
const Right=styled.div`
    margin-right: 0%;
`;
const Menubutton=styled.a`
    margin: 0;
    padding: 1rem;
    color:white;
    text-decoration: none;
    transform: translate(0,10px);
    border: 0px solid #ffffff;
    border-radius: 20px;
    height: 20px;
    margin-top: -20px;
    transition: color 0.15s ease, border-color 0.15s ease;
    width: 100px;
    display: flex;
    align-items: flex-start;
    float: right;
    cursor: pointer;
    font-size:90%;
    &:hover {
        color: #c4c6c7;
        font-weight: 200%;
        transition: all 0.2s ease-out;
    }
`;
const Searchbar=styled.input`
    height:100%;
    width:100px;
    border-radius:20px;
    border:0px groove black;
    float: right;
    padding-left: 24px;
    padding-right: px;
    position: static;
`;
const Searchbutton=styled.img`
    height:80%;
    width:20px;
    transform: translate(25px,4px);
    float: right;
    cursor: pointer;
`;
const Search=styled.div`
    height:25px;
    width:130px;
    float: right;
    transform:translate(-10px,0px);
`;
// const getusername = (Id) => {
//     const [re,setre]=useState('Đăng nhập');
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();
//     axios
//       .get(
//         "http://localhost:5035/users/"+Id,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       )
//       .then(function (response) {
//         setre(response.data.name);
//         cancelToken: source.token;
//       })
//       .catch(function (error) {
//         console.log(error);
//       }); 
//     return re;
//   };


const Mainmenu = ({Acc}) =>{
    const [ShowLogin,setShowLogin]=useState(false);
    const [ShowRegister,setShowRegister]=useState(false);
    const [Loginstate,setLoginstate]=useState(ACC(Acc,ShowLogin,setShowLogin,ShowRegister,setShowRegister,Logout));
    function ACC(Acc,ShowLogin,setShowLogin,ShowRegister,setShowRegister,Logout){
        if(Acc==null){
            return <><Menubutton onClick={()=>setShowLogin(true)}>Đăng nhập</Menubutton><Menubutton onClick={()=>setShowRegister(true)}>Đăng ký</Menubutton></>;
        }
        return <><Menubutton onClick={()=>Logout()}>Đăng xuất</Menubutton><Menubutton href="/UserPage">{Acc}</Menubutton></>;
    }
    function Logout() {
        cookieCutter.set('Acc', '');
        Acc=null;
        setLoginstate(ACC(Acc,ShowLogin,setShowLogin,ShowRegister,setShowRegister));
    }
    return (
        <>
  <Navbarmenu>
            <Register  show={ShowRegister} setShow={setShowRegister} setLoginstate={[setLoginstate,Acc,ShowLogin,setShowLogin,ShowRegister,setShowRegister,Logout,ACC]}/>
            <Login show={ShowLogin} setShow={setShowLogin} setShowRegister={setShowRegister} setLoginstate={[setLoginstate,Acc,ShowLogin,setShowLogin,ShowRegister,setShowRegister,Logout,ACC]}/>
            <Tabemenu>
                <tr>
                    <Leftside>
                        <Nav>
                            <Dropdownlist>
                                <h5>Thời trang nam</h5>
                                <Optionslist className='Optionslist'>
                                    <Option style={{borderBottom:"1px solid", borderColor:"lightGray"}} className='Option'>Thời trang nam</Option>
                                    <Option className='Option'>Áo thun</Option>
                                    <Option className='Option'>Áo sơ mi</Option>
                                    <Option className='Option'>Áo khoác</Option>
                                    <Option className='Option'>Vet</Option>
                                    <Option className='Option'>Áo ba lỗ</Option>
                                    <Option className='Option'>Quần gin</Option>
                                    <Option className='Option'>Quần tây</Option>
                                    <Option className='Option'>Quần đùi</Option>
                                    <Option className='Option'>Quần thun</Option>
                                    <Option className='Option'>Giày bata</Option>
                                    <Option className='Option'>Giày thể thao</Option>
                                    <Option className='Option'>Giày quai hậu</Option>
                                    
                                </Optionslist>
                            </Dropdownlist>
                        </Nav>
                        <Nav>
                            <Dropdownlist>
                                <h5>Thời trang nữ</h5>
                                <Optionslist className='Optionslist'>
                                    <Option style={{borderBottom:"1px solid", borderColor:"lightGray"}} className='Option'>Thời trang nữ</Option>
                                    <Option className='Option'>Áo thun</Option>
                                    <Option className='Option'>Áo sơ mi</Option>
                                    <Option className='Option'>Áo khoác</Option>
                                    <Option className='Option'>Áo hai đây</Option>
                                    <Option className='Option'>Quần gin</Option>
                                    <Option className='Option'>Quần tây</Option>
                                    <Option className='Option'>Quần đùi</Option>
                                    <Option className='Option'>Quần thun</Option>
                                    <Option className='Option'>Váy ngắn</Option>
                                    <Option className='Option'>Váy dài</Option>
                                    <Option className='Option'>Đằm dạ hội</Option>
                                    <Option className='Option'>Giày bata</Option>
                                    <Option className='Option'>Giày thể thao</Option>
                                    <Option className='Option'>Giày cao gót</Option>
                                </Optionslist>
                            </Dropdownlist>
                        </Nav>
                        <Nav>
                            <Dropdownlist>
                                <h5>Thời trang trẻ em</h5>
                                <Optionslist className='Optionslist'>
                                    <Option style={{borderBottom:"1px solid", borderColor:"lightGray"}} className='Option'>Thời trang trẻ em</Option>
                                    <Option className='Option'>Áo thun</Option>
                                    <Option className='Option'>Áo sơ mi</Option>
                                    <Option className='Option'>Áo khoác</Option>
                                    <Option className='Option'>Vet</Option>
                                    <Option className='Option'>Quần gin</Option>
                                    <Option className='Option'>Quần tây</Option>
                                    <Option className='Option'>Quần đùi</Option>
                                    <Option className='Option'>Quần thun</Option>
                                    <Option className='Option'>Quần thun</Option>
                                    <Option className='Option'>Giày bata</Option>
                                    <Option className='Option'>Giày thể thao</Option>
                                    <Option className='Option'>Giày quai hậu</Option>
                                </Optionslist>
                            </Dropdownlist>
                        </Nav>
                    </Leftside >
                    <Rightside>
                        <Right>
                            <Search>
                                <Searchbar  placeholder="Tìm kiếm" className='Searchbar'/>
                                <Searchbutton src='imgs/search.png' className='Searchbutton'/>
                            </Search>
                            {Loginstate}
                            <Menubutton>Quản lý</Menubutton>
                            <Menubutton>Giỏ hàng</Menubutton>
                        </Right>
                    </Rightside>
                </tr>
            </Tabemenu>
        </Navbarmenu>
        </>
    )
}
export default Mainmenu