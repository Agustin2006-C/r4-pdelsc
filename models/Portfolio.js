const db = require('../config/database');

class Portfolio {
  static getAll(callback) {
    db.query('SELECT * FROM portfolios ORDER BY created_at DESC', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM portfolios WHERE id = ?', [id], callback);
  }

  static create(portfolio, callback) {
    const { name, description, materials, skills, achievements, experiences, projects } = portfolio;
    const query = `
      INSERT INTO portfolios (name, description, materials, skills, achievements, experiences, projects) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [name, description, JSON.stringify(materials), JSON.stringify(skills), JSON.stringify(achievements), JSON.stringify(experiences), JSON.stringify(projects)], callback);
  }

  static update(id, portfolio, callback) {
    const { name, description, materials, skills, achievements, experiences, projects } = portfolio;
    const query = `
      UPDATE portfolios 
      SET name = ?, description = ?, materials = ?, skills = ?, achievements = ?, experiences = ?, projects = ? 
      WHERE id = ?
    `;
    db.query(query, [name, description, JSON.stringify(materials), JSON.stringify(skills), JSON.stringify(achievements), JSON.stringify(experiences), JSON.stringify(projects), id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM portfolios WHERE id = ?', [id], callback);
  }
}

module.exports = Portfolio;