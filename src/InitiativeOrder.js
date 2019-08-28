import React, { Component } from "react";
import InitiativeEntry from "./InitiativeEntry";
import PropTypes from "prop-types";
import "./InitiativeOrder.css";
var uniqueId = require("lodash.uniqueid");

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    this.addBlankEntry = this.addBlankEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.killChild = this.killChild.bind(this);
    this.sortEntries = this.sortEntries.bind(this);

    this.state = {
      // give them ids if they don't have them
      allEntries: props.initialEntries ? props.initialEntries : [],
      initiativeOrder: [],
      needModifiers: [],
      needRerolls: [],
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
      console.log(a_value + " is greater than " + b_value);
      comparison = 1;
    } else if (b_value > a_value) {
      console.log(a_value + " is less than " + b_value);
      comparison = -1;
    } else {
      console.log(a_value + " is equal to " + b_value);
      comparison = 0;
    }
    // reverse the array
    return comparison * -1;
  }

  // go through initiativeOrder and pull out the conflicts
  sortEntries() {
    const { allEntries } = this.state;

    const sortedItems = [...allEntries].sort(this.compareEntries);

    const newInitiative = sortedItems.filter(x => { return !x.needsModifier && !x.needsRolls })
    const newNeedModifiers = sortedItems.filter(x => { return x.needsModifier });
    const newneedRerolls = sortedItems.filter(x => { return x.needRerolls });

    this.setState({
      initiativeOrder: newInitiative,
      needModifiers: newNeedModifiers,
      needRerolls: newneedRerolls,
    });
  }

  addBlankEntry() {
    const { allEntries } = this.state;

    // this should probably be moved somewhere else. entry section at top of screen?
    let newItems = [...allEntries];
    newItems.push({
      id: parseInt(uniqueId())
    });

    this.setState({
      allEntries: newItems,
      focusLastItem: true
    });
  }

  killChild(child) {
    console.log("kill child " + child);
    const { initiativeOrder } = this.state;

    // delete all reference to child
    let newItems = initiativeOrder.filter(e => e.id !== child);

    this.setState({
      initiativeOrder: newItems
      // set focus where???
    });
  }

  updateEntry(id, propName, value) {
    // console.log("updating " + propName + " to " + value);

    // this whole block is too clever for its own good
    this.setState(state => {
      const allEntries = state.allEntries.map((item, index) => {
        if (item.id === id) {
          // this still feels like a hack
          if (propName === "initiative" || propName === "modifier" || propName === "reroll") {
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
    const { initiativeOrder, needRerolls, needModifiers, focusLastItem } = this.state;

    return (
      <div className="">
        <div className="initiative_order">
          <h2>Initiative Order</h2>
          <div className="controls">
            {/* <button>Autoroll</button> */}
            <button onClick={this.addBlankEntry}>Add Entry</button>
          </div>
          <div className="header">
            <div className="header__number" />
            <div className="header__character">Character</div>
            <div className="header__initiative">Initiative</div>
          </div>
          <div className="entries">
            {/* there's a better way to write this */}
            { initiativeOrder.filter(x => { return true; }).map((item, index) => {
                return (
                  <InitiativeEntry
                    displayNum={index + 1}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    initiative={item.initiative}
                    comments={item.comments}
                    onUpdate={this.updateEntry}
                    deleteCallback={this.killChild}
                    triggerSortCallback={this.sortEntries}
                    focusMe={
                      focusLastItem && index === initiativeOrder.length - 1
                    }
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
