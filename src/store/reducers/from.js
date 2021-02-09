import * as actionTypes from '../actionTypes';
import ID from '../../utils/UUID';

const INITIAL_STATE = {
  selectedForm: null,
  forms: [
    {
      id: "B54D7786-34A1-48C7-9CCE-D623F84A2A2E",
      elements: [
        {
          id: "4F0E901A-AFBB-4C56-A01F-F12F8645E177",
          components: [
            {
              content: '<p style="text-align:center;">Heading</p>',
              icon: "fa fa-heading",
              key: "Header",
              name: "Header Text",
              static: true,
            },
          ]
        },
        {
          id: "74D9DB5E-D99D-4085-A2FE-839BCB36675B",
          components: [
            {
              content: "<p>Label</p>",
              icon: "fa fa-font",
              key: "Label",
              name: "Label",
              static: true,
            },
          ]
        },
        {
          id: "7D473ED9-61F7-46F4-8C7E-6C3F5E3D2AA9",
          components: [
            {
              content: "<p>Paragraph</p>",
              icon: "fa fa-paragraph",
              key: "Paragraph",
              name: "Paragraph",
              static: true,
            },
          ]
        }
      ]
    },
    {
      id: "57360517-CEB6-45DA-8588-1A6DE5E46EDF",
      elements: [
        {
          id: "7D473ED9-61F7-46F4-8C7E-6C3F5E3D2AA9",
          components: [
            {
              content: "Placeholder Text...",
              icon: "fa fa-heading",
              key: "Header",
              name: "Header Text",
              static: true,
            },
          ]
        },
        {
          id: "A5A805CE-2EAE-4270-A1E3-9FE1A410F304",
          components: [
            {
              content: "Placeholder Text...",
              icon: "fa fa-font",
              key: "Label",
              name: "Label",
              static: true,
            },
          ]
        },
        {
          id: "BEC27836-240F-457F-854C-5A12AC6F56D4",
          components: [
            {
              content: "Placeholder Text...",
              icon: "fa fa-font",
              key: "Label",
              name: "Label",
              static: true,
            },
          ]
        }
      ]
    }
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_FORM:
      return {
        ...state,
        forms: [
          ...state.forms,
          {
            id: ID.uuid(),
            elements: action.payload
          }
        ]
      };

    case actionTypes.TOGGLE_FORM:
      return {
        ...state,
        selectedForm: action.payload
      };

    case actionTypes.UPDATE_FORM:
      return {
        ...state,
        forms: state.forms.map(form => {
          if (form.id === action.payload.id) {
            return action.payload;
          }
          return form;
        })
      };

    case actionTypes.DELETE_FORM:
      return {
        ...state,
        forms: state.forms.filter(form => form.id !== action.payload)
      };

    default:
      return state;
  }
}
