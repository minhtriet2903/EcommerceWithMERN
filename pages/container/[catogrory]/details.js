import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Detail from "../../products/detail/detail";
import axios from "axios";
import * as Config from "../../constant/config";
import {actFetchDetailProduct,actAddDetailToCart } from '../../actions';

const DetailCon = (props) => {
    const router = useRouter();
    const {detail} = props;
  
    const {color} = router.query;
    const [product,setProduct] = useState();
         useEffect(() => {
         
        if (router.asPath !== router.route) {
            
            const fetchh = async () => {
                const res = await fetch(Config.API_URL +`/${router.query.id}`);
                const data= await res.json();     
              props.actFetchDetailProduct(data);          
            };
           fetchh();
        }

   
      }, [router]);  
     
          useEffect(() =>{
        var request = {
            params: {
               sex:detail.Sex,
               materials:detail.materials,
                /* materials: detail.materials ? detail.materials[0] : null, */
              age:detail.age,
              id:detail._id
                            
            }
        }     
        const fetchh = async () => {
            const data = await axios.get(Config.API_URL_RELATED, request ? request : {});
            setProduct(data)                  
        };
        fetchh();
      },[detail]) ;
       

    const {actAddDetailToCart} = props;
    return (
        <>
            <Detail relate={product} detail={detail} actAddDetailToCart={actAddDetailToCart} chooseColor={color}/> 
        </>
    )
}
 const mapStateToProps = state => {
    return {  
        detail: state.detail//get product from store in reducer and push in props
    }
}
 
const mapDispatchToProps = (dispatch,props) =>{   
    return {  
        actFetchDetailProduct:(detail) =>{ 
            dispatch(actFetchDetailProduct(detail)); //add cart with action "actAddtoCart" through dispatch
        },
        actAddDetailToCart:(product,quantity) =>{  
             dispatch(actAddDetailToCart(product,quantity)); //add cart with action "actAddtoCart" through dispatch
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailCon);
