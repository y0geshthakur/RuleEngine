// // src/App.js


// import React from 'react';
// import './App.css';
// import RuleForm from './components/RuleForm';
// import RuleEvaluator from './components/RuleEvaluator';


// function App() {
//   return (
//     <div className="App">
//       <h1>Rule Engine</h1>
//       <RuleForm />
//       <RuleEvaluator />
//     </div>
//   );
// }


// export default App;


















// src/App.js

import React from 'react';
import './App.css';
import RuleList from './components/RuleList'; // Rule list with create and delete functionality
import RuleEvaluator from './components/RuleEvaluator'; // Evaluate rules

function App() {
  return (
    <div className="App">
      <h1>Rule Engine</h1>
      <RuleList />      {/* Rule list is now at the top */}
      <RuleEvaluator />  {/* Evaluation component follows */}
    </div>
  );
}

export default App;

