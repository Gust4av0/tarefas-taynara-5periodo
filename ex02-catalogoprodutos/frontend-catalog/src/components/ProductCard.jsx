import React from 'react';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast'; 

const ProductCard = ({ product }) => {
  const { id, title, description, price, image, category, isNew, isOnSale } = product;

  const getImageUrl = (size) => image.replace('600/600', `${size}/${size}`);

  const handleAddToCart = () => {
    toast.success(`"${title}" adicionado ao carrinho!`);
  };

  return (
    <article className="product-card" aria-labelledby={`title-${id}`}>      <div className="product-card__image-wrapper">
        <picture>
          <source media="(max-width: 480px)" srcSet={getImageUrl(300)} />
          <source media="(max-width: 768px)" srcSet={getImageUrl(450)} />
          <img
            src={image}
            alt={`Imagem do produto ${title}`}
            loading="lazy"
            width="600"
            height="600"
            className="product-card__image"
          />
        </picture>
        
        <div className="product-card__badges">
          {isNew && <span className="badge badge--new">Novo</span>}
          {isOnSale && <span className="badge badge--sale">Oferta</span>}
        </div>
      </div>

      <div className="product-card__content">
        <span className="product-card__category">{category}</span>
        <h3 id={`title-${id}`} className="product-card__title" tabIndex="0">
          {title}
        </h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__price" aria-label={`Preço: ${formatCurrency(price)}`}>
          {formatCurrency(price)}
        </div>
        
        {/* Botão atualizado com a nova função */}
        <button
          className="btn btn--primary"
          aria-label={`Adicionar ${title} ao carrinho`}
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
};

export default ProductCard;