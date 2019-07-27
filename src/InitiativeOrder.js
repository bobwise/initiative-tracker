import React, { Component } from 'react';
import InitiativeEntry from './InitiativeEntry';
import PropTypes from 'prop-types';
var uniqueId = require('lodash.uniqueid');

// import './InitiativeOrder.css';

// initial entries are passed in as a prop
// initial entries are stored in state
// entries are rendered out as InitiativeEntry
// can be modified in state by modifying InitiativeEntry
// new ones can be added
// may periodically call up to App.js to save entries in local storage

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    this.addBlankEntry = this.addBlankEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);

    // add the initial entries to the array
    this.state = {
      sortedItems: props.initialEntries
    };
  }

  componentDidMount(){
    this.sortEntries();
  }

  componentDidUpdate(prevProps, prevState) {
    // this.sortEntries();
  }

  compareEntries(a, b){
    let comparison = 0;
    let a_value = a.initiativeRoll + a.modifier;
    let b_value = b.initiativeRoll + b.modifier;

    if (a_value > b_value){
      comparison = 1;
    } else if (b_value > a_value){
      comparison = -1;
    }

    return comparison * -1;
  }

  sortEntries(){
    const { sortedItems } = this.state;

    const newItems = [...sortedItems].sort(this.compareEntries);

    this.setState({
      sortedItems: newItems
    });
  }

  addBlankEntry(){
    const { sortedItems } = this.state;

    let newItems = [...sortedItems];
    newItems.push({
      id: parseInt(uniqueId()),
    });

    this.setState({
      sortedItems: newItems,
      // tells the child to after the state updates set focus on the new item
      focusNewItem: true,
    });
  }

  updateEntry(id, propName, value){
    this.setState(state => {
      const sortedItems = state.sortedItems.map((item, index) => {
        if (item.id === id){
          
          // this still feels like a hack
          if (propName === 'initiativeRoll' || propName === 'modifier') {
            
            // console.log(propName === 'modifier');
            value = parseInt(value);

            if (isNaN(value)) {
              return {
                ...item,
                [propName]: 0,
              }    
            } else {
              return {
                ...item,
                [propName]: parseInt(value),
              }
            }
          } 
          
          return {
            ...item,
            [propName]: value,
          }
        } else {
          return item;
        }
      }).sort(this.compareEntries);

      console.log(sortedItems);

      // const newItems = [...sortedItems].sort(this.compareEntries);

      return {
        sortedItems,
      }
    });
  }

  render() {
    const { sortedItems, focusNewItem } = this.state;

    return (
      <div className="initiative_order">
        Initiative
        <div className='controls'>
          <button>Autoroll</button>
          <button onClick={this.addBlankEntry}>Add Entry</button>
        </div>
        <div className='entries'>
          { sortedItems.map((item, index) => {
            return (
              <InitiativeEntry
                orderNum        = { index +   1 }
                id              = { item.id }
                key             = { item.id }
                name            = { item.name }
                initiativeRoll  = { item.initiativeRoll }
                modifier        = { item.modifier }
                comments        = { item.comments }
                shouldAutoRoll  = { item.shouldAutoRoll }
                onUpdate        = { this.updateEntry }
                focusMe         = { focusNewItem && (index === sortedItems.length - 1) }
              />
            )
          }) }
        </div>
      </div>
    );
  }
}

InitiativeOrder.propTypes = {
  initialEntries: PropTypes.array,
};

export default InitiativeOrder;
