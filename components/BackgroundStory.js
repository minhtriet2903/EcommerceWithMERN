import styles from '../styles/Home.module.css'

const BackgroundStory = () =>(
    <div className={styles.BGS}>
        <table className={styles.backgroundtabbe}>
            <tr className={styles.halfhundredpercent}>
                <td className={styles.leftbackgroundcontent}>
                    <div className={styles.hundredpercent}>
                        <div  className={styles.namenslogan}>
                            <table  className={styles.namenslogantable}>
                                <tr  className={styles.namenslogantable1}>
                                    <td>
                                        <h1 className={styles.shopname}>
                                            <span className={styles.bigfont}>F</span>ashion <span className={styles.bigfont}>B</span>ug
                                        </h1>
                                    </td>
                                </tr>
                                <tr className={styles.namenslogantable2}>
                                    <td>
                                        <a className={styles.slogan}>
                                            something cool
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div >
                        <div className={styles.specials}>
                            <h1 className={styles.Fashiontype}><span className={styles.bigfontType}>B</span>ug's <span className={styles.bigfontType}>F</span>ashion</h1>
                            <div className={styles.saleoffs}>
                                <div className={styles.discountpercent}>
                                    <h1>Get up to <span className={styles.bigfontdiscount}>30%</span></h1>
                                    <a className={styles.hm}>
                                        <h4 className={styles.hmm}>ON SPECIAL SALE</h4>
                                    </a>
                                </div>
                                <button className={styles.btnxemngay}>
                                    Xem ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </td>
                <td  className={styles.rightbackgroundcontent}>
                    <div>
                        <img src="imgs/head.png" className={styles.imgminhhoa}/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
)
export default BackgroundStory