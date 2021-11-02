import "../styles/section_pro.css"
import "../styles/products.css";
import "../styles/detail.css";
import "../styles/cart.css";
import "../styles/cartModal.css";
import "../styles/header.css";
import "../styles/landingpage.css";
import "../styles/Home.module.css"
import "../styles/login.css";
import "../styles/register.css";
import "../styles/profile.css";
import { createStore, compose } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import appReducers from "./reducers";
import Headerr from "./header";
import Head from 'next/dist/shared/lib/head';
import { Provider } from "react-redux";
import SideBar from "../components/SideBar";
import {useState} from "react";
import { useRouter } from 'next/router';
import cookieCutter from "cookie-cutter";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  appReducers,
  composeEnhancers()
);
const MyApp = ({ Component, pageProps }) => {

  const router = useRouter();
  const [user,setUser] = useState(null);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    const Acc = cookieCutter.get("Acc")
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data);      
      }
      fetchUser();
    } else {
      setUser(null);
    }

  }, [router])
  return (
    <>
      <Head>
         <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script async src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <script async src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
 
        <title>Haha</title>
      </Head>
  
      <Provider store={store}>
      {  
       user ? user.role !=='Manager' ?<Headerr />:<SideBar />:<Headerr />   
    }
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
