// src/pages/MyPeers.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MyPeers.css';

const MyPeers = () => {
  const [fundedProjects, setFundedProjects] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch funded projects and all projects from localStorage on component mount
  useEffect(() => {
    const storedFundedProjects = JSON.parse(localStorage.getItem('fundedProjects')) || [];
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];

    // Map funded projects to their full project details
    const fundedProjectsWithDetails = storedFundedProjects.map((fundedProject) => {
      const project = storedProjects.find((p) => p.id === fundedProject.id);
      return { ...project, fundedAmount: fundedProject.fundedAmount };
    });

    setFundedProjects(fundedProjectsWithDetails);
    setProjects(storedProjects);
  }, []);

  const totalFunded = fundedProjects.reduce((sum, project) => sum + project.fundedAmount, 0);

  const data = fundedProjects.map((project) => ({
    name: project.title,
    Funding: project.fundedAmount,
  }));

  return (
    <Container fluid className="p-4">
      <NavbarComponent />
      <Row className="mt-4">
        <Col md={4} className="my-peers-section p-3">
          <h1 style={{ color: '#2196F3', fontSize: '24px', marginBottom: '20px' }}>My Peers</h1>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '5px' }}>Total Projects Funded</p>
            <p style={{ color: '#2196F3', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>
              {fundedProjects.length}
            </p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '5px' }}>Total USD Funded</p>
            <p style={{ color: '#2196F3', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>
              ${totalFunded}
            </p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '5px' }}>Profit Growth</p>
            <p style={{ color: '#2196F3', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>20%</p>
            <ProgressBar now={20} label={`20%`} variant="info" style={{ height: '15px', borderRadius: '5px' }} />
          </div>
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ color: '#2196F3', fontSize: '18px', marginBottom: '15px' }}>Funding Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Funding" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={8}>
          <h3>Funded Projects</h3>
          <Row className="g-4">
            {fundedProjects.map((project) => (
              <Col key={project.id} md={4}>
                <ProjectCard project={project} />
                <div className="funded-amount">
                  Funded: ${project.fundedAmount}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPeers;