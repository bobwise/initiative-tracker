import React, { Component } from 'react';
import InitiativeOrder from '../InitiativeOrder/InitiativeOrder.js';
import './App.css';
import Divider from '../../assets/icons/Divider';

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

    //this.state={entries:[]};
  }

  render() {
    const { entries } = this.state;

    return (
      <div className="App">
        <div className="chat">
          <div className="yours messages">
            <div className="message last header">
              Let's roll for initiative!
            </div>
          </div>
        </div>
        <h1>
          Initiative Tracker
        </h1>
        <h2>
            by Bobwise
        </h2>
        <Divider></Divider>
        <div className="chat">
          <div className="yours messages">
            <div className="message last">
              Ok Sylphira, what's your initiative roll?
            </div>
          </div>
          <div className="mine messages">
            <div className="message last">
              17
            </div>
          </div>
        </div>
        <InitiativeOrder
          initialEntries = { entries }
        >
        </InitiativeOrder>

      </div>
    );
  }
}

export default App;
