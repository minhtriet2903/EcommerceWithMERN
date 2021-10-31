import { combineReducers } from "redux";
import product from "./productPre";
/* import cartPre from "./cartPre"; */
import cart from "./cartPre";
import detail from "./detailRedu";
import color from "./color";
import size from "./size";
const appReducers = combineReducers({
    product,
    cart,
    detail,
    color,
    size
});
export default appReducers;