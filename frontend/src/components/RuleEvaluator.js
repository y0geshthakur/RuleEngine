// src/components/RuleEvaluator.js


import React, { useState } from 'react';
import axios from 'axios';


function RuleEvaluator() {
  const [formData, setFormData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');


  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/evaluate', formData);
      setResult(response.data.result);
      setError('');
    } catch (error) {
      setError('Error evaluating rule');
      console.error(error);
    }
  };


  return (
    <div>
      <h2>Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div>
          <label>Experience:</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>
        <button type="submit">Evaluate</button>
      </form>
     
      {result !== null && (
        <div>
          <h3>Result: {result ? 'Eligible' : 'Not Eligible'}</h3>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}


export default RuleEvaluator;