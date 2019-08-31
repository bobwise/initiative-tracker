import React, { Component } from "react";
import InitiativeEntry from "./InitiativeEntry";
import PropTypes from "prop-types";
import "./InitiativeOrder.css";
var uniqueId = require("lodash.uniqueid");

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    this.addEntry = this.addEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.killChild = this.killChild.bind(this);
    this.sortEntries = this.sortEntries.bind(this);
    this.updateNewEntry = this.updateNewEntry.bind(this);

    this.state = {
      // give them ids if they don't have them
      allEntries: props.initialEntries ? props.initialEntries : [],
      initiativeOrder: [],
      newEntry: {  }
    };
  }

  componentDidMount() {
    this.sortEntries();
  }

  compareEntries(a, b) {
    let comparison = 0;
    let a_value = a.initiative;
    let b_value = b.initiative;

    if (a_value > b_value) {
      // console.log(a_value + " is greater than " + b_value);
      comparison = 1;
    } else if (b_value > a_value) {
      // console.log(a_value + " is less than " + b_value);
      comparison = -1;
    } else {
      // console.log(a_value + " is equal to " + b_value);
      comparison = 0;
    }
    // reverse the array
    return comparison * -1;
  }

  // go through initiativeOrder and pull out the conflicts
  sortEntries() {
    const { allEntries } = this.state;

    const sortedItems = [...allEntries].sort(this.compareEntries);

    const newInitiative = sortedItems;

    this.setState({
      initiativeOrder: newInitiative,
    });
  }

  addEntry() {
    const { allEntries } = this.state;

    if (!isNaN(this.state.newEntry.initiative)){
      let newItems = [...allEntries];

      const newEntry = this.state.newEntry;
      newEntry.id = parseInt(uniqueId());

      newItems.push(newEntry);
  
      this.setState({
        allEntries: newItems,
        newEntry: {
          name: '',
          initiative: 0,
         },
      }, () => { this.sortEntries(); });
    }
  }

  killChild(child) {
    const { initiativeOrder, allEntries } = this.state;

    // delete all reference to child
    let newInitiativeOrder = initiativeOrder.filter(e => e.id !== child);
    let newAllEntries = allEntries.filter(e => e.id !== child);

    this.setState({
      initiativeOrder: newInitiativeOrder,
      allEntries: newAllEntries,
    });
  }

  updateNewEntry(id, propName, value) {
    const { newEntry } = this.state;

    if (propName === "initiative") {
      value = parseInt(value);

      if (isNaN(value)) {
        newEntry.initiative = 0;
      } else {
        newEntry.initiative = parseInt(value);
      }
    } else if (propName === "name"){
      newEntry.name = value;
    }

    this.setState({ newEntry });
  }

  updateEntry(id, propName, value) {
    this.setState(state => {
      const allEntries = state.allEntries.map((item, index) => {
        if (item.id === id) {
          // this still feels like a hack
          if (propName === "initiative") {
            value = parseInt(value);

            if (isNaN(value)) {
              return {
                ...item,
                [propName]: 0
              };
            } else {
              return {
                ...item,
                [propName]: parseInt(value)
              };
            }
          }

          return {
            ...item,
            [propName]: value
          };
        } else {
          return item;
        }
      });

      return {
        allEntries
      };
    }
      , () => { this.sortEntries(); }
    );
  }

  render() {
    const { 
      initiativeOrder, 
    } = this.state;

    return (
      <div className="">
        <div className="initiative_order">
          <div className="controls">
            {/* <button>Autoroll</button> */}
            {/* <button onClick={this.addBlankEntry}>Add Entry</button> */}
          </div>
          
          <div className="input">
            <InitiativeEntry
              name={this.state.newEntry.name}
              initiative={this.state.newEntry.initiative}
              onUpdate={this.updateNewEntry}
              triggerSortCallback={this.addEntry}
              focusMe={ this.state.newEntry.name === '' }
            />
          </div>
          
          <div className="header">
            <div className="header__number" />
            <div className="header__action" />
            <div className="header__character">Character</div>
            <div className="header__initiative">Initiative</div>
          </div>
          <div className="entries">
            {initiativeOrder.filter(x => { return true; }).map((item, index) => {
              return (
                <InitiativeEntry
                  displayNum={(index + 1).toString()}
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  initiative={item.initiative}
                  comments={item.comments}
                  onUpdate={this.updateEntry}
                  deleteCallback={this.killChild}
                  triggerSortCallback={this.sortEntries}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

InitiativeOrder.propTypes = {
  initialEntries: PropTypes.array
};

export default InitiativeOrder;
