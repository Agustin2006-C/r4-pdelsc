import React, { useState } from 'react';

const PortfolioCard = ({ portfolio, index, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(portfolio);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(portfolio.id);
  };

  return (
    <div 
      className={`portfolio-card ${isExpanded ? 'expanded' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
    >
      <div className="card-header">
        <h3>{portfolio.name}</h3>
        <div className="card-actions">
          <button 
            className="btn-edit"
            onClick={handleEditClick}
          >
            Editar
          </button>
          <button 
            className="btn-delete"
            onClick={handleDeleteClick}
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <p className="description">{portfolio.description}</p>

      {isExpanded && (
        <div className="card-details">
          <div className="detail-section">
            <h4>Materiales</h4>
            <ul>
              {portfolio.materials.map((material, idx) => (
                <li key={idx}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Habilidades</h4>
            <div className="skills-list">
              {portfolio.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h4>Logros</h4>
            <ul>
              {portfolio.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Experiencias</h4>
            <ul>
              {portfolio.experiences.map((experience, idx) => (
                <li key={idx}>{experience}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Proyectos</h4>
            <ul>
              {portfolio.projects.map((project, idx) => (
                <li key={idx}>{project}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;