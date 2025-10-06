import React, { useState, useEffect } from 'react';

const PortfolioForm = ({ portfolio, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    materials: [''],
    skills: [''],
    achievements: [''],
    experiences: [''],
    projects: ['']
  });

  useEffect(() => {
    if (portfolio) {
      setFormData({
        name: portfolio.name || '',
        description: portfolio.description || '',
        materials: portfolio.materials || [''],
        skills: portfolio.skills || [''],
        achievements: portfolio.achievements || [''],
        experiences: portfolio.experiences || [''],
        projects: portfolio.projects || ['']
      });
    }
  }, [portfolio]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filtrar arrays para eliminar elementos vacíos
    const cleanedData = {
      ...formData,
      materials: formData.materials.filter(item => item.trim() !== ''),
      skills: formData.skills.filter(item => item.trim() !== ''),
      achievements: formData.achievements.filter(item => item.trim() !== ''),
      experiences: formData.experiences.filter(item => item.trim() !== ''),
      projects: formData.projects.filter(item => item.trim() !== '')
    };

    onSubmit(cleanedData);
  };

  return (
    <div className="portfolio-form-container">
      <form className="portfolio-form" onSubmit={handleSubmit}>
        <h2>{portfolio ? 'Editar Portafolio' : 'Nuevo Portafolio'}</h2>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>

        {/* Materiales */}
        <div className="form-group">
          <label>Materiales:</label>
          {formData.materials.map((material, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={material}
                onChange={(e) => handleArrayChange('materials', index, e.target.value)}
                placeholder="Ej: Laptop Dell XPS"
              />
              {formData.materials.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('materials', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addArrayItem('materials')}
          >
            + Agregar Material
          </button>
        </div>

        {/* Habilidades */}
        <div className="form-group">
          <label>Habilidades:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                placeholder="Ej: JavaScript, React, Node.js"
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('skills', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addArrayItem('skills')}
          >
            + Agregar Habilidad
          </button>
        </div>

        {/* Logros */}
        <div className="form-group">
          <label>Logros:</label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                placeholder="Ej: Premio al mejor proyecto 2022"
              />
              {formData.achievements.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('achievements', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addArrayItem('achievements')}
          >
            + Agregar Logro
          </button>
        </div>

        {/* Experiencias */}
        <div className="form-group">
          <label>Experiencias:</label>
          {formData.experiences.map((experience, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={experience}
                onChange={(e) => handleArrayChange('experiences', index, e.target.value)}
                placeholder="Ej: Desarrollador Senior en TechCorp (2020-2023)"
              />
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('experiences', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addArrayItem('experiences')}
          >
            + Agregar Experiencia
          </button>
        </div>

        {/* Proyectos */}
        <div className="form-group">
          <label>Proyectos:</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={project}
                onChange={(e) => handleArrayChange('projects', index, e.target.value)}
                placeholder="Ej: E-commerce platform"
              />
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeArrayItem('projects', index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() => addArrayItem('projects')}
          >
            + Agregar Proyecto
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {portfolio ? 'Actualizar' : 'Crear'} Portafolio
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;