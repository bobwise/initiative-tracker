import React from 'react';
import PropTypes from 'prop-types';
// import './InitiativeEntry.css';

function InitiativeEntry(props) {
  const {
    name,
    modifier,
    initiativeRoll,
    shouldAutoroll,
    comments,
    orderNum,
   } = props;

  return (
    <div className="initiative_entry">
      <span class='orderNumber'>{orderNum}</span>
      <span class='name'>
        <input type='text' value={name} />
      </span>
      <span class='modifier'>
        <input type='text' value={modifier} />
      </span>
      <span class='initiative'>
        <input type='text' value={initiativeRoll} />
      </span>
      <span class='shouldAutoroll'>
        <input type='checkbox' checked={shouldAutoroll} />
      </span>
      <span class='comments'>
        <input type='text' value={comments} />
      </span>
    </div>
  );
}

InitiativeEntry.propTypes = {
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
};

InitiativeEntry.defaultProps = {
  shouldAutoroll: false,
  modifier: 0,
  name: "Character Name",
  orderNum: 1,
}

export default InitiativeEntry;
