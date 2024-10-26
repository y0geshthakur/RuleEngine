// // backend/app.js


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');


// // Initialize the app
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());


// // Connect to MongoDB
// mongoose.connect('mongodb+srv://yogeshThakur:yogeshRuleEngine@ruleengine.djc9x.mongodb.net/?retryWrites=true&w=majority&appName=RuleEngine', { useNewUrlParser: true, useUnifiedTopology: true });


// // Define a schema for rules
// const ruleSchema = new mongoose.Schema({
//   rule: String,
// });


// const Rule = mongoose.model('Rule', ruleSchema);


// // Utility function to parse a rule string into an AST format (placeholder)
// function parseRuleToAST(ruleString) {
//   // For simplicity, create a basic AST manually or extend this with a parsing function.
//   return {
//     type: 'operator',
//     operator: 'AND',
//     left: { type: 'operand', field: 'age', operator: '>', value: 30 },
//     right: {
//       type: 'operator',
//       operator: 'OR',
//       left: { type: 'operand', field: 'department', operator: '=', value: 'Sales' },
//       right: { type: 'operand', field: 'experience', operator: '>', value: 5 }
//     }
//   };
// }


// // Utility function to evaluate the AST with user data
// function evaluateRuleAST(node, userAttributes) {
//   if (node.type === 'operand') {
//     const { field, operator, value } = node;
//     const userValue = userAttributes[field];


//     switch (operator) {
//       case '>': return userValue > value;
//       case '<': return userValue < value;
//       case '=': return userValue === value;
//       default: return false;
//     }
//   } else if (node.type === 'operator') {
//     const leftResult = evaluateRuleAST(node.left, userAttributes);
//     const rightResult = evaluateRuleAST(node.right, userAttributes);


//     switch (node.operator) {
//       case 'AND': return leftResult && rightResult;
//       case 'OR': return leftResult || rightResult;
//       default: return false;
//     }
//   }
// }


// // API endpoint to create a rule
// app.post('/api/rules', async (req, res) => {
//   const { rule } = req.body;


//   const newRule = new Rule({ rule });
//   await newRule.save();
//   res.status(201).send('Rule created successfully');
// });


// // API endpoint to evaluate a rule
// app.post('/api/evaluate', async (req, res) => {
//   try {
//     // Extract user attributes from the request body
//     const userAttributes = req.body;


//     // Retrieve the rule to evaluate
//     const ruleDoc = await Rule.findOne(); // Adjust to select specific rules as needed


//     if (!ruleDoc) {
//       return res.status(404).json({ message: 'Rule not found' });
//     }


//     // Parse the rule to an AST
//     const ruleAST = parseRuleToAST(ruleDoc.rule);


//     // Evaluate the AST with user-provided attributes
//     const result = evaluateRuleAST(ruleAST, userAttributes);


//     res.json({ result });
//   } catch (error) {
//     console.error('Error evaluating rule:', error);
//     res.status(500).json({ message: 'Error evaluating rule' });
//   }
// });


// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


















// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://yogeshThakur:yogeshRuleEngine@ruleengine.djc9x.mongodb.net/?retryWrites=true&w=majority&appName=RuleEngine', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for rules
const ruleSchema = new mongoose.Schema({
  rule: String,
});

const Rule = mongoose.model('Rule', ruleSchema);

// Utility function to parse a rule string into an AST format (placeholder)
function parseRuleToAST(ruleString) {
  return {
    type: 'operator',
    operator: 'AND',
    left: { type: 'operand', field: 'age', operator: '>', value: 30 },
    right: {
      type: 'operator',
      operator: 'OR',
      left: { type: 'operand', field: 'department', operator: '=', value: 'Sales' },
      right: { type: 'operand', field: 'experience', operator: '>', value: 5 }
    }
  };
}

// Utility function to evaluate the AST with user data
function evaluateRuleAST(node, userAttributes) {
  if (node.type === 'operand') {
    const { field, operator, value } = node;
    const userValue = userAttributes[field];
    switch (operator) {
      case '>': return userValue > value;
      case '<': return userValue < value;
      case '=': return userValue === value;
      default: return false;
    }
  } else if (node.type === 'operator') {
    const leftResult = evaluateRuleAST(node.left, userAttributes);
    const rightResult = evaluateRuleAST(node.right, userAttributes);
    switch (node.operator) {
      case 'AND': return leftResult && rightResult;
      case 'OR': return leftResult || rightResult;
      default: return false;
    }
  }
}

// API endpoint to create a rule
app.post('/api/rules', async (req, res) => {
  const { rule } = req.body;
  const newRule = new Rule({ rule });
  await newRule.save();
  res.status(201).send('Rule created successfully');
});

// API endpoint to evaluate a rule
app.post('/api/evaluate', async (req, res) => {
  try {
    const userAttributes = req.body;
    const ruleDoc = await Rule.findOne(); // Adjust to select specific rules as needed

    if (!ruleDoc) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    const ruleAST = parseRuleToAST(ruleDoc.rule);
    const result = evaluateRuleAST(ruleAST, userAttributes);
    res.json({ result });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(500).json({ message: 'Error evaluating rule' });
  }
});

// API endpoint to retrieve all rules
app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find(); // Retrieve all rules
    res.json(rules);
  } catch (error) {
    res.status(500).send('Error fetching rules');
  }
});

// API endpoint to delete a specific rule by ID
app.delete('/api/rules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Rule.findByIdAndDelete(id); // Delete rule by ID
    res.status(200).send('Rule deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting rule');
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});