import styles from "./Header.module.scss"

function Header() {
    return ( 
        <header className={styles.header_wrapper}>
            <h1>LeckerSchmecker</h1>
        </header> 
    );
}

export default Header;