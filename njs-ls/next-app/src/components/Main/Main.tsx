import { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./Main.module.scss"
import Scanner from "../Scanner/Scanner";

export default function Main() {

    const [productCode, setProductCode] = useState();
    const [lastProduct, setLastProduct] = useState<any | undefined>(undefined);
    const [scanResult, setScanResult] = useState();
    const [reloadScanner, setReloadScanner] = useState<boolean>(false)
    async function getProductById() {
        if (productCode) {
            const rsp = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${productCode}.json`);
            setLastProduct(rsp.data.product);
            const history: any = JSON.parse(localStorage.getItem("history") || "[]")
            history.push(rsp.data.product)
            localStorage.setItem("history", JSON.stringify(history))
        }
    }

    function handleProductCode(e) {
        setProductCode(e.target.value)
    }

    // - - - UseEffects - - - - - - -

    useEffect(() => {
        getProductById();
    }, [productCode]);

    useEffect(() => {
        setProductCode(scanResult);
    }, [scanResult]);
    const nutriments = [
        { label: 'Carbohydrates', value: lastProduct?.nutriments.carbohydrates, unit: 'g' },
        { label: 'Energy', value: lastProduct?.nutriments['energy-kcal'], unit: 'kcal' },
        { label: 'Fat', value: lastProduct?.nutriments.fat, unit: 'g' },
        { label: 'Fiber', value: lastProduct?.nutriments.fiber, unit: 'g' },
        { label: 'Proteins', value: lastProduct?.nutriments.proteins, unit: 'g' },
        { label: 'Salt', value: lastProduct?.nutriments.salt, unit: 'g' },
        { label: 'Saturated Fat', value: lastProduct?.nutriments['saturated-fat'], unit: 'g' },
        { label: 'Sugars', value: lastProduct?.nutriments.sugars, unit: 'g' }
    ];

    return (
        <main className={styles.main_wrapper}>
            <div className={styles.main_header}>
                <h2>Scan your Food</h2>
                <button onClick={() => setReloadScanner(prev => !prev)}>Reset</button>
            </div>
            <Scanner setScanResult={setScanResult} reloadScanner={reloadScanner}></Scanner>
            {/*             <input key="input" type="text" placeholder="Enter product ID" value={productCode} onChange={handleProductCode} />
 */}{/*             <button onClick={getProductById}>Get product</button>
 */}

            {lastProduct && (
                <div className={styles.container}>
                    <h1>{lastProduct.product_name_de}</h1>
                    <p><strong>Brand:</strong> {lastProduct.brands}</p>
                    <p><strong>Ingredients:</strong> {lastProduct.ingredients_text}</p>
                    <p><strong>Nutrition Facts:</strong></p>
                    <table className={styles.nutrimentsTable}>
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutriments.map((nutrient, index) => (
                                <tr key={index}>
                                    <td>{nutrient.label}</td>
                                    <td>{nutrient.value}</td>
                                    <td>{nutrient.unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Nutriscore Grade:</strong> {lastProduct.nutriscore_grade}</p>
                </div>

            )}
        </main>
    );
}