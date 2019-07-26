import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './InitiativeEntry.css';

// displays the entry
// button to trigger a reroll that calls up
// to the parent somehow

class InitiativeEntry extends Component{
  constructor(props) {
    super(props);

    // this.state = props;

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // pass the new value up to the parent?
    this.props.onUpdate(this.props.id, name, value);

    // this.setState({
    //   [name]: value
    // });
  }

  render() {
    const {
      name,
      modifier,
      initiativeRoll,
      shouldAutoroll,
      comments,
      orderNum,
    } = this.props;

    return (
      <div className="initiative_entry">
        <span className='orderNumber'>{orderNum}</span>
        <span className='name'>
          <input type='text' name='name' value={name} onChange={this.handleInputChange}/>
        </span>
        <span className='initiative_roll'>
          <input type='text' name='initiativeRoll' value={initiativeRoll} onChange={this.handleInputChange}/>
        </span>
        <span className='modifier'>
          <input type='text' name='modifier' value={modifier} onChange={this.handleInputChange}/>
        </span>
        <span className='initative'>
          {initiativeRoll + modifier}
        </span>
        <span className='shouldAutoroll'>
          <input type='checkbox' name='shouldAutoroll' onChange={this.handleInputChange} checked={shouldAutoroll} />
        </span>
        <span className='comments'>
          <input type='text' name='comments' value={comments} onChange={this.handleInputChange} />
        </span>
      </div>
    );
  }
}

InitiativeEntry.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  // make sure this works with negatives
  modifier: PropTypes.number,
  // actual value is stored in state
  // if modifier not available, this is assumed
  // to be the state value
  initiativeRoll: PropTypes.number,
  shouldAutoroll: PropTypes.bool,
  // just text to display.
  // Things like "slowed" or "death saving" "on fire" etc
  comments: PropTypes.string,
  orderNum: PropTypes.number,
  onUpdate: PropTypes.func,
};

InitiativeEntry.defaultProps = {
  shouldAutoroll: false,
  modifier: 0,
  name: "Character Name",
  orderNum: 1,
}

export default InitiativeEntry;
