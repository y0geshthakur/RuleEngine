const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');


// Create a rule
router.post('/create', async (req, res) => {
    const { ruleExpression, astStructure } = req.body;
    try {
        const newRule = new Rule({ ruleExpression, astStructure });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (err) {
        res.status(500).json({ message: 'Error creating rule', error: err });
    }
});


// Get all rules
router.get('/', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching rules', error: err });
    }
});


// Evaluate a rule
router.post('/evaluate', (req, res) => {
    const { userData, astStructure } = req.body;


    // Function to evaluate AST against user data
    const evaluateAST = (ast, data) => {
        if (ast.type === 'operator') {
            const leftEval = evaluateAST(ast.left, data);
            const rightEval = evaluateAST(ast.right, data);
            if (ast.operator === 'AND') return leftEval && rightEval;
            if (ast.operator === 'OR') return leftEval || rightEval;
        } else if (ast.type === 'operand') {
            return data[ast.key] === ast.value;
        }
        return false;
    };


    try {
        const result = evaluateAST(astStructure, userData);
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ message: 'Error evaluating rule', error: err });
    }
});


module.exports = router;