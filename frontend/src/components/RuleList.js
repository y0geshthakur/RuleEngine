// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const RuleList = () => {
//     const [rules, setRules] = useState([]);


//     useEffect(() => {
//         const fetchRules = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5001/api/rules');
//                 setRules(response.data);
//             } catch (error) {
//                 console.error('Error fetching rules:', error);
//             }
//         };


//         fetchRules();
//     }, []);


//     return (
//         <div>
//             <h2>Rules List</h2>
//             <ul>
//                 {rules.map((rule) => (
//                     <li key={rule._id}>
//                         {rule.ruleExpression}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };


// export default RuleList;

















// src/components/RuleList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RuleList() {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');

  // Fetch rules from the backend
  const fetchRules = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  // Fetch rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  // Handle rule creation
  const handleAddRule = async () => {
    try {
      await axios.post('http://localhost:5001/api/rules', { rule: newRule });
      setNewRule(''); // Clear the input field
      fetchRules(); // Refresh the rules list
    } catch (error) {
      console.error('Error adding rule:', error);
    }
  };

  // Handle rule deletion
  const handleDeleteRule = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/rules/${id}`);
      fetchRules(); // Refresh the rules list
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  return (
    <div>
      <h2>Rules List</h2>
      <input
        type="text"
        placeholder="Enter new rule"
        value={newRule}
        onChange={(e) => setNewRule(e.target.value)}
      />
      <button onClick={handleAddRule}>Add Rule</button>

      <ul>
        {rules.map((rule) => (
          <li key={rule._id}>
            {rule.rule}
            <button onClick={() => handleDeleteRule(rule._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleList;
