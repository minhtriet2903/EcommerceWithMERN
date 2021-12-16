import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Router from 'next/router';
import { connect } from "react-redux";
import { Slider } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import axios from "axios";
import { actFetchProduct } from "../actions";
import * as Config from "../constant/config";
const Option = (props) => {
  const router = useRouter();
  const { AmountColor } = props;
  const { AmountSize } = props;
  const path = router.asPath.split("?").filter(x => x);
  const newPath = path.slice(0, 1).toString();
  const clickColor = useRef([])
  const [pricerange, setPriceRange] = useState([router.query.lowPrice ? router.query.lowPrice : 0, router.query.upPrice ? router.query.upPrice : 2000000]);
  const [chooseSize, setChooseSize] = useState(router.query.size? router.query.size : "");
  const [chooseColor, setChooseColor] = useState(router.query.color ? router.query.color : "");
  
  const updateRange = (eve, value) => {
    setPriceRange(value);
  }
  const hanldeSize = (size, index) => {
    setChooseSize(size)
  }
 
  const hanldeColor = (color, index) => {
    clickColor.current[index].click();
    const choose = document.querySelectorAll('.showColor_body');
    // console.log(clickColor.current[index].value)
    // choose[index].getAttribute("value") === 
    choose.forEach(l => l.classList.remove('activeColor'));
    if(clickColor.current[index].checked){
      choose[index].classList.add('activeColor');
      setChooseColor(color)
    }else{
      setChooseColor(null)
      choose.forEach(l => l.classList.remove('activeColor'));
    }
    // choose.forEach(function(ch){
    //   console.log(ch.getAttribute("value"))
    // })
    // choose.forEach(l => l.classList.remove('activeColor')); 
    // choose[index].classList.toggle('activeColor');
  }
  useEffect(() =>{
    var check = document.querySelectorAll(".pro_size");
    check.forEach(function (checkbox) {
      // const i =(checkbox.target.attributes.size.value); 
        if (checkbox.value === chooseSize) {
          checkbox.checked = true; 
        }           
    });
    var checkcolor = document.querySelectorAll(".sh");
    checkcolor.forEach(function (checkbox) {
      if (checkbox.value === chooseColor) {
          checkbox.checked = true; 
      }   
    });
   
  })
  const Changesize = (ev) => {
    var k = 0;
    
    var check = document.querySelectorAll(".pro_size");
    check.forEach(function (checkbox) {
      if (checkbox.checked && checkbox !== ev.target) {
        checkbox.checked = false;
      }
      else if (checkbox.checked) {
        k = 1;
      }
    });
    if (k == 0) {
      setChooseSize(null);
    }
  }
  const ChangeColor = (ev) => {
    var k = 0;
    var check = document.querySelectorAll(".sh");
   
    check.forEach(function (checkbox) {
     
      if (checkbox.checked && checkbox !== ev.target) 
      { 
      
        checkbox.checked = false; 
      }
      else if (checkbox.checked) {
        k = 1;
      }
    });
    if (k == 0) {
      setChooseColor(null);
      
      // const choose = document.querySelectorAll('.showColor_body');
      // choose.forEach(l => l.classList.remove('activeColor'));
    }
  }
  var EleSize = AmountSize ? AmountSize.map((size, index) => {
    return <li key={index}>
      <label> <input type="checkbox" value={size.size}  name="size" className="pro_size" onChange={Changesize} onClick={() => { hanldeSize(size.size, index) }} />{size.size}</label>
      <span className="option_color_name">({size.amountSize})</span>
    </li>
  }) : '';

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
  var showColor = AmountColor ? AmountColor.map((color, index) => {
    return <div key={index} className="option_body_color">
      <input type="checkbox" value={color.colors} className="hidden_color_chec sh"  onChange={ChangeColor} ref={el => clickColor.current[index] = el} />
      <label value={color.colors} color={color.colors}  className={router.query.color === color.colors ? "showColor_body color_item hove activeColor" : "showColor_body color_item hove"} >
        <span style={ShowColor(color.colors)}
          className="showColor"
          id="Color"
          onClick={() => { hanldeColor(color.colors, index) }}
        ></span>
      </label>

      <span className="option_color_name">{color.colors}</span>
      <span className="option_color_name">({color.amountcolor})</span>
    </div>
  }) : '';
  const handlePostCM = (e) => {
    router.push({
      pathname: newPath,
      query: {
        age:router.query.age,
        result: router.query.result ? router.query.result : null,
        color:  chooseColor ,
        size: chooseSize ,
        lowPrice: pricerange[0] ,
        upPrice: pricerange[1] 
      }
    });
    // if (chooseColor && chooseSize) {
    //   Router.push({
    //     pathname: newPath,
    //     query: {
    //       age:router.query.age,
    //       result: router.query.result ? router.query.result : null,
    //       color: chooseColor,
    //       size: chooseSize,
    //       lowPrice: pricerange[0],
    //       upPrice: pricerange[1]
    //     }
    //   });
    // }
    // else if (chooseColor) {
    //   Router.push({
    //     pathname: newPath,
    //     query: {
    //       age:router.query.age,
    //       result: router.query.result ? router.query.result : null,
    //       color: chooseColor,
    //       lowPrice: pricerange[0],
    //       upPrice: pricerange[1]
    //     }
    //   });
    // } else if (chooseSize) {
    //   Router.push({
    //     pathname: newPath,
    //     query: {
    //       age:router.query.age,
    //       result: router.query.result ? router.query.result : null,
    //       size: chooseSize,
    //       lowPrice: pricerange[0],
    //       upPrice: pricerange[1]
    //     }
    //   });
    // } else {
    //   Router.push({
    //     pathname: newPath,
    //     query: {
    //       age:router.query.age,
    //       result: router.query.result ? router.query.result : null,
    //       lowPrice: pricerange[0],
    //       upPrice: pricerange[1]
    //     }
    //   });
    // }
  }
  const handleClear = () =>{
    const choose = document.querySelectorAll('.showColor_body');
    choose.forEach(l => l.classList.remove('activeColor'));
   
    var check = document.querySelectorAll(".pro_size");
    check.forEach(function (checkbox) {    
        checkbox.checked = false;     
    });
    Router.push(
      {
        pathname: newPath,
        query:{
          age:router.query.age,
          result: router.query.result ? router.query.result : null,
        }
      }
        
      )
  }
  const handleDrop = (e) =>{
    const i =Number(e.target.attributes.num.value);
    const head = document.querySelectorAll('.content-tittle')
      head[i].classList.toggle('active_arrow')
      const title = document.querySelectorAll('.drop_down_op')
      title[i].classList.toggle('delete_drop');
  }
  return (
    <>
      <div className="body-nav" id="body-nav">
        <div className="left-content">

          <div className="left-content-body-range">

            <h4 className="content-tittle active_arrow" num="0" onClick={handleDrop}>Price Range</h4>
            <div className="drop_down_op delete_drop">
              <span className="price-min kk"><NumberFormat value={pricerange[0]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
              -
              <span className="price-max kk"><NumberFormat value={pricerange[1]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
              <div className="line_price">
                <Slider
                  className="MenuItem"
                  value={pricerange}
                  max={10000000}
                  min={0}
                  onChange={updateRange}
                >
                </Slider>
              </div>
            </div>
          </div>
          <div className="left-content-body-size">
            <h4 className="content-tittle active_arrow" num="1" onClick={handleDrop}>Sizes</h4>
            <ul className="size-body drop_down_op delete_drop">
              {EleSize}
            </ul>
          </div>
          <div className="left-content-body-colors">
            <h4 className="content-tittle active_arrow" num="2" onClick={handleDrop}>Color</h4>
            <div className="color-body drop_down_op delete_drop">
              {showColor}
            </div>
          </div>
          <div className="clear_all" onClick={handleClear}>
            <span>Clear</span>
          </div>
          <div className="btn_apply_option">
            <button onClick={handlePostCM}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch, props) => {
  return {

    actFetchProduct: (product) => {
      dispatch(actFetchProduct(product)); //add cart with action "actAddtoCart" through dispatch
    }
  }
}
export default connect(null, mapDispatchToProps)(Option);