import React from 'react';
import ReactDOM from 'react-dom';
import InitiativeOrder from './InitiativeOrder';
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
  shallow(<InitiativeOrder />);
});

it('doesnt choke to death on data', () => {
  mount(
    <InitiativeOrder initialEntries={[
      {
        id: 123,
        name: "Anya",
        initiative: 18
      },
    ]}/>
  )
})

it('clears the list when clicking clear', () => {
  // const wrapper = mount(
  //   <InitiativeOrder initialEntries={[
  //     {
  //       id: 123,
  //       name: "Anya",
  //       initiative: 18
  //     },
  //     {
  //       id: 2123,
  //       name: "Biff",
  //       initiative: 12
  //     },
  //   ]}/>
  // )

  // expect(wrapper.find(".initiative_entry").length).toEqual(2);
  // expect(wrapper.find(".clearButton").length).toEqual(1);
  // wrapper.find(".clearButton").simulate('click');
  // wrapper.setProps();
  // wrapper.update();
  // expect(wrapper.find(".initiative_entry").length).toEqual(0);
})

// clicking add causes an item to be added