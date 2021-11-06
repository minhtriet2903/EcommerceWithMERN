import React, { useState, useEffect } from "react";
import Productcontent from "../../products/section";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Product from "../../products/product";
import Options from "../../products/options";
import Pagination from "../../products/pagination";
import axios from "axios";
import * as Config from "../../constant/config";
import {
  actAddtoCart,
  actFetchProduct,
  actFetchColor,
  actFetchSizer,
} from "../../actions";

const ProductByGt = (props) => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const postPerPage = 8;

  //props contain attribute of product and  1 action to add to cart of each other
  useEffect(() => {
    setLoading(true);
    if (router.asPath !== router.route) {
      var request = {
        params: {
          sex:
            router.query.catogrory === "Kid" ||
            router.query.catogrory === "Trẻ em"
              ? null
              : router.query.catogrory,
          age:
            router.query.catogrory === "Kid" ||
            router.query.catogrory === "Trẻ em"
              ? "Kid"
              : router.query.age,
          color: router.query.color ? router.query.color : null,
          size: router.query.size ? router.query.size : null,
          lowPrice: router.query.lowPrice,
          upPrice: router.query.upPrice,
        },
      };
      const fetchh = async () => {
        const data = await axios.get(Config.API_URL, request ? request : {});
        props.actFetchProduct(data.data);
        setPosts(data.data);
        
      };
      fetchh();
    }
  }, [router]);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost + postPerPage;
  const currentPost = posts.slice(indexOfLastPost, indexOfFirstPost);
  console.log(loading)
  //change page
  const pageItem = (number) => setCurrentPage(number);
  const showProduct = (product) => {
    var result = "";
    const { onAddToCart } = props;
    console.log(product)
    if(loading){
      result="Không có sản phẩm nào";
    }
    if (product.length > 0) {
      result = currentPost.map((product, index) => {
        return (
          <Productcontent
            key={index}
            product={product}
            onAddToCart={onAddToCart}
          />
        );
      });
    }
    return result;
  };
  useEffect(() => {
    const fetchh = async () => {
      const res = await fetch(Config.API_URL + "/color");
      const data = await res.json();
      props.actFetchColor(data);
    };
    fetchh();
    const fetchSize = async () => {
      const res = await fetch(Config.API_URL + "/size");
      const data = await res.json();
      props.actFetchSizer(data);
    };
    fetchSize();
  }, []);

  //get current post
  

  return (
    <>
      <Product>
        <div className="body-container">
          <Options
            AmountColor={props.color}
            AmountSize={props.size}
            actFetchProduct={props.actFetchProduct}
          />
          <div className="section-body">
            <section>{showProduct(currentPost)}</section>

            <Pagination
              postPerPage={postPerPage}
              totalPosts={posts.length}
              pageItem={pageItem}
            />
          </div>
        </div>
      </Product>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.product,
    color: state.color,
    size: state.size,
    //get product from store in reducer and push in props
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product) => {
      //product will get data from component "product" when user click add cart in component  "product"
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
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductByGt);
