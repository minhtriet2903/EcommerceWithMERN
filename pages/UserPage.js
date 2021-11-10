import styled from "styled-components";
import Frame from "../components/Frame";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/dist/client/router";
import cookies from 'next-cookies'
import cookieCutter from 'cookie-cutter';
import { useRef } from 'react';
import Info from "./profile/info";
import ChangePass from "./profile/changePass";
import Bill from "./profile";
/* import {ChangePassword} from '../components/ChangePassword';
import {UpdateAddress} from '../components/UpdateAddress'; */


export default  function UserPage({data,dataBill}) {

    const router = useRouter();
 
    const [statePage,setStagePage] = useState(true);
    const [pageBill,setPageBill] = useState(0);
   

    function GetDate(fulltime) {
        const dateTime = new Date(fulltime);

        return dateTime.toLocaleDateString();
    }

    const handleDrop = () => {

        const content = document.getElementById('change_pass');

        content.classList.toggle('active_drop')


    }
    const handleInfo = (e) =>{
        const tar = document.querySelectorAll('.index');
        const target = document.querySelector('.title_his_bill')
        target.classList.remove('default_color')
        const i =Number(e.target.attributes.num.value);
        tar.forEach(l => l.classList.remove('default_color'))
        tar[i-1].classList.add('default_color')
        if(i===1)
            setStagePage(true)
        else
        setStagePage(false)
        setPageBill(0);
    }
    const handleBill = (e) =>{
        const tar = document.querySelectorAll('.index');
        tar.forEach(l => l.classList.remove('default_color'))
        const target = document.querySelector('.title_his_bill')
        target.classList.add('default_color')
        console.log(target)
        setPageBill(1)
    }
    return (
        <>
              <div className="profile">
                <div className="profile_body">
                    <div className="profile_option">
                        <div className="name_img">
                            <div className="profile_img">
                                <img src="https://ln.hako.re/img/noava.png" alt="https://ln.hako.re/img/noava.png" />
                            </div>
                            <div className="profile_name">
                                <span className="profile_name_ti">{data.name}</span>
                                <div className="preview_pro">
                                    <i className='bx bx-pencil' ></i>
                                    <span>Sửa Hồ Sơ</span>
                                </div>
                            </div>
                        </div>
                        <div className="info_detail">
                            <div className="pro_account" id="pro_account" >
                                <div onClick={handleDrop}>
                                    <i className='bx bx-user' ></i>
                                    <span>Tài khoản của tôi</span>
                                </div>

                                <ul className="change_pass active_drop" id="change_pass">
                                    <li className="index default_color" num="1" onClick={handleInfo}>Hồ sơ</li>
                                    <li className="index"num="2"  onClick={handleInfo}>Đổi mật khẩu</li>
                                </ul>
                            </div>

                            <div className="info_bill" num="3" onClick={handleBill}>
                                <i  num="3" className='bx bx-shopping-bag'></i>
                                <span className="title_his_bill"  num="3">Lịch sử mua hàng</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile_content">
                        {
                           pageBill === 1 ?  <Bill  bill={dataBill}/>
                            : statePage ?  <Info data={data}/> : <ChangePass data={data}/>
                        }
                       
                    </div>
                </div>
            </div>  
           
        </>
    );
}
 UserPage.getInitialProps = async (ctx) => {
    const { Acc } = cookies(ctx);
 
        const res21 = await fetch("http://localhost:5035/users/" + Acc);
        var json21 = await res21.json();

        const json = await fetch(`http://localhost:5035/users/${Acc}/customer/bills`);
        const Billdata = await json.json();
     


        return { data: json21,dataBill:Billdata };
    

}; 