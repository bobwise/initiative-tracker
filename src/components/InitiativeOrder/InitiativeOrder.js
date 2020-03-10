import React, { useState, useRef, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import InitiativeEntry from "../InitiativeEntry/InitiativeEntry";
import "./InitiativeOrder.scss";

var uniqueId = require("lodash.uniqueid");

const compareEntries = (a, b) => {
  let comparison = 0;
  let a_value = a.initiative;
  let b_value = b.initiative;

  if (a_value > b_value) {
    comparison = 1;
  } else if (b_value > a_value) {
    comparison = -1;
  } else {
    comparison = 0;
  }

  // reverse the array so the highest score is first
  return comparison * -1;
}
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const InitiativeOrder = (props) => {

  const nameInputRef = useRef(null);
  const initInputRef = useRef(null);

  const [allEntries, setAllEntries] = useState(props.initialEntries ? props.initialEntries : []);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [initiativeOrderMessage, setInitiativeOrderMessage] = useState("");

  const clearEntries = () => {
    setAllEntries([]);
    setInitiativeOrderMessage("The initiative order is empty");
  }
  const addEntry = () => {
    let newItems = [...allEntries];

    if (
      !isNaN(initInputRef.current.value) &&
      nameInputRef.current.value.trim() !== ""
    ) {

      newItems.push({
        name: nameInputRef.current.value.trim(),
        initiative: Number(initInputRef.current.value),
        id: parseInt(uniqueId()),
      });
    }

    newItems = newItems.sort(compareEntries);

    setInitiativeOrderMessage("Initiative Order is: " + newItems.map((item) => item.name));
    setAllEntries(newItems);
  }
  const killChild = (child) => {
    // delete all reference to child
    setAllEntries(allEntries.filter(e => e.id !== child));
  }
  const updateEntry = (id, propName, value) => {
    const newEntries = allEntries.map((item, index) => {
      if (item.id === id) {
        // this still feels like a hack
        if (propName === "initiative") {
          value = parseInt(value);

          if (isNaN(value)) {
            return {
              ...item,
              [propName]: 0
            };
          } else {
            return {
              ...item,
              [propName]: parseInt(value)
            };
          }
        }

        return {
          ...item,
          [propName]: value
        };
      } else {
        return item;
      }
    });

    setAllEntries(newEntries);
  }
  const handleKeyDown = (e) => {
    // TODO - I think keyCode is deprecated

    // ignore the arrow keys if focus is in the initiative entry field
    if (e.target.name === "init_val") {
      if (e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault();
      }
    }

    switch (e.keyCode) {
      case 13:

        if (e.target.name === "clearButton") {
          clearEntries();
        } else {
          addEntry();
        }

        nameInputRef.current.focus();
        break;
      case 37: //left
        break;
      case 38: //up
        if (focusedIndex > -1) {
          if (focusedIndex === 0) { nameInputRef.current.focus(); };
          setFocusedIndex(focusedIndex - 1);
        }
        break;
      case 39: //right
        break;
      case 40: //down
        if (focusedIndex < allEntries.length - 1) {
          setFocusedIndex(focusedIndex + 1);
        }
        break;
      default:
        break;
    }
  }
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allEntries,
      result.source.index,
      result.destination.index
    );

    setAllEntries(items);
    setInitiativeOrderMessage("Initiative Order is: " + items.map((item) => item.name));
  }
  useEffect(() => {
    nameInputRef.current.focus();
  }, []) // do it when it loads the first time
  useEffect(() => {
    nameInputRef.current.value = "";
    initInputRef.current.value = "";
  }, [allEntries]) // do it when allEntries changes

  return (
    <div className="initiative_order" onKeyDown={handleKeyDown}>
      <div className="form_container">
        <div className="field_container">
          <label htmlFor="char_name">Name</label>
          <input
            type="text"
            name="char_name"
            id="char_name"
            // value={this.state.newEntry.name}
            onClick={e => {
              e.target.select(); // highlight the value when I click in, don't just put the cursor
            }}
            // onChange={this.updateNewName}
            ref={nameInputRef}
          ></input>
        </div>
        <div className="field_container">
          <label htmlFor="init_val">Initiative</label>
          <input
            type="number"
            name="init_val"
            id="init_val"
            pattern="[0-9]*"
            // value={this.state.newEntry.initiative}
            onClick={e => {
              e.target.select();
            }}
            // onChange={this.updateNewInit}
            ref={initInputRef}
          ></input>
        </div>
        <button className='submitButton' onClick={() => { addEntry(); nameInputRef.current.focus(); }}>
          Add
        </button>
      </div>
      <div
        role="region"
        aria-live="polite"
        className="screen-reader-text"
        id="initiative_live"
      >
        {initiativeOrderMessage}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div className="entries"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {allEntries
                  .filter(x => {
                    return true;
                  })
                  .map((item, index) => {
                    return (
                      <InitiativeEntry
                        index={index}
                        isActive={index === focusedIndex}
                        displayNum={(index + 1).toString()}
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        initiative={item.initiative}
                        comments={item.comments}
                        onUpdate={updateEntry}
                        deleteCallback={killChild}
                      />
                    );
                  })}
              </ReactCSSTransitionGroup>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {allEntries.length > 0 && (
        <footer>
          <p>Drag and drop to adjust order.</p>
          <p className="hide-on-mobile"><kbd>Tab</kbd> and <kbd>Space</kbd> to select rows, <kbd>↑</kbd> and <kbd>↓</kbd> to move them.</p>
          <button className="clearButton" name="clearButton" onClick={clearEntries}>
            Clear
          </button>
        </footer>
      )}
    </div>
  )
}

export default InitiativeOrder;
