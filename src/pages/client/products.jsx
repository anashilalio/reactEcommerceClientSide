import React, { useState, useEffect } from 'react';
import Categorie from './Categorie';
export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
      let json = await res.json();
      setProducts(json);
    }

    fetchProducts();
  }, []);

  return (
    <div className='mt-16 flex '>
      <Categorie />
      <div className="products ml-96">
      {products.map((product) => {
        return<>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>{product.price}</h3>
        </>
      })}
      </div>
      <div>

      </div>
    </div>
  );
}

export default Products;