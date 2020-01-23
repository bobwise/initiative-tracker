import React, { Component } from "react";
import InitiativeOrder from "../InitiativeOrder/InitiativeOrder.js";
import ChatLog from "../ChatLog/ChatLog";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./App.scss";
import Divider from "../../assets/icons/Divider";

class App extends Component {
  constructor(props) {
    super(props);

    this.hideTips = this.hideTips.bind(this);

    let entries = [];

    entries = [
      {
        id: 123,
        name: "Anya",
        initiative: 18
      },
      {
        id: 234,
        name: "Wizowski",
        initiative: 15
      },
      {
        id: 1233,
        name: "Milo",
        initiative: 15
      },
      {
        id: 23444,
        name: "Shandri",
        initiative: 15
      },
      {
        id: 2352334,
        name: "Raj",
        initiative: 12
      },
      {
        id: 22333333352334,
        name: "Xhauk",
        initiative: 12
      },
      {
        id: 223352334,
        name: "Kriv",
        initiative: 12
      }
    ]

    entries = [];

    this.state = {
      entries: entries,
      tipsVisible: true,
    };
  }

  hideTips() {
    this.setState({ tipsVisible: false });
  }

  render() {
    const { entries } = this.state;

    return (
      <div className="App">
        <h1>Initiative Tracker</h1>
        <Divider />
        <InitiativeOrder
          initialEntries={entries}
          hideTipsCallback={this.hideTips}
        ></InitiativeOrder>
        {/* <a className="rulesLink" href="https://www.dndbeyond.com/sources/basic-rules/combat#Initiative">How does <strong>initiative</strong> work again?</a> */}
        <footer>
          <h2>by Bobwise</h2>
        </footer>
      </div>
    );
  }
}

export default App;
