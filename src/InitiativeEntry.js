import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from './DeleteIcon';

import './InitiativeEntry.css';

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
      // console.log('applying focus to ' + this.nameRef.current.html);
      this.nameRef.current.select();
    }
  }

  render() {
    const {
      id,
      name,
      initiative,
      comments,
      displayNum,
      deleteCallback,
      triggerSortCallback,
    } = this.props;

    return (
      <div className="initiative_entry">
        <div>
          <div className='displayNumber'>{displayNum}</div>
          <div className='actions'>
            {/* call up to my parent and tell them to kill me */}
            <div className='deleteIcon' onClick={ () =>  { deleteCallback(id); } }>
              <DeleteIcon />
            </div>
          </div>
          <div className='name'>
            <input ref={this.nameRef} type='text' name='name' value={name}
              onClick={(e) => {e.target.select();}}
              onChange={this.handleInputChange}/>
          </div>
          <div className='initiative_roll'>
            <input type='text' name='initiative' value={initiative}
              onClick={(e) => {e.target.select();}} onChange={this.handleInputChange}
              onBlur={triggerSortCallback}/>
          </div>
        </div>
        {/* <div className='comments'>
          <textarea rows={1} type='text' name='comments' value={comments} onChange={this.handleInputChange} />
        </div> */}
      </div>
    );
  }
}

InitiativeEntry.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  initiative: PropTypes.number,
  tiebreakerOrder: PropTypes.number,
  // just text to display.
  // Things like "slowed" or "death saving" "on fire" etc
  comments: PropTypes.string,
  // visible number to display
  displayNum: PropTypes.number,
  onUpdate: PropTypes.func,
  // if true, this component will attempt to apply focus 
  // to the first input in the form after it renders
  focusMe: PropTypes.bool,
  deleteCallback: PropTypes.func,
  triggerSortCallback: PropTypes.func,
};

InitiativeEntry.defaultProps = {
  initiative: 0,
  name: "Character Name",
  displayNum: 1,
  deleteCallback: () => {},
}

export default InitiativeEntry;
