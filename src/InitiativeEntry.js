import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from './DeleteIcon';

import './InitiativeEntry.css';

class InitiativeEntry extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // pass the new value up to the parent
    this.props.onUpdate(this.props.id, name, value);
  }

  render() {
    const {
      id,
      name,
      initiative,
      deleteCallback,
      triggerSortCallback,
    } = this.props;

    return (
      <div className="initiative_entry">
        <div className='actions'>
          {/* call up to my parent and tell them to kill me */}
          {deleteCallback && <div className='deleteIcon' onClick={() => { deleteCallback(id); }}>
            <DeleteIcon />
          </div>}
        </div>
        <div className='name'>
          <input ref={this.nameRef} type='text' name='name' value={name}
            onClick={(e) => { e.target.select(); }}
            onChange={this.handleInputChange} />
        </div>
        <div className='initiative_roll'>
          <input type='text' name='initiative' value={initiative}
            onClick={(e) => { e.target.select(); }} onChange={this.handleInputChange}
            onBlur={() => {
              triggerSortCallback();
            }} />
        </div>
      </div>
    );
  }
}

InitiativeEntry.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  initiative: PropTypes.number,
  tiebreakerOrder: PropTypes.number,
  onUpdate: PropTypes.func,
  deleteCallback: PropTypes.func,
  triggerSortCallback: PropTypes.func,
};

InitiativeEntry.defaultProps = {
}

export default InitiativeEntry;
