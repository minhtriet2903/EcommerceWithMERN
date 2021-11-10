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

  const { products } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);


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
          pagee: router.query.pagee ? router.query.pagee : 1,
        },
      };
      const fetchh = async () => {
        const data = await axios.get(Config.API_URL, request ? request : {});
     
        props.actFetchProduct(data.data.product);
      
        setTotalPage(data.data.pageNum)
        setCurrentPage(data.data.currentPage)
      };
      fetchh();
    }
  }, [router]);
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


  //change page

  const showProduct = (product) => {
    var result = "";
    const { onAddToCart } = props;

    if (loading) {
      result = "Không có sản phẩm nào";
    }
    if (product.length > 0) {
      result = product.map((product, index) => {
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
  const handlePage = async (e) => {

    const currentPath = router.pathname;
    const currentQuery = router.query;

    currentQuery.pagee = e;
    router.push({
      pathname: currentPath,
      query: currentQuery
    })

  }
  const showPagination = (e) => {
    var page = [];
    var result = '';
    for (let i = 1; i <= e; i++) {
      page.push(Number(i))
    }
    result = page.length > 0 ? page.map((item, index) => {

      return <li key={index} className={index + 1 === currentPage ? 'hightLight' : ''} onClick={() => handlePage(index + 1)}>{item}</li>
    })
      : '';
    return result;
  }
  const handleChangePage = async (e) => {
    const i = Number(e.target.attributes.num.value);
    const currentPath = router.pathname;
    const currentQuery = router.query;

    currentQuery.pagee = i === 1 ? currentPage - 1 : currentPage + 1;
    router.push({
      pathname: currentPath,
      query: currentQuery
    })
  }

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
            <section>{showProduct(products)}</section>
            <div className="pagein_body">
              <div className="inside">
                {
                  currentPage === 1 || currentPage === 0 ? '' : <i className='bx bxs-left-arrow' num="1" onClick={handleChangePage}></i>
                }
                <ul className="paginationBttns">
                  {
                    showPagination(totalPage)
                  }
                </ul>
                {
                  currentPage === totalPage || totalPage === 0  ? '' : <i className='bx bxs-right-arrow' num="2" onClick={handleChangePage}></i>
                }

              </div>
            </div>

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
