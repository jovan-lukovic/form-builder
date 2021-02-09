import * as actionsTypes from '../actionTypes';

export const createForm = (data) => (dispatch) => {
  dispatch({
    type: actionsTypes.CREATE_FORM,
    payload: data,
  });
};

export const toggleForm = (data) => (dispatch) => {
  dispatch({
    type: actionsTypes.TOGGLE_FORM,
    payload: data,
  });
};

export const updateForm = (data) => (dispatch) => {
  dispatch({
    type: actionsTypes.UPDATE_FORM,
    payload: data,
  });
};

export const deleteForm = (id) => (dispatch) => {
  dispatch({
    type: actionsTypes.DELETE_FORM,
    payload: id,
  });
};
