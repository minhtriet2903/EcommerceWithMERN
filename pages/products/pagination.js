import React from "react";
import Link from "next/link";
import ReactPaginate  from 'react-paginate'
const Pagination = ({ postPerPage, totalPosts,pageItem }) => {
    const pageNumbers = Math.ceil(totalPosts / postPerPage);
   
    const changePage = ({selected}) =>{
        pageItem(selected);
    }
    
    const pagination = pageNumbers > 0 ?  
        <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        activeClassName={'paginationActive'}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        subContainerClassName={'pages pagination'}
        pageCount={pageNumbers}
      /*   marginPagesDisplayed={3}
        pageRangeDisplayed={5}  */
        onPageChange={changePage} 
        />
        :
        '';
    return (
        <>
            {pagination}
        </>
    )
}
export default Pagination;