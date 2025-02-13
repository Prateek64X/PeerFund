// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import MenuFilter from '../components/MenuFilter';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  // Fetch projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setFilteredProjects(storedProjects);
  }, []);

  const handleFilter = (filter) => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const filtered = storedProjects.filter((project) => {
      if (filter.category && project.category !== filter.category) return false;
      if (filter.priceRange && project.fundingGoal > filter.priceRange) return false;
      return true;
    });
    setFilteredProjects(filtered);
  };

  const handleFund = (projectId, amount) => {
    const fundedProjects = JSON.parse(localStorage.getItem('fundedProjects')) || [];
    const project = filteredProjects.find((p) => p.id === projectId);

    if (project) {
      // Store the project ID and funded amount
      fundedProjects.push({ id: projectId, fundedAmount: amount });
      localStorage.setItem('fundedProjects', JSON.stringify(fundedProjects));
    }
  };

  return (
    <Container fluid className="p-4">
      <NavbarComponent />
      <Row className="mt-4">
        <Col md={8}>
          <Row className="align-items-center mb-3">
            <Col xs="auto" style={{ marginBottom: '10px' }}>
              <h1 className="mb-0">Explore Projects</h1>
            </Col>
            <Col>
              <Form.Control
                type="search"
                placeholder="Search projects"
                className="glass-effect"
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate('/create-project')}>
                <FontAwesomeIcon icon={faPlus} /> Create Project
              </Button>
            </Col>
          </Row>
          <Row className="g-4">
            {filteredProjects.map((project) => (
              <Col key={project.id} md={4}>
                <ProjectCard project={project} onFund={handleFund} />
                {project.validationStatus && (
                  <div className={`validation-badge ${project.validationStatus}`}>
                    {project.validationStatus === 'verified' ? '✅ Verified' : '⚠️ Pending'}
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <MenuFilter onFilter={handleFilter} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;