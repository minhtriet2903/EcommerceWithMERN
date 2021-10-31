import * as types from "../constant/actionType";
var initialSate = [];
const detail = (state = initialSate, action) => {   
   
    switch (action.type) {
        case types.FETCH_DETAIL_PRODUCT:
            let data = action.detail;
            return data;
        default: return {...state};
    }
}
export default detail;