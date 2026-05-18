import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import ProductCard from '../../src/components/ProductCard';

const mockProduct = {
  id: 'prod-1',
  title: 'Teclado Mecânico',
  description: 'Teclado mecânico switch brown',
  price: 250.5,
  image: 'https://picsum.photos/seed/1/600/600',
  category: 'Eletrônicos',
  isNew: true,
  isOnSale: false,
};

describe('Componente ProductCard', () => {
  it('deve renderizar as informações do produto corretamente', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Teclado Mecânico')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByText(/250,50/)).toBeInTheDocument(); 
  });

  it('não deve conter violações de acessibilidade (a11y)', async () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });
});