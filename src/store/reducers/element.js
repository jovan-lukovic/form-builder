import * as actionTypes from '../actionTypes';
import ID from '../../utils/UUID';

const INITIAL_STATE = {
  elements: [],
  selectedElement: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ELEMENT:
      return {
        ...state,
        elements: [
          ...state.elements,
          {
            id: ID.uuid(),
            components: [action.payload]
          }
        ]
      };

    case actionTypes.DELETE_ELEMENT:
      return {
        ...state,
        elements: state.elements.filter(element => element.id !== action.payload)
      };

    case actionTypes.TOGGLE_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload ? state.elements.find(element => element.id === action.payload) : null,
      };

    case actionTypes.UPDATE_ELEMENTS:
      return {
        ...state,
        elements: action.payload
      };

    case actionTypes.UPDATE_ELEMENT:
      const elements = state.elements.map(element => {
        if (element.id === action.payload.id) {
          element = action.payload.element;
        }
        return element;
      });
      return {
        ...state,
        elements
      };

    case actionTypes.INSERT_ELEMENT:
      const index = state.elements.findIndex(element => element.id === action.payload.id);
      const newElements = [
        ...state.elements.slice(0, index + 1),
        {
          id: ID.uuid(),
          components: [action.payload.component]
        },
        ...state.elements.slice(index + 1, state.elements.length)
      ];
      return {
        ...state,
        elements: newElements
      };

    default:
      return state;
  }
};
