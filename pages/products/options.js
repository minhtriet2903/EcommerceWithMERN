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
  const path =router.asPath.split("?").filter(x => x);
  
  const newPath = path.slice(0,1).toString();
 
  const clickColor = useRef([])
  const [pricerange, setPriceRange] = useState([50000, 2000000]);
  const [chooseSize, setChooseSize] = useState();
  const [chooseColor, setChooseColor] = useState();
  const [turnn, setTurn] = useState(false);
  const updateRange = (eve, value) => {
    setPriceRange(value);
  }
  const hanldeSize = (size, index) => {
    setChooseSize(size)
  }

  const hanldeColor = (color, index) => {
    const choose = document.querySelectorAll('.showColor_body');
    choose.forEach(l => l.classList.remove('activeColor'));
    choose[index].classList.toggle('activeColor');
    setChooseColor(color)
    clickColor.current[index].click();
  }

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
    var check = document.querySelectorAll(".hidden_color_chec");
    check.forEach(function (checkbox) {
      if (checkbox.checked && checkbox !== ev.target) { checkbox.checked = false; }
      else if (checkbox.checked) {
        setTurn(false)
        k = 1;
      }
    });
    if (k == 0) {
      setChooseColor(null);
      setTurn(true)
      const choose = document.querySelectorAll('.showColor_body');
      choose.forEach(l => l.classList.remove('activeColor'));
    }
  }
  var EleSize = AmountSize ? AmountSize.map((size, index) => {
    return <li key={index}>
      <label> <input type="checkbox" name="size" className="pro_size" onChange={Changesize} onClick={() => { hanldeSize(size.size, index) }} />{size.size}</label>
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
      <input type="checkbox" className="hidden_color_chec" onChange={ChangeColor} ref={el => clickColor.current[index] = el} />
      <label value={color.colors} className="showColor_body color_item hove">
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
    if (chooseColor && chooseSize) {
      Router.push({
        pathname: newPath,
        query: {
          color: chooseColor,
          size: chooseSize,
          lowPrice: pricerange[0],
          upPrice: pricerange[1]
        }
      });
    }
    else if (chooseColor) {
      Router.push({
        pathname: newPath,
        query: {
          color: chooseColor,       
          lowPrice: pricerange[0],
          upPrice: pricerange[1]
        }
      });
    }else if (chooseSize){
      Router.push({
        pathname: newPath,
        query: {
          size: chooseSize,     
          lowPrice: pricerange[0],
          upPrice: pricerange[1]
        }
      });
    }else{
      Router.push({
        pathname: newPath,
        query: {  
          lowPrice: pricerange[0],
          upPrice: pricerange[1]
        }
      });
    }
  }

  return (
    <>
      <div className="body-nav" id="body-nav">
        <div className="left-content">

          <div className="left-content-body-range">
            <h4 className="content-tittle">Price Range</h4>
            <span className="price-min"><NumberFormat value={pricerange[0]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
            -
            <span className="price-max"><NumberFormat value={pricerange[1]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
            <div className="line_price">
              <Slider
                className="MenuItem"
                value={pricerange}
                max={2000000}
                min={50000}
                onChange={updateRange}
              >
              </Slider>
            </div>

          </div>
          <div className="left-content-body-size">
            <h4 className="content-tittle">Sizes</h4>
            <ul className="size-body">
              {EleSize}
            </ul>
          </div>
          <div className="left-content-body-colors">
            <h4 className="content-tittle">Color</h4>
            <div className="color-body">
              {showColor}
            </div>
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