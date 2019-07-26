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
    this.updateEntry = this.updateEntry.bind(this);

    // add the initial entries to the array
    this.state = {
      // this is copying React Nodes. I think I want to convert those react nodes into just
      // JSON data at this point. Yet another problem with using React Components as a DTO.
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
        if (item.props.id === id){

          console.log("Updating item at index: " + index);
          console.log("with id: " + id);
          console.log("Setting param: " + propName);
          console.log("To new value: " + value);

          return {
            id: item.props.id,
            propName: value,
            ...item
          }
        } else {
          return item;
        }
      });

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
