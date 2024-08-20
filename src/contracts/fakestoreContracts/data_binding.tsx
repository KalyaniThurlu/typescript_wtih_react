
import { useEffect, useState } from "react";
import { FakestoreContract } from "./fakestoreContracts";
import axios from "axios";

export function Databinding() {
    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<FakestoreContract[]>([]);

    function LoadCategories() {
        axios.get(`https://fakestoreapi.com/products/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error loading categories:", error);
            });
    }

    function LoadProducts() {
        axios.get(`https://fakestoreapi.com/products`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error loading products:", error);
            });
    }

    useEffect(() => {
        LoadCategories();
        LoadProducts();
    }, []);

    return (
        <div>
            <ol>
                {categories.map(category => (
                    <li key={category}>{category}</li>
                ))}
            </ol>
            <main style={{display:"flex", flexWrap:"wrap"}}>
                {products.map(product => (
                    <div key={product.id}>
                        <img src={product.image} alt={product.title} width="100" height="100" />
                    </div>
                ))}
            </main>
        </div>
    );
}
