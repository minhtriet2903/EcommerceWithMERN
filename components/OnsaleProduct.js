import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/dist/client/router';
import Slider from 'react-slick';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

// function setimgs(tab){
//     var re="imgs/img"+tab+".jpg";
//     return re;
// }
// function setnames(tab){
//     var re="Name "+tab;
//     return re;
// }
// function setPrice(tab){
//     var k=<span className={styles.strikethrough}>${tab*10+5}</span>;
//     var re=<span>{k}{'  '}${tab*10}</span>
//     return re;
// }
// function jjj(item){
//     if((item.Tags)[0]=='nu'){
//         return <li>
//         <a className={styles.product}>
//             <img className={styles.pro} src={item.Image}/>
//             <a className={styles.produtName}>{item.Name}</a>
//             <h4 >
//                 {item.Price}
//             </h4>
//         </a>
//         </li>  ;
//     }else{
//         return null;
//     }
// }

export default function OnsaleProduct({data}){
 
    const router = useRouter();
    const path = `/container/${router.query.catogrory}`;

    const settings = {
      
        infinite: data.length >= 4 ? true : false,
        speed: 500,
        slidesToShow:  data.length >= 4 ? 4 : data.length,
        slidesToScroll: 1,
        responsive: [
            {
                
                breakpoint: 860,
                settings: {
                    infinite:  true ,
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            },
             {

                breakpoint: 768,
                settings: {
                    infinite: true,
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }, 
            {
                breakpoint: 580,
                settings: {
                    infinite: true ,
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
       
    };

  
    const ShowColor = (color) => {

        return {
            backgroundColor: color,
            height: 20,
            width: 20,
            borderRadius: 15,
            margin: 0,
            padding: 5,
            cursor: 'pointer',
            display: 'inline-block',

        }
    }
    return(
       <>
          <Slider {...settings}>
             
             {
                data.map((product,index) =>{
                    return  <div className="product-content-body" key={index}>
                    <div className="product-content">
                        <div className="product-img-content">
                            <img src={product.Image} alt={product.Image} />
        
                            <div className="product-detail-link">
                                <div className="product-detail-link-hover">
        
                                    <Link
        
                                href={`${path}/details?id=${product._id}`}
                                    ><a>VIEW</a></Link>
        
                                </div>
                            </div>
                        </div>
                        <div className="product-name_price-content">
                            <Link
                               href={`${path}/details?id=${product._id}`}><a><h5>{product.Name}</h5></a></Link>
                            <div className="product_price">
                                <p className="text-dark">
                                    <NumberFormat value={product.Price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                </p>
                                <p className="text-discount">
                                    <NumberFormat value={product.Discount !== 0 ? product.Discount : ''} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                </p>
                            </div>
                        </div>
                        <div className="section_item_color">
        
                            <label key={index} className="showColor_body color_item hove">
                                <span style={ShowColor(product.colors)}
                                    className="showColor"
                                    id="Color"
                                    onClick={() => {
                                        router.push({
                                            pathname: `${path}/details`,
                                            query: {
                                                id: product._id,
                                                color: product.colors
                                            },
        
                                        })
        
                                    }}
        
        
                                ></span>
                            </label>
        
        
                        </div>
                  
                    </div>
                
                </div>
                })
            } 
              
        </Slider>
       </>
            
       
    )
}


