import React, { Component } from 'react';
import InitiativeOrder from './InitiativeOrder.js';
import './App.css';
import Divider from './Divider';

// on load, pull data from local storage
// needs controls for adding, saving, autorolling, etc
// App is responsible for storing all the raw data in
// a javascript array or something. Turns that into
// Entry components and outputs them. Not sorted here.

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      entries: [
        {
          id: 123,
          name: "Anya",
          initiative: 18,
        },
        {
          id: 234,
          name: "Wizowski",
          initiative: 15,
        },
        {
          id: 1233,
          name: "Milo",
          initiative: 15,
        },
        {
          id: 23444,
          name: "Shandri",
          initiative: 15,
        },
        {
          id: 2352334,
          name: "Raj",
          initiative: 12,
        },
        {
          id: 22333333352334,
          name: "Xhauk",
          initiative: 12,
        },
        {
          id: 223352334,
          name: "Kriv",
          initiative: 12,
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
        <h2>
            by Bobwise
        </h2>
        <Divider></Divider>
        <InitiativeOrder
          initialEntries = { entries }
        >
        </InitiativeOrder>

      </div>
    );
  }
}

export default App;
