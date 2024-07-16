import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.scss"
function History() {
    const [history, setHistory] = useState<any>(undefined)
    useEffect(() => {
        
        const localHistory: any = localStorage.getItem("history") || "[]"
        const JSONHistory = JSON.parse(localHistory)
        console.log(JSONHistory)
        const newHistory = JSONHistory.map((item) => {
            const nutriments = [
                { label: 'Carbohydrates', value: item?.nutriments?.carbohydrates, unit: 'g' },
                { label: 'Energy', value: item?.nutriments['energy-kcal'], unit: 'kcal' },
                { label: 'Fat', value: item?.nutriments?.fat, unit: 'g' },
                { label: 'Fiber', value: item?.nutriments?.fiber, unit: 'g' },
                { label: 'Proteins', value: item?.nutriments?.proteins, unit: 'g' },
                { label: 'Salt', value: item?.nutriments?.salt, unit: 'g' },
                { label: 'Saturated Fat', value: item?.nutriments['saturated-fat'], unit: 'g' },
                { label: 'Sugars', value: item?.nutriments?.sugars, unit: 'g' }
            ];
            item.nutriments = nutriments
            return item
        })
        console.log(newHistory)
        setHistory(newHistory)
    }, [])


    return (<div className={styles.history_wrapper}>
        { history && history.map((item, i) => (
            <div className={styles.container}>
                <h1>{item.product_name_de}</h1>
                <p><strong>Brand:</strong> {item.brands}</p>
                <p><strong>Ingredients:</strong> {item.ingredients_text}</p>
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
                        {item.nutriments.map((nutrient, index) => (
                            <tr key={index}>
                                <td>{nutrient.label}</td>
                                <td>{nutrient.value}</td>
                                <td>{nutrient.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p><strong>Nutriscore Grade:</strong> {item.nutriscore_grade}</p>
            </div>
        ))
        }
    </div>);
}

export default History;