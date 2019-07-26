import React, { Component } from 'react';
import InitiativeEntry from './InitiativeEntry';
// import './InitiativeOrder.css';

// responsible for sorting components
// components can be added by parent
// saves its state by calling up to
// the parent to trigger an interaction with local storage

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    this.addBlankEntry = this.addBlankEntry.bind(this);

    // add the initial entries to the array
    this.state = {
      sortedItems: React.Children.map(this.props.children, item => ({
        ...item,
      })),
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
    let a_value = a.props.initiativeRoll + a.props.modifier;
    let b_value = b.props.initiativeRoll + b.props.modifier;

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
    console.log(id);
    console.log(propName);
    console.log(value);

    const { sortedItems } = this.state;

    // set state to a new array that is identical to the old one except for the change

    this.setState(state => {
      const items = state.sortedItems.map((item, index) => {
        if (item.id === id){
          return {
            id: item.id,
            propName: value,
            ...item
          }
        } else {
          return item;
        }
      });

      return {
        items,
      }
    })

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
                {...item.props}
                key={item.id}
                onUpdate={this.updateEntry}
              />
            )
          }) }
        </div>
      </div>
    );
  }
}

InitiativeOrder.propTypes = {
  // entries are children, not props
};

export default InitiativeOrder;
