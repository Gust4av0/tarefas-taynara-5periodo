import React, { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { fetchProducts } from '../services/productsApi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    let isMounted = true; 
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts({
          page,
          limit: 12, 
          search: filters.search,
          category: filters.category,
          minPrice: filters.minPrice ? Number(filters.minPrice) : null,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
        });

        if (isMounted) {
          setProducts(response.data);
          setTotalPages(response.meta.totalPages);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <main className="container">
        <header className="page-header">
          <h1>Catálogo de Produtos</h1>
          <p>Encontre os melhores produtos com os melhores preços.</p>
        </header>

        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
        <ProductList products={products} isLoading={loading} />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Catálogo de Produtos. Todos os direitos reservados.</p>
          <p>Dev João Gustavo Quennehen</p>
        </div>
      </footer>
    </>
  );
};

export default Home;

