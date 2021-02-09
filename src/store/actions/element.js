import * as actionTypes from "../actionTypes";

export const createElement = (element) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_ELEMENT,
    payload: element
  });
};

export const toggleElement = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_ELEMENT,
    payload: id
  });
}

export const deleteElement = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_ELEMENT,
    payload: id
  });
};

export const updateElements = (elements) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_ELEMENTS,
    payload: elements
  });
};

export const insertElement = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.INSERT_ELEMENT,
    payload: id
  });
};
