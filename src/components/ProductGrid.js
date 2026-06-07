import React,{useEffect,useState} from "react";

function ProductGrid(){

    const [products,setProducts] = useState([]);

    useEffect(()=>{

        fetch("http://localhost:8080/api/products")
            .then(res=>res.json())
            .then(data=>setProducts(data));

    },[]);

    return(

        <section className="products-section">

            <h2>Available Artworks</h2>

            <div className="products-grid">

                {products.map(product=>(
                    <div className="product-card" key={product.id}>

                        <img
                          src={`http://localhost:8080/uploads/${product.imageUrl}`}
                          alt={product.name}
                        />

                        <h3>{product.name}</h3>

                        <p>₹ {product.price}</p>

                    </div>
                ))}

            </div>

        </section>

    );

}

export default ProductGrid;