import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Navegação de páginas do catálogo">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Ir para a página anterior"
      >
        Anterior
      </button>

      {/* aria-live="polite" avisa aos leitores de tela quando a página muda */}
      <span className="pagination__info" aria-live="polite">
        Página {currentPage} de {totalPages}
      </span>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Ir para a próxima página"
      >
        Próxima
      </button>
    </nav>
  );
};

export default Pagination;