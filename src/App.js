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
          modifier: 1,
          initiativeRoll: 6,
          shouldAutoroll: false,
          comments: 'on fire',
        },
        {
          id: 234,
          name: "Wizowski",
          modifier: 2,
          initiativeRoll: 8,
          shouldAutoroll: true,
          comments: 'death saving throw',
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
        <InitiativeOrder initialEntries = { entries } >
        </InitiativeOrder>
        <div>
            by Bobwise
        </div>
      </div>
    );
  }
}

export default App;
