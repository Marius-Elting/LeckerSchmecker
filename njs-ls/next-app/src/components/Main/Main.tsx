import { useEffect, useState} from 'react';
import axios from "axios";

import Scanner from "../Scanner/Scanner";

export default function Main() {

    const [productCode, setProductCode] = useState();
    const [lastProduct, setLastProduct] = useState();
    const [scanResult, setScanResult] = useState();

    async function getProductById() {
        const rsp = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${productCode}.json`);
        setLastProduct(rsp.data.product);
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

    return (
        <main>
            <h1>Main</h1>
            <p>OpenFoodFacts</p>
            <Scanner setScanResult={setScanResult}></Scanner>
            <input key="input" type="text" placeholder="Enter product ID" value={productCode} onChange={handleProductCode}/>
            <button onClick={getProductById}>Get product</button>
        </main>
    );
}