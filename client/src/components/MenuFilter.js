import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MenuFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [dateFilter, setDateFilter] = useState(false);

  const handleFilter = () => {
    onFilter({ category, priceRange, dateFilter });
  };

  return (
    <Form className="glass-effect p-3">
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)} className="glass-effect">
          <option value="">All</option>
          <option value="tech">Tech</option>
          <option value="art">Art</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="priceRange">
        <Form.Label>Price Range</Form.Label>
        <Form.Control type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="glass-effect" />
      </Form.Group>
      <Form.Group controlId="dateFilter">
        <Form.Check type="checkbox" label="Date Filter" checked={dateFilter} onChange={(e) => setDateFilter(e.target.checked)} />
      </Form.Group>
      <Button variant="primary" onClick={handleFilter} className="mt-2">
        Filter
      </Button>
    </Form>
  );
};

export default MenuFilter;