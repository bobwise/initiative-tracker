import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InitiativeEntry from './InitiativeEntry';
// import './InitiativeOrder.css';

// responsible for sorting components
// components can be added by parent
// saves its state by calling up to
// the parent to trigger an interaction with local storage

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    // add the initial entries to the array
    this.state = {
      items: React.Children.map(this.props.children, item => ({
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
    const { items } = this.state;

    const newItems = [...items].sort(this.compareEntries);

    this.setState({
      items: newItems
    })
    // setState to new array
  }

  render() {
    const { children } = this.props;
    const { items } = this.state;

    return (
      <div className="initiative_order">
        Initiative
        <div class='controls'>
          <button>Autoroll</button>
          <button>Add Entry</button>
        </div>
        <div className='entries'>
          { items.map(item => {
            return (
              <InitiativeEntry
                {...item.props}
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
