import React from 'react';
import InitiativeEntry from './InitiativeEntry';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
  shallow(<InitiativeEntry id="1231"/>);
});

it('calls the delete callback when the icon is clicked', () => {
  const mockDeleteCallback = jest.fn();
  
  const wrapper = mount(<InitiativeEntry id="1231" deleteCallback={mockDeleteCallback} />);
  wrapper.find('.deleteIcon').simulate('click');
  expect(mockDeleteCallback.mock.calls.length).toEqual(1);
});

it('calls the delete callback when delete is pressed on the container', () => {
  const mockDeleteCallback = jest.fn();
  
  const wrapper = mount(<InitiativeEntry id="1231" deleteCallback={mockDeleteCallback} />);
  wrapper.find('.initiative_entry').simulate('keydown', {keyCode: 46});
  expect(mockDeleteCallback.mock.calls.length).toEqual(1);
});

it('calls the delete callback when backspace is pressed on the container', () => {
  const mockDeleteCallback = jest.fn();
  
  const wrapper = mount(<InitiativeEntry id="1231" deleteCallback={mockDeleteCallback} />);
  wrapper.find('.initiative_entry').simulate('keydown', {keyCode: 8});
  expect(mockDeleteCallback.mock.calls.length).toEqual(1);
});

it('does not call the delete callback when pressing delete in an input', () => {
  const mockDeleteCallback = jest.fn();
  
  const wrapper = mount(<InitiativeEntry id="1231" deleteCallback={mockDeleteCallback} />);
  wrapper.find('input[name="name"]').simulate('keydown', {keyCode: 8});
  expect(mockDeleteCallback.mock.calls.length).toEqual(0);
});

it('calls the update function correctly for name', () => {
  const mockUpdateCallback = jest.fn();
  const event = {target: {name: "name", value: "a"}};

  const wrapper = mount(<InitiativeEntry id="1231" onUpdate={mockUpdateCallback} />);
  
  wrapper.find('input').filterWhere((item) => {
    return item.prop('name') === "name";
  }).simulate('change', event);

  expect(mockUpdateCallback.mock.calls.length).toEqual(1);
  expect(mockUpdateCallback.mock.calls[0][0]).toBe("1231");
  expect(mockUpdateCallback.mock.calls[0][1]).toBe("name");
  expect(mockUpdateCallback.mock.calls[0][2]).toBe("a");
});

it('calls the update function correctly for initiative', () => {
  const mockUpdateCallback = jest.fn();
  const event = {target: {name: "initiative", value: 12}};

  const wrapper = mount(<InitiativeEntry id="1231" onUpdate={mockUpdateCallback} />);
  
  wrapper.find('input').filterWhere((item) => {
    return item.prop('name') === "initiative";
  }).simulate('change', event);

  expect(mockUpdateCallback.mock.calls.length).toEqual(1);
  expect(mockUpdateCallback.mock.calls[0][0]).toBe("1231");
  expect(mockUpdateCallback.mock.calls[0][1]).toBe("initiative");
  expect(mockUpdateCallback.mock.calls[0][2]).toBe(12);
});

// the update callback is called for each input