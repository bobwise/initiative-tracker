import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "../../assets/icons/Delete";
import HamburgerIcon from "../../assets/icons/Hamburger";
import { Draggable } from "react-beautiful-dnd";
import "./InitiativeEntry.scss";
import classNames from "classnames";

const InitiativeEntry = (props) => {
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    // pass the new value up to the parent
    props.onUpdate(props.id, name, value);
  }

  return (
    <Draggable
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          id={"itemContainer" + props.id}
          className={classNames({
            initiative_entry: true,
            initiative_entry__active: props.isActive,
            is_dragging: snapshot.isDragging
          })}
          onKeyDown={e => {
            if (
              e.target.id === "itemContainer" + props.id &&
              (e.keyCode === 46 || e.keyCode === 8)
            ) {
              props.deleteCallback(props.id);
              // TODO - put focus on the new item with the same index as me
              // browser is dropping it in roughly the right location. If I
              // press tab once it's in the right spot. Can I use that?
            }
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className="grabber hamburgerIcon"
            {...provided.dragHandleProps}
            tabIndex={-1}
          >
            <HamburgerIcon></HamburgerIcon>
          </div>
          <div className="name">
            <input
              type="text"
              name="name"
              aria-label="Name"
              value={props.name}
              onClick={e => {
                e.target.select();
              }}
              onChange={handleInputChange}
            />
          </div>
          <div className="initiative_roll">
            <input
              type="text"
              name="initiative"
              pattern="[0-9]*"
              aria-label="Initiative"
              value={props.initiative}
              onClick={e => {
                e.target.select();
              }}
              onChange={handleInputChange}
              onBlur={() => {
                props.triggerSortCallback();
              }}
            />
          </div>
          <div className="actions">
            {/* call up to my parent and tell them to kill me */}
            {props.deleteCallback && (
              <div
                className="deleteIcon"
                onClick={() => {
                  props.deleteCallback(props.id);
                }}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

InitiativeEntry.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  initiative: PropTypes.number,
  tiebreakerOrder: PropTypes.number,
  isActive: PropTypes.bool,
  onUpdate: PropTypes.func,
  deleteCallback: PropTypes.func,
  triggerSortCallback: PropTypes.func
};

InitiativeEntry.defaultProps = {};

export default InitiativeEntry;
