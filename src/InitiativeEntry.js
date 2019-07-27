import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './InitiativeEntry.css';

// displays the entry
// needs state because it will eventually be a read/write situation
// sometimes it's in read mode, sometimes not
// if only one is ever in write mode, then the parent needs to track the currently active
// should Read/Write be separate components?

class InitiativeEntry extends Component{
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // pass the new value up to the parent?
    this.props.onUpdate(this.props.id, name, value);
  }

  componentDidMount() {
    if (this.props.focusMe) {
      console.log('applying focus to ' + this.nameRef.current.html);
      this.nameRef.current.select();
    }
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
          <input ref={this.nameRef} type='text' name='name' value={name} onChange={this.handleInputChange}/>
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
  // whether or not to include on an Autoroll
  shouldAutoroll: PropTypes.bool,
  // just text to display.
  // Things like "slowed" or "death saving" "on fire" etc
  comments: PropTypes.string,
  orderNum: PropTypes.number,
  onUpdate: PropTypes.func,
  // if true, this component will attempt to apply focus 
  // to the first input in the form after it renders
  focusMe: PropTypes.bool,
};

InitiativeEntry.defaultProps = {
  shouldAutoroll: false,
  initiativeRoll: 0,
  modifier: 0,
  name: "Character Name",
  orderNum: 1,
}

export default InitiativeEntry;
