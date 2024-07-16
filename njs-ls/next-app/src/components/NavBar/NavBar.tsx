import Link from 'next/link';
import styles from "./NavBar.module.scss"
import { usePathname } from 'next/navigation'

function NavBar() {
    const pathname = usePathname()
    console.log(pathname)

    return ( 
        <nav className={styles.navbar_wrapper}>   
            <ul>
                <Link className={pathname == "/history" ? styles.active : ""} href={"/history"}>History</Link>
                <Link className={pathname == "/" ? styles.active : ""} href={"/"}>Home</Link>
                <Link className={pathname == "/rec" ? styles.active : ""} href={"/rec"}>Rec</Link>
            </ul>
        </nav> 
    );
}

export default NavBar;