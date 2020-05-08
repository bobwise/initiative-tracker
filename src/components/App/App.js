import React from "react";
import InitiativeOrder from "../InitiativeOrder/InitiativeOrder.js";
import "./App.scss";

const App = (props) => {

  let entries = [
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

  // Comment this line to include test data
  // entries = [];

  return (
    <>
      <div className="App">
        <h1>Initiative Tracker</h1>
        <hr aria-hidden="true"/>
        <InitiativeOrder
          initialEntries={entries}
        ></InitiativeOrder>
      </div>
      <footer className='siteFooter'>
        <p><span aria-hidden="true">by</span> <a aria-label="Made by Bobwise, with love." href="http://twitter.com/bobwise/">Bobwise</a></p>
      </footer>
    </>
  );
}

export default App;
