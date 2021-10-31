import React, { useEffect, useState } from "react";
import * as types from "../constant/actionType";
 var initialSate = [];

const Color = (state = initialSate, action) => {   
 
    switch (action.type) {
      
        case types.ADD_FETCH_SIZE:    
         
            return [...action.size];
        default: return [...state];
    }
}
export default Color;