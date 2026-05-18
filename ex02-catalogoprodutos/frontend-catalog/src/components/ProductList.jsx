import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, isLoading }) => {

  if (isLoading) {
    return (
      <div className="product-list__status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <p>Carregando catálogo...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list__status" aria-live="polite">
        <p>Nenhum produto encontrado. Tente ajustar seus filtros.</p>
      </div>
    );
  }

  return (
    <section className="product-list" aria-label="Lista de produtos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;