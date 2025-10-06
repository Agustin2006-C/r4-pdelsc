import React from 'react';
import PortfolioCard from './PortfolioCard';

const PortfolioList = ({ portfolios, onEdit, onDelete }) => {
  return (
    <div className="portfolio-list">
      <h2>Lista de Portafolios</h2>
      <div className="portfolios-grid">
        {portfolios.map((portfolio, index) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;