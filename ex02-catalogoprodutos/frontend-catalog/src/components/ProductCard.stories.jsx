import React from 'react';
import ProductCard from './ProductCard';
import { Toaster } from 'react-hot-toast';
import '../styles/main.css'; // Importa o CSS para o Storybook reconhecer os estilos

export default {
  title: 'Componentes/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px', padding: '20px', backgroundColor: '#f3f4f6' }}>
        <Toaster position="bottom-right" />
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'], 
};

const baseProduct = {
  id: 'story-1',
  title: 'Cadeira Ergonômica',
  description: 'Cadeira super confortável, ideal para longas horas de trabalho ou estudos diários.',
  price: 899.9,
  image: 'https://picsum.photos/seed/chair/600/600',
  category: 'Casa e Decoração',
  isNew: false,
  isOnSale: false,
};

export const Default = {
  args: {
    product: { ...baseProduct },
  },
};

export const Lancamento = {
  args: {
    product: { ...baseProduct, isNew: true },
  },
};

export const EmOferta = {
  args: {
    product: { ...baseProduct, isOnSale: true, price: 650.0 },
  },
};

export const NovoEOferta = {
  args: {
    product: { ...baseProduct, isNew: true, isOnSale: true },
  },
};