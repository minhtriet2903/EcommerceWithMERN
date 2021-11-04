
import React, { useState, useEffect,lazy } from 'react';
import Productcontent from '../../products/section';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Product from '../../products/product';
import Options from '../../products/options';
import Pagination from '../../products/pagination';
import axios from "axios";
import * as Config from "../../constant/config";
import { actAddtoCart, actFetchProduct, actFetchColor, actFetchSizer } from '../../actions';


const ProductContainer = (props) => {
    const router = useRouter();
    const sexx = ["Nam","Nữ","Trẻ con"];
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postPerPage = 8;

    //props contain attribute of product and  1 action to add to cart of each other  
    useEffect(() => {
        
      
    

        if (router.asPath !== router.route) {
            var request = {
                params: {
                     sex: router.query.catogrory === 'kid'? null : router.query.catogrory, 
                     age:  router.query.catogrory === 'kid'? 'Kid' : 'Adult', 
                    content:router.query.productContainer,
                    color: router.query.color ? router.query.color : null,
                    size: router.query.size ? router.query.size : null,
                    lowPrice: router.query.lowPrice,
                    upPrice: router.query.upPrice,
                }
            }
            const fetchh = async () => {
                const data = await axios.get(Config.API_URL, request ? request : {});
                props.actFetchProduct(data.data);
                 setPosts(data.data); 
               
            };
            fetchh();
        }
    }, [router])
    useEffect(() => {
        const fetchh = async () => {
        const res = await fetch(Config.API_URL + '/color');
            const data = await res.json() 
             props.actFetchColor(data);

        };
        fetchh();
        const fetchSize = async () => {
             const res = await fetch(Config.API_URL + '/size');
            const data = await res.json() 
             props.actFetchSizer(data); 
        };
        fetchSize();
    }, [])

    //get current post
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost + postPerPage;
    const currentPost = posts.slice(indexOfLastPost, indexOfFirstPost);

    //change page 
    const pageItem = (number) => setCurrentPage(number)
    const showProduct = (product) => {
        var result = '';
        const { onAddToCart } = props;
        if (product.length > 0) {
            result = currentPost.map((product, index) => {
                return <Productcontent key={index} product={product} onAddToCart={onAddToCart} />
            })
        }
        return result;
    }

    return (
        <>
            <Product>

                <div className="body-container">
                     <Options AmountColor={props.color} AmountSize={props.size} actFetchProduct={props.actFetchProduct} /> 
                    <div className="section-body">
                        <section>
                            {showProduct(currentPost)}
                        </section>

                        <Pagination postPerPage={postPerPage} totalPosts={posts.length} pageItem={pageItem} />
                    </div>
                </div>

            </Product>
        </>
    )
}

const mapStateToProps = state => {

    return {
        products: state.product,
        color: state.color,
        size: state.size 
        //get product from store in reducer and push in props
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: (product) => { //product will get data from component "product" when user click add cart in component  "product"     
            dispatch(actAddtoCart(product, 1)); //add cart with action "actAddtoCart" through dispatch
        },
        actFetchProduct: (product) => {
            dispatch(actFetchProduct(product)); //add cart with action "actAddtoCart" through dispatch
        },
        actFetchColor: (color) => {

            dispatch(actFetchColor(color)); //add cart with action "actAddtoCart" through dispatch
        },
        actFetchSizer: (size) => {

            dispatch(actFetchSizer(size)); //add cart with action "actAddtoCart" through dispatch
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
