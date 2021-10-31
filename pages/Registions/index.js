import { Nav, Navbar } from "react-bootstrap";
import styles from '../../styles/Home.module.css';

const Registions = () =>(
    <Navbar className={styles.RegistionsBar}>
        <Nav className={styles.menubutton}>
                Đăng ký
            </Nav>
            <Nav className={styles.menubutton}>
                Đăng nhập
            </Nav>
            <Nav className={styles.menubutton}>
                Giỏ hàng
            </Nav>
    </Navbar>

)
export default Registions