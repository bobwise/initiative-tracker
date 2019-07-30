import React, { Component } from 'react';
import InitiativeEntry from './InitiativeEntry';
import PropTypes from 'prop-types';
import './InitiativeOrder.css';
var uniqueId = require('lodash.uniqueid');

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
    this.killChild = this.killChild.bind(this);

    // add the initial entries to the array
    this.state = {
      sortedItems: props.initialEntries ? props.initialEntries : []
    };
  }

  componentDidMount(){
    this.sortEntries();
  }

  // deprecated
  componentDidUpdate(prevProps, prevState) {
    // this.sortEntries();
  }

  compareEntries(a, b){
    let comparison = 0;
    let a_value = a.initiativeRoll + a.modifier;
    let b_value = b.initiativeRoll + b.modifier;

    if (a_value > b_value){
      console.log(a_value + " is greater than " + b_value);
      comparison = 1;
    } else if (b_value > a_value){
      console.log(a_value + " is less than " + b_value);
      comparison = -1;
    }

    // console.log(a_value + " is greater than " + b_value);
    return comparison;
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
      focusLastItem: true,
    });
  }

  killChild(child) {
    console.log('kill child ' + child);
    const { sortedItems } = this.state;
    
    // delete all reference to child
    let newItems = sortedItems.filter(e => e.id !== child);

    this.setState({
      sortedItems: newItems,
      // set focus where???
    });
  }

  updateEntry(id, propName, value){
    // console.log("updating " + propName + " to " + value);
    
    // this whole block is too clever for its own good
    this.setState(state => {
      const sortedItems = state.sortedItems.map((item, index) => {
        if (item.id === id){
          
          // this still feels like a hack
          if (propName === 'initiativeRoll' || propName === 'modifier') {
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
      });//.sort(this.compareEntries);

      // const newItems = [...sortedItems].sort(this.compareEntries);

      return {
        sortedItems,
      }
    });
  }

  render() {
    const { sortedItems, focusLastItem } = this.state;

    return (
      <div className="initiative_order">
        <div className='header'>
          <div className='header__number'></div>
          <div className='header__character'>Character</div>
          <div className='header__roll'>D20 Roll</div>
          <div className='header__modifier'>Modifier</div>
          <div className='header__initiative'>Initiative</div>
        </div>
        <div className='entries'>
          {/* there's a better way to write this */}
          { sortedItems.length > 0 && sortedItems.map((item, index) => {
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
                deleteCallback  = { this.killChild }
                focusMe         = { focusLastItem && (index === sortedItems.length - 1) }
              />
            )
          }) }
        </div>
        <div className='controls'>
          {/* <button>Autoroll</button> */}
          <button onClick={this.addBlankEntry}>Add Entry</button>
        </div>
      </div>
    );
  }
}

InitiativeOrder.propTypes = {
  initialEntries: PropTypes.array,
};

export default InitiativeOrder;
