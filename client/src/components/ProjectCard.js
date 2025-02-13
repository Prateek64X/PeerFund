// src/components/ProjectCard.js
import React, { useState, useEffect, useRef } from 'react';
import { Card, Image, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCoins, faLightbulb, faStar } from '@fortawesome/free-solid-svg-icons';
import './ProjectCard.css';

const ProjectCard = ({ project, onFund }) => {
  const [isVertical, setIsVertical] = useState(false);
  const [showFundingSection, setShowFundingSection] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      img.onload = () => {
        setIsVertical(img.naturalHeight > img.naturalWidth);
      };
    }
  }, []);

  // Use AI scores from the project data
  const duckAIPoints = project.aiScores || {
    total: null,
    practicality: null,
    costEffectiveness: null,
    uniqueness: null,
  };

  const handleFund = () => {
    if (fundingAmount && !isNaN(fundingAmount)) {
      onFund(project.id, parseFloat(fundingAmount));
      setFundingAmount('');
      setShowFundingSection(false);
    }
  };

  return (
    <Card className="glass-effect h-100" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div
        className="image-container"
        style={{
          height: '150px',
          overflow: 'hidden',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          position: 'relative',
        }}
        onClick={() => setShowFundingSection(!showFundingSection)}
      >
        <Image
          ref={imageRef}
          src="https://unsplash.com/photos/iDQVmcPFOCI/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM5NTg3OTkwfA&force=true&w=2400"
          fluid
          className={`w-100 h-100 ${isVertical ? 'vertical-image' : ''}`}
          style={{ objectFit: 'cover' }}
        />
        {isVertical && (
          <div
            className="blurred-background"
            style={{
              backgroundImage: `url(${imageRef.current?.src})`,
            }}
          ></div>
        )}
      </div>
      <Card.Body className="p-3">
        <Card.Title className="mb-2" style={{ fontSize: '18px' }}>{project.title}</Card.Title>
        <Card.Text className="mb-2 project-description" style={{ fontSize: '14px', color: '#555' }}>
          {project.description}
        </Card.Text>
        <Card.Text style={{ fontSize: '16px', color: '#2196F3', fontWeight: '700' }}>
          Funding Goal: ${project.fundingGoal}
        </Card.Text>
      </Card.Body>

      {/* DuckAI Evaluation Section */}
      <div className="duckai-evaluation">
        <Row className="m-0">
          <Col xs={3} className="p-2 evaluation-point total-points border-end">
            <small>
              <FontAwesomeIcon icon={faStar} className="me-1" style={{ color: '#FFD700' }} />
              Total Score
            </small>
            <div className="evaluation-score">{duckAIPoints.total || 'N/A'}<span className="out-of">/100</span></div>
          </Col>

          <Col xs={3} className="p-2 evaluation-point border-end">
            <small>
              <FontAwesomeIcon icon={faCheckCircle} className="me-1" style={{ color: '#4CAF50' }} />
              Practicality
            </small>
            <div className="evaluation-score">{duckAIPoints.practicality || 'N/A'}</div>
          </Col>

          <Col xs={3} className="p-2 evaluation-point border-end">
            <small>
              <FontAwesomeIcon icon={faCoins} className="me-1" style={{ color: '#FFC107' }} />
              Cost Effective
            </small>
            <div className="evaluation-score">{duckAIPoints.costEffectiveness || 'N/A'}</div>
          </Col>

          <Col xs={3} className="p-2 evaluation-point">
            <small>
              <FontAwesomeIcon icon={faLightbulb} className="me-1" style={{ color: '#9C27B0' }} />
              Uniqueness
            </small>
            <div className="evaluation-score">{duckAIPoints.uniqueness || 'N/A'}</div>
          </Col>
        </Row>
      </div>

      {/* Funding Section */}
      {showFundingSection && (
        <div className="p-3 border-top">
          <Form.Group className="mb-3">
            <Form.Label>Funding Amount (USD)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleFund} className="w-100">
            Fund Project
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;