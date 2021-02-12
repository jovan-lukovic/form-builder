import { useSelector, useDispatch } from "react-redux";

import { createElement, toggleElement, updateElements, deleteElement, insertElement } from "../../store/actions/element";
import { createForm, toggleForm, deleteForm, updateForm } from "../../store/actions/form";

export const useCreateElement = () => {
  const dispatch = useDispatch();
  return (element) => dispatch(createElement(element));
};

export const useUpdateElements = () => {
  const dispatch = useDispatch();
  return (elements) => dispatch(updateElements(elements));
};

export const useDeleteElement = () => {
  const dispatch = useDispatch();
  return (id) => dispatch(deleteElement(id));
};

export const useToggleElement = () => {
  const dispatch = useDispatch();
  return (id) => dispatch(toggleElement(id));
};

export const useInsertElement = () => {
  const dispatch = useDispatch();
  return (id, component) => dispatch(insertElement(id, component));
};

export const useElements = () => useSelector(({
  element: { elements }
}) => elements);

export const useSelectedElement = () => useSelector(({
  element: { selectedElement }
}) => selectedElement);

export const useCreateForm = () => {
  const dispatch = useDispatch();
  return (data) => dispatch(createForm(data));
};

export const useToggleForm = () => {
  const dispatch = useDispatch();
  return (data) => dispatch(toggleForm(data));
};

export const useDeleteForm = () => {
  const dispatch = useDispatch();
  return (id) => dispatch(deleteForm(id));
};

export const useUpdateForm = () => {
  const dispatch = useDispatch();
  return (data) => dispatch(updateForm(data));
};

export const useForms = () => useSelector(({
  form: { forms }
}) => forms);

export const useSelectedForm = () => useSelector(({
  form: { selectedForm }
}) => selectedForm);
