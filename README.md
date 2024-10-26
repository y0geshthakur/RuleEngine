# Rule Engine Application

## Introduction
The Rule Engine is a 3-tier application that allows users to create, manage, and evaluate rules based on attributes such as age, department, income, and experience. It uses Abstract Syntax Trees (AST) to represent rules, enabling dynamic rule creation and evaluation.

## Project Structure
```
RuleEngine/
├── backend/
│   ├── node_modules/                # Contains all npm packages
│   ├── package.json                  # Backend dependencies and scripts
│   ├── index.js                      # Main entry point for the backend
│   ├── app.js                        # Express app configuration and API routes
│   ├── models/                       # Directory for Mongoose models
│   │   └── Rule.js                  # Mongoose schema for the Rule model
│   ├── controllers/                  # Directory for controller functions
│   │   └── ruleController.js         # Contains functions for rule operations
│   └── utils/                        # Utility functions
│       ├── astUtils.js               # AST parsing and evaluation functions
│       └── dbUtils.js                # Database utility functions (optional)
│
└── frontend/
    ├── node_modules/                 # Contains all npm packages for frontend
    ├── package.json                   # Frontend dependencies and scripts
    ├── public/
    │   ├── index.html                # Main HTML file
    │   └── favicon.ico                # Application icon
    │
    └── src/
        ├── components/                # React components
        │   ├── RuleForm.js            # Component to create rules
        │   ├── RuleEvaluator.js        # Component to evaluate rules
        │   └── RuleList.js             # Component to display existing rules
        │
        ├── App.js                     # Main application component
        ├── index.js                   # Entry point for the React application
        ├── App.css                    # Global styles for the application
        └── services/                  # API service functions
            └── ruleService.js         # Functions for making API requests related to rules

```

## Setup Instructions

### Backend Setup
1. **Create the Backend Directory**:
   ```bash
   mkdir backend
   cd backend
   ```

2. **Initialize a New Node.js Project**:
   ```bash
   npm init -y
   ```

3. **Install Required Dependencies**:
   ```bash
   npm install express mongodb mongoose body-parser cors
   ```

### Frontend Setup
1. **Create the Frontend Directory**:
   ```bash
   cd ..
   mkdir frontend
   cd frontend
   ```

2. **Create a New React Application**:
   ```bash
   npx create-react-app .
   ```

3. **Install Required Dependencies**:
   ```bash
   npm install axios ajv ajv-keywords bootstrap
   ```

### MongoDB Setup
1. **Create a MongoDB Atlas Cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and set up a database.

2. **Update MongoDB Connection String**:
   - In the backend directory, update the connection string in `index.js`:
     ```javascript
     mongoose.connect('your_mongodb_atlas_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
     ```

## Running the Application
1. **Start the Backend Server**:
   ```bash
   cd backend
   node index.js
   ```

2. **Start the Frontend Application**:
   ```bash
   cd frontend
   npm start
   ```

## Conclusion
You now have a fully functional Rule Engine application that allows for dynamic rule creation and evaluation. Enjoy using your new tool!

--- 
