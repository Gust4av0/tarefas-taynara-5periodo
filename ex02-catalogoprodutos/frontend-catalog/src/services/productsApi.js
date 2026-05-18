const CATEGORIES = ['Eletrônicos', 'Roupas', 'Casa e Decoração', 'Livros', 'Esportes'];
const TAGS_POOL = ['promoção', 'imperdível', 'lançamento', 'conforto', 'tecnologia', 'dia-a-dia'];

const mockProducts = Array.from({ length: 55 }, (_, index) => {
  const id = index + 1;
  const category = CATEGORIES[index % CATEGORIES.length];
  return {
    id: `prod-${id}`,
    title: `Produto de Teste ${id}`,
    description: `Esta é a descrição detalhada do Produto de Teste ${id}. É um excelente item da categoria ${category}.`,
    price: parseFloat((Math.random() * 490 + 10).toFixed(2)), 
    image: `https://picsum.photos/seed/${id}/600/600`, 
    category: category,
    tags: [
      category.toLowerCase().split(' ')[0], 
      TAGS_POOL[Math.floor(Math.random() * TAGS_POOL.length)]
    ],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    isNew: Math.random() > 0.8,
    isOnSale: Math.random() > 0.7, 
  };
});

const NETWORK_DELAY = 800; // Atraso de 800ms para simular latência de rede

/**
 * Busca produtos com suporte a paginação e filtros.
 * 
 * @param {Object} params - Parâmetros da busca
 * @param {number} params.page - Página atual (default: 1)
 * @param {number} params.limit - Itens por página (default: 12)
 * @param {string} params.search - Termo de busca em título e descrição
 * @param {string} params.category - Filtro exato por categoria
 * @param {number} params.minPrice - Preço mínimo
 * @param {number} params.maxPrice - Preço máximo
 */
export const fetchProducts = async ({
  page = 1,
  limit = 12,
  search = '',
  category = '',
  minPrice,
  maxPrice,
} = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockProducts];

      // Aplicação dos filtros
      if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerSearch) ||
            p.description.toLowerCase().includes(lowerSearch)
        );
      }
      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (minPrice !== undefined && minPrice !== null) {
        filtered = filtered.filter((p) => p.price >= minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== null) {
        filtered = filtered.filter((p) => p.price <= maxPrice);
      }

      // Paginação
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedData = filtered.slice(startIndex, startIndex + limit);

      resolve({
        data: paginatedData,
        meta: {
          total,
          page,
          totalPages,
          limit
        }
      });
    }, NETWORK_DELAY);
  });
};


export const fetchProductById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Produto não encontrado'));
      }
    }, NETWORK_DELAY);
  });
};

export const fetchCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...CATEGORIES]);
    }, NETWORK_DELAY / 2); 
  });
};