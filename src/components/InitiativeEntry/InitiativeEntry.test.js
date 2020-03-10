import React from 'react';
import ReactDOM from 'react-dom';
import InitiativeEntry from './InitiativeEntry';

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  DragDropContext: ({ children }) => children,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <InitiativeEntry
      id="1231"
    />
    , div);
});

// tests
// the delete callback is called
// delete on container calls callback
// backspace on container calls callback
// delete on inputs does not call delete callback
// the update callback is called for each