import React, { useState, useEffect } from 'react';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import { usePortfolios } from './hooks/usePortfolios';
import './styles/App.css';

function App() {
  const { portfolios, loading, error, fetchPortfolios, createPortfolio, updatePortfolio, deletePortfolio } = usePortfolios();
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleCreate = () => {
    setEditingPortfolio(null);
    setShowForm(true);
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    setShowForm(true);
  };

  const handleSubmit = (portfolioData) => {
    if (editingPortfolio) {
      updatePortfolio(editingPortfolio.id, portfolioData);
    } else {
      createPortfolio(portfolioData);
    }
    setShowForm(false);
    setEditingPortfolio(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPortfolio(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este portafolio?')) {
      deletePortfolio(id);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestión de Portafolios</h1>
        <button 
          className="btn-primary" 
          onClick={handleCreate}
        >
          Agregar Portafolio
        </button>
      </header>

      <main className="app-main">
        {showForm ? (
          <PortfolioForm
            portfolio={editingPortfolio}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <PortfolioList
            portfolios={portfolios}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;