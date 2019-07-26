import React, { Component } from 'react';
import InitiativeEntry from './InitiativeEntry';
import PropTypes from 'prop-types';
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
    newItems.push({});

    this.setState({
      sortedItems: newItems
    });
  }

  updateEntry(id, propName, value){
    console.log("This entry: " + id);
    console.log("This field: " + propName);
    console.log("This new value: " + value);


    // const { sortedItems } = this.state;

    // set state to a new array that is identical to the old one except for the change


    // const index = this.state.sortedItems.findIndex(entry => entry.props.id === id);
    // const newEntries = [...this.state.sortedItems];

    // console.log("index of modified item " + index);
    // console.log(newEntries);

    // newEntries[index].props[propName] = value;
    // this.setState({sortedItems: newEntries});


    this.setState(state => {
      const sortedItems = state.sortedItems.map((item, index) => {
        if (item.id === id){

          console.log("Updating item at index: " + index);
          console.log("with id: " + id);
          console.log("Setting param: " + propName);
          console.log("To new value: " + value);

          return {
            ...item,
            [propName]: value,
          }
        } else {
          return item;
        }
      });

      console.log(sortedItems);

      return {
        sortedItems,
      }
    });

    // newItems.find(element => {
    //   return element.id === id;
    // }).propName = value;

    // this.setState({
    //   items: newItems
    // });
  }

  render() {
    const { sortedItems } = this.state;

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
