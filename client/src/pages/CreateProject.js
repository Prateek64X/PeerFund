// src/pages/CreateProject.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import './CreateProject.css';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fundingGoal: '',
    category: '',
    mediaFiles: [],
  });
  const [validationStatus, setValidationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate DuckAI validation
    setValidationStatus('pending');
    setTimeout(() => {
      // Generate a unique ID for the project
      const projectId = Date.now().toString();

      // Create project object with empty AI scores
      const project = {
        id: projectId,
        ...formData,
        aiScores: {
          total: 82,
          practicality: 22,
          cost_effectiveness: 36,
          uniqueness: 24,
        },
      };

      // Save project to localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
      existingProjects.push(project);
      localStorage.setItem('projects', JSON.stringify(existingProjects));

      setValidationStatus('success'); // or 'failed'
    }, 2000);
  };

  return (
    <Container fluid className="p-4">
      <NavbarComponent />
      <Row className="justify-content-center align-items-center h-100" style={{ marginTop: '25px' }}>
        <Col md={8} lg={6} className="create-project-card p-4">
          <h1 className="text-center mb-4">Create a New Project</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your project"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ height: '250px' }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Funding Goal (USD)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter funding goal"
                value={formData.fundingGoal}
                onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option value="environment">Environment</option>
                <option value="education">Education</option>
                <option value="technology">Technology</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Media (Optional)</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setFormData({ ...formData, mediaFiles: e.target.files })}
              />
            </Form.Group>

            {validationStatus === 'pending' && (
              <Alert variant="info" className="text-center">
                <i className="fas fa-spinner fa-spin"></i> DuckAI is validating your project...
              </Alert>
            )}

            {validationStatus === 'success' && (
              <Alert variant="success" className="text-center">
                <i className="fas fa-check-circle"></i> Project validated successfully!
              </Alert>
            )}

            {validationStatus === 'failed' && (
              <Alert variant="danger" className="text-center">
                <i className="fas fa-times-circle"></i> Validation failed. Please check your project details.
              </Alert>
            )}

            <div className="text-center">
              <Button variant="primary" type="submit" className="w-100">
                Submit for Validation
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;