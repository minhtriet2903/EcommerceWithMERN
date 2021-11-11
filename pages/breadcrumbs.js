import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";

const Breadcrumb = (props) => {

  const current = useRouter();
  const { router } = props;
  const { detail } = props;
  const name = router.asPath.split("?").filter(x => x);
  const [link, setLink] = useState([]);
  const path = router.pathname.split("/").filter(x => x);
  const newUrl = name[0].split('/').filter(x => x)
  if (router.pathname !== '/UserPage') {
    path.splice(0, 1);
    newUrl.splice(0, 1);
  }

  useEffect(() => {
    var bread = [];
    path.map((item, index) => {

      if (item === '[catogrory]') {

        if (router.query.catogrory !== 'undefined')
          bread.push(router.query.catogrory)
        else {

          if ((detail.Sex === 'Male' || detail.Sex === 'Nam') && detail.age === 'Adult') {
            bread.push("Nam")
          }
          else if ((detail.Sex === 'Female') || (detail.Sex === 'Nữ') && detail.age === 'Adult') {
            bread.push("Nữ")
          } else {
            bread.push("Trẻ con")
          }
        }
      } else if (item === '[productContainer]') {
        bread.push(router.query.productContainer)
      } else {
        bread.push(newUrl[newUrl.length - 1]);
      }
    })
    setLink(bread);

  }, [detail])


  /*  const first= newUrl.splice(newUrl.length-1,newUrl.length)  */
  /*  newUrl[newUrl.length-1] = newUrl[newUrl.length-1].split("_") */
  /*  const Last = newUrl.length;
   newUrl[newUrl.length-1].splice(Last-1,Last) */
  /*  newUrl[newUrl.length-1][0]= newUrl[newUrl.length-1][0].replace(/[-]/g," ") */

  /*   window.location.protocol + "://" + */

  const newlink = link;
  return (
    <>
      <div role="presentation" >
        <Breadcrumbs className="bread_body" aria-label="breadcrumb">
          <Link className="breadcrumb_link" color="inherit" onClick={() => { router.push("/") }}>
            Trang chủ
          </Link>
          {link.map((item, index) => {
            const isLast = index === link.length - 1;
            if (current.pathname === '/container/[catogrory]/[productContainer]' && index === newUrl.length - 1)
              item = current.query.productContainer;
            else if (current.pathname === '/container/[catogrory]/details' && index === newUrl.length - 1)
              item = 'Chi tiết';
            else if (current.pathname === '/container/cartCon' && index === newUrl.length - 1) {
              item = 'Giỏ hàng';
            } else if (current.pathname === '/container/find') {
              item = 'Tìm kiếm'
            } else if (current.pathname === '/UserPage' && index === newUrl.length - 1) {
              item = 'Thông tin cá nhân'
            }
            var routo = `/container/${newlink.slice(0, index + 1).join("/")}`;
           
            return isLast ? (
              <span key={index}>{item === 'Kid' ? 'Trẻ con' : item}</span>
            ) :
              <Link key={index} className="breadcrumb_link" color="inherit" onClick={() => {

                item === 'Nam' || item === 'Nữ' ? current.push(routo + '?age=Adult') : router.push(routo)
                /*   if(item === 'Nam' || item === 'Nữ'){
                  current.push(routo + '?age=Adult')
                } else if(item === 'Trẻ con') {
                      const curr = current.pathname;
                      const que = current.query;
                      que.catogrory = 'Kid';
                    
                     
                      current.push({
                        pathname:routo,
                        query:que
                      })
                }   */
              }}>
                {item === 'Kid' ? 'Trẻ con' : item}
              </Link>
          })}

        </Breadcrumbs>
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {

    detail: state.detail//get product from store in reducer and push in props
  }
}
export default connect(mapStateToProps, null)(withRouter(Breadcrumb));