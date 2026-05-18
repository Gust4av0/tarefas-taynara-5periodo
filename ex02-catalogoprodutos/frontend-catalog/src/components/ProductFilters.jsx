import React from 'react';

const CATEGORIES = ['Eletrônicos', 'Roupas', 'Casa e Decoração', 'Livros', 'Esportes'];

const ProductFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <section className="filters" aria-labelledby="filters-title">
      <h2 id="filters-title" className="sr-only">
        Filtros de produtos
      </h2>

      <div className="filters__group">
        <label htmlFor="search" className="filters__label">Buscar</label>
        <input
          type="text"
          id="search"
          name="search"
          className="filters__input"
          placeholder="Ex: Teclado Mecânico..."
          value={filters.search || ''}
          onChange={handleChange}
        />
      </div>

      <div className="filters__group">
        <label htmlFor="category" className="filters__label">Categoria</label>
        <select
          id="category"
          name="category"
          className="filters__input"
          value={filters.category || ''}
          onChange={handleChange}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group filters__group--row">
        <div className="filters__subgroup">
          <label htmlFor="minPrice" className="filters__label">Preço Mín.</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className="filters__input"
            placeholder="0"
            min="0"
            value={filters.minPrice || ''}
            onChange={handleChange}
          />
        </div>
        <div className="filters__subgroup">
          <label htmlFor="maxPrice" className="filters__label">Preço Máx.</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className="filters__input"
            placeholder="1000"
            min="0"
            value={filters.maxPrice || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;