import React from 'react';
import InitiativeOrder from './InitiativeOrder.js';
import InitiativeEntry from './InitiativeEntry.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          I am an Initiative Tracker by Bobwise
        </p>
        <InitiativeOrder>
          <InitiativeEntry
            name='Anya'
            modifier={1}
            initiativeRoll={15}
            shouldAutoroll={false}
            comments='on fire'
            ></InitiativeEntry>
        </InitiativeOrder>
      </header>
    </div>
  );
}

export default App;
