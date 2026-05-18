import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../../src/pages/Home';

vi.mock('../../src/services/productsApi', () => ({
  fetchProducts: vi.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 'mock-1',
          title: 'Produto Integrado 1',
          description: 'Descrição mockada 1',
          price: 100,
          image: 'https://via.placeholder.com/150',
          category: 'Eletrônicos',
        },
      ],
      meta: { total: 1, page: 1, totalPages: 1, limit: 12 },
    })
  ),
}));

describe('Integração da Página Home', () => {
  it('deve exibir o estado de carregamento e depois renderizar os produtos da API', async () => {
    render(<Home />);

    expect(screen.getByText(/Carregando catálogo/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Carregando catálogo/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Produto Integrado 1')).toBeInTheDocument();
    
    expect(screen.getByLabelText(/Buscar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
  });
});