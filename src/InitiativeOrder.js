import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InitiativeEntry from './InitiativeEntry';
// import './InitiativeOrder.css';

class InitiativeOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: React.Children.map(this.props.children, item => ({
        ...item,
      })),
    };
  }

  // in didMount and didUpdate, resort the items

  render() {
    const { children } = this.props;
    const { items } = this.state;

    return (
      <div className="initiative_order">
        I am an Initiative Order
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
