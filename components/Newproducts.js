import Newproduct from './NewProduct'
import { useState } from 'react';
import styles from '../styles/Home.module.css'




const Newproducts=({data})=>{
    function k(tab){
        var a=styles.buttontrasperant;
        var b=styles.buttontrasperant;
        var c=styles.buttontrasperant;
        var d=styles.buttontrasperant;
        var e=0;
        if(tab==1){
            a=styles.buttonskyblue;
        }else if(tab==2){
            e=1;
            b=styles.buttonskyblue;
        }else if(tab==3){
            e=2;
            c=styles.buttonskyblue;
        }
        return [a,b,c,e];
    }
    const [tab,settab] = useState(k(1));
    function mainn({data}){
     
    
        return (
            <div className={styles.center}>
                <h1>Mới nhất</h1>
                <div className={styles.centert}>
                    <ul className={styles.tabmenu}>
                        <li><button className={tab[0]} tabIndex="1" onClick={()=>settab(k(1))}><h3>Quần áo Nam</h3></button></li>
                        <li><button className={tab[1]} tabIndex="2" onClick={()=>settab(k(2))}><h3>Quần áo Nữ</h3></button></li>
                        <li><button className={tab[2]} tabIndex="3" onClick={()=>settab(k(3))}><h3>Quần áo trẻ em</h3></button></li>
                    </ul>
                </div>
                <Newproduct data={data[tab[3]]}/>
            </div>
        )
        
    }
    return <div className="new_product">
        {mainn({data})}
    </div>
}
export default Newproducts