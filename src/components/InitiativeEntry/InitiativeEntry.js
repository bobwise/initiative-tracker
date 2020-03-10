import React, { useEffect } from "react"
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

  useEffect(() => {
    if (props.isActive) { 
      // this should be a ref, but we already have a framework ref
      // on that container for drag and drop.
      document.getElementById("itemContainer" + props.id).focus(); 
    }
  }, [props.isActive]) // do it when it loads the first time
  
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
            // initiative_entry__active: props.isActive,
            is_dragging: snapshot.isDragging
          })}
          onKeyDown={e => {
            if (
              e.target.id === "itemContainer" + props.id &&
              (e.keyCode === 46 || e.keyCode === 8)
            ) {
              props.deleteCallback(props.id);
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

export default InitiativeEntry;
