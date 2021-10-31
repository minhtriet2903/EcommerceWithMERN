
import React from 'react';
const Product = (props) => {
  
  return (
    <>
      <div className="body">
        <div className="containerr">
                
               {props.children} 
     
        </div>
      </div>
    </>
  )
}

export default Product;