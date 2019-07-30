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

    this.state = {
      // give them ids if they don't have them
      initiativeOrder: props.initialEntries ? props.initialEntries : [],
      rollConflicts: [],
      modifierConflicts: []
    };
  }

  componentDidMount() {
    this.sortEntries();
  }

  compareEntries(a, b) {
    let comparison = 0;
    let a_value = a.initiativeRoll + a.modifier;
    let b_value = b.initiativeRoll + b.modifier;

    if (a_value > b_value) {
      console.log(a_value + " is greater than " + b_value);
      comparison = 1;
    } else if (b_value > a_value) {
      console.log(a_value + " is less than " + b_value);
      comparison = -1;
    }

    // console.log(a_value + " is greater than " + b_value);
    return comparison;
  }

  // go through initiativeOrder and pull out the conflicts
  sortEntries() {
    const { initiativeOrder } = this.state;

    const newItems = [...initiativeOrder].sort(this.compareEntries);

    this.setState({
      initiativeOrder: newItems
    });
  }

  addBlankEntry() {
    const { initiativeOrder } = this.state;

    let newItems = [...initiativeOrder];
    newItems.push({
      id: parseInt(uniqueId())
    });

    this.setState({
      initiativeOrder: newItems,
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
      const initiativeOrder = state.initiativeOrder.map((item, index) => {
        if (item.id === id) {
          // this still feels like a hack
          if (propName === "initiativeRoll" || propName === "modifier") {
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
      }); //.sort(this.compareEntries);

      // const newItems = [...initiativeOrder].sort(this.compareEntries);

      return {
        initiativeOrder
      };
    });
  }

  render() {
    const { initiativeOrder, rollConflicts, modifierConflicts, focusLastItem } = this.state;

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
            <div className="header__roll">D20 Roll</div>
            <div className="header__modifier">Modifier</div>
            <div className="header__initiative">Initiative</div>
          </div>
          <div className="entries">
            {/* there's a better way to write this */}
            {initiativeOrder.length > 0 &&
              initiativeOrder.map((item, index) => {
                return (
                  <InitiativeEntry
                    orderNum={index + 1}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    initiativeRoll={item.initiativeRoll}
                    modifier={item.modifier}
                    comments={item.comments}
                    shouldAutoRoll={item.shouldAutoRoll}
                    onUpdate={this.updateEntry}
                    deleteCallback={this.killChild}
                    focusMe={
                      focusLastItem && index === initiativeOrder.length - 1
                    }
                  />
                );
              })}
          </div>
        </div>
        <div className="need_modifiers">
          <h2>Need Modifiers</h2>
          <div className="header">
            <div className="header__number" />
            <div className="header__character">Character</div>
            <div className="header__roll">D20 Roll</div>
            <div className="header__modifier">Modifier</div>
            <div className="header__initiative">Initiative</div>
          </div>
          <div className="entries">
            {/* there's a better way to write this */}
            {rollConflicts.length > 0 &&
              rollConflicts.map((item, index) => {
                return (
                  <InitiativeEntry
                    orderNum={index + 1}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    initiativeRoll={item.initiativeRoll}
                    modifier={item.modifier}
                    comments={item.comments}
                    shouldAutoRoll={item.shouldAutoRoll}
                    onUpdate={this.updateEntry}
                    deleteCallback={this.killChild}
                  />
                );
              })}
          </div>
        </div>
        <div className="need_rerolls">
          <h2>Need Rerolls</h2>
          <div className="header">
            <div className="header__number" />
            <div className="header__character">Character</div>
            <div className="header__roll">D20 Roll</div>
            <div className="header__modifier">Modifier</div>
            <div className="header__initiative">Initiative</div>
          </div>
          <div className="entries">
            {/* there's a better way to write this */}
            {modifierConflicts.length > 0 &&
              modifierConflicts.map((item, index) => {
                return (
                  <InitiativeEntry
                    orderNum={index + 1}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    initiativeRoll={item.initiativeRoll}
                    modifier={item.modifier}
                    comments={item.comments}
                    shouldAutoRoll={item.shouldAutoRoll}
                    onUpdate={this.updateEntry}
                    deleteCallback={this.killChild}
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
