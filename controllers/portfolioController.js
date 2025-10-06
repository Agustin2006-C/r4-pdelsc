const Portfolio = require('../models/Portfolio');

exports.getAllPortfolios = (req, res) => {
  Portfolio.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener portafolios' });
    }
    // Convertir JSON strings a objetos
    const portfolios = results.map(portfolio => ({
      ...portfolio,
      materials: JSON.parse(portfolio.materials),
      skills: JSON.parse(portfolio.skills),
      achievements: JSON.parse(portfolio.achievements),
      experiences: JSON.parse(portfolio.experiences),
      projects: JSON.parse(portfolio.projects)
    }));
    res.json(portfolios);
  });
};

exports.getPortfolioById = (req, res) => {
  const { id } = req.params;
  Portfolio.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el portafolio' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Portafolio no encontrado' });
    }
    const portfolio = {
      ...results[0],
      materials: JSON.parse(results[0].materials),
      skills: JSON.parse(results[0].skills),
      achievements: JSON.parse(results[0].achievements),
      experiences: JSON.parse(results[0].experiences),
      projects: JSON.parse(results[0].projects)
    };
    res.json(portfolio);
  });
};

exports.createPortfolio = (req, res) => {
  const portfolio = req.body;
  Portfolio.create(portfolio, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el portafolio' });
    }
    res.status(201).json({ id: results.insertId, ...portfolio });
  });
};

exports.updatePortfolio = (req, res) => {
  const { id } = req.params;
  const portfolio = req.body;
  Portfolio.update(id, portfolio, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el portafolio' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Portafolio no encontrado' });
    }
    res.json({ id, ...portfolio });
  });
};

exports.deletePortfolio = (req, res) => {
  const { id } = req.params;
  Portfolio.delete(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el portafolio' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Portafolio no encontrado' });
    }
    res.json({ message: 'Portafolio eliminado correctamente' });
  });
};