import React, { Component } from 'react';
import InitiativeOrder from './InitiativeOrder.js';
import InitiativeEntry from './InitiativeEntry.js';
import './App.css';

// on load, pull data from local storage
// needs controls for adding, saving, autorolling, etc
// App is responsible for storing all the raw data in
// a javascript array or something. Turns that into
// Entry components and outputs them. Not sorted here.

class App extends Component {
  constructor(props) {
    super(props);

    // load these from local storage
    this.state={
      entries: [
        {
          id: 123,
          name: "Anya",
          initiativeRoll: 6,
          modifier: 2,
        },
        {
          id: 234,
          name: "Wizowski",
          initiativeRoll: 6,
          modifier: 3,
        },
        {
          id: 1233,
          name: "Milo",
          initiativeRoll: 6,
          modifier: 2,
        },
        {
          id: 23444,
          name: "Shandri",
          initiativeRoll: 4,
        },
        {
          id: 2352334,
          name: "Raj",
          initiativeRoll: 4,
        },
        {
          id: 22333333352334,
          name: "Xhauk",
          initiativeRoll: 18,
        },
        {
          id: 223352334,
          name: "Kriv",
          initiativeRoll: 20,
          modifier: 10,
        },
      ]
    }
  }

  render() {
    const { entries } = this.state;

    return (
      <div className="App">
        <h1>
          Initiative Tracker
        </h1>
        <InitiativeOrder 
          initialEntries = { entries } 
        >
        </InitiativeOrder>
        <div>
            by Bobwise
        </div>
      </div>
    );
  }
}

export default App;
