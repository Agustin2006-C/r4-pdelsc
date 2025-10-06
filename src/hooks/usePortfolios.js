import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolios';

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setPortfolios(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar portafolios');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPortfolio = async (portfolioData) => {
    try {
      const response = await axios.post(API_URL, portfolioData);
      setPortfolios(prev => [response.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear portafolio');
      throw err;
    }
  };

  const updatePortfolio = async (id, portfolioData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, portfolioData);
      setPortfolios(prev => 
        prev.map(portfolio => 
          portfolio.id === id ? { ...response.data, id } : portfolio
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar portafolio');
      throw err;
    }
  };

  const deletePortfolio = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPortfolios(prev => prev.filter(portfolio => portfolio.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar portafolio');
      throw err;
    }
  };

  return {
    portfolios,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
  };
};