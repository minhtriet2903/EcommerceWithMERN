import React, { useEffect, useState } from "react";
import * as types from "../constant/actionType";
 var initialSate = [];/*
     {
        id: 1,
        name: 'Soild black',
        image: 'https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg',
        description: 'Hahah',
        size: 'XXl',
        color: 'Black',
        price: 12000,
        discount: 12,
        inventory: 10,
        rating: 4
    },
    {
        id: 2,
        name: 'Green',
        image: 'https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg',
        description: 'qưda',
        size: 'XX',
        color: 'White',
        price: 213,
        discount: null,
        inventory: 10,
        rating: 5
    },
    {
        id: 3,
        name: 'Soild black',
        image: 'https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg',
        description: 'ksss',
        size: 'XXl',
        color: 'Orange',
        price: 432,
        discount: 12000,
        inventory: 10,
        rating: 2
    }, 

]; */
const Product = (state = initialSate, action) => {   
   var{color} = action;
    switch (action.type) {
        case types.FETCH_PRODUCT:
            return [...action.product]
        
        default: return [...state];
    }
}
export default Product;