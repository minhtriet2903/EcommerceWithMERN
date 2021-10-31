import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../../styles/Home.module.css'
import Registions from '../Registions/index'

const Navbarmenu = () =>(
    <div className={styles.mainmenu}>
        <ul className={styles.menulist}>
            <li className={styles.leftbar}>
                <Navbar bg='trans' variant='dark' className={styles.Navbarmenu}>
                    <ul className={styles.menulist}>
                        <li>
                            <a className={styles.dropdownlist}>
                                Home
                                <div className={styles.optionslist}>
                                    <a className={styles.option}>option1</a>
                                    <a className={styles.option}>option2</a>
                                    <a className={styles.option}>option3</a>
                                    <a className={styles.option}>option4</a>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className={styles.dropdownlist}>
                                Family
                                <div className={styles.optionslist}>
                                    <a className={styles.option}>option1</a>
                                    <a className={styles.option}>option2</a>
                                    <a className={styles.option}>option3</a>
                                    <a className={styles.option}>option4</a>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className={styles.dropdownlist}>
                                Future
                                <div className={styles.optionslist}>
                                    <a className={styles.option}>option1</a>
                                    <a className={styles.option}>option2</a>
                                    <a className={styles.option}>option3</a>
                                    <a className={styles.option}>option4</a>
                                </div>
                            </a>
                        </li>
                    </ul>
                </Navbar>
            </li>
            <li className={styles.rightbar}>
                <Registions/>
            </li>
        </ul>
        
        
    </div>
        
)
export default Navbarmenu