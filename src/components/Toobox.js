import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

import { useCreateElement } from "../hooks/redux";

// components
import ToolboxItem from "./TooboxItem";

export const defaultComponents = [
  {
    key: 'Header',
    name: 'Header Text',
    icon: 'fa fa-heading',
    static: true,
    content: 'Placeholder Text...'
  },
  {
    key: 'Label',
    name: 'Label',
    static: true,
    icon: 'fa fa-font',
    content: 'Placeholder Text...'
  },
  {
    key: 'Paragraph',
    name: 'Paragraph',
    static: true,
    icon: 'fa fa-paragraph',
    content: 'Placeholder Text...'
  },
  {
    key: 'LineBreak',
    name: 'LineBreak Break',
    static: true,
    icon: 'fa fa-arrows-alt-h'
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Dropdown',
    icon: 'fa fa-caret-square-down',
    label: 'Placeholder Label',
    field_name: 'dropdown_',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'Tags',
    canHaveAnswer: true,
    name: 'Tags',
    icon: 'fa fa-tags',
    label: 'Placeholder Label',
    field_name: 'tags_',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'Checkboxes',
    canHaveAnswer: true,
    name: 'Checkboxes',
    icon: 'fa fa-check-square',
    label: 'Placeholder Label',
    field_name: 'checkboxes_',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'RadioButtons',
    canHaveAnswer: true,
    name: 'Multiple Choice',
    icon: 'fa fa-dot-circle',
    label: 'Placeholder Label',
    field_name: 'radio_buttons_',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    name: 'Text Input',
    label: 'Placeholder Label',
    icon: 'fa fa-font',
    field_name: 'text_input_'
  },
  {
    key: 'NumberInput',
    canHaveAnswer: true,
    name: 'Number Input',
    label: 'Placeholder Label',
    icon: 'fa fa-plus',
    field_name: 'number_input_'
  },
  {
    key: 'TextArea',
    canHaveAnswer: true,
    name: 'Multi-line Input',
    label: 'Placeholder Label',
    icon: 'fa fa-text-height',
    field_name: 'text_area_'
  },
  {
    key: 'Image',
    name: 'Image',
    label: '',
    icon: 'fa fa-image',
    field_name: 'image_',
    src: ''
  },
  {
    key: 'Rating',
    canHaveAnswer: true,
    name: 'Rating',
    label: 'Placeholder Label',
    icon: 'fa fa-star',
    field_name: 'rating_'
  },
  {
    key: 'DatePicker',
    canDefaultToday: true,
    canReadOnly: true,
    name: 'Date',
    icon: 'fa fa-calendar',
    label: 'Placeholder Label',
    field_name: 'date_picker_'
  },
  {
    key: 'Signature',
    canReadOnly: true,
    name: 'Signature',
    icon: 'fa fa-signature',
    label: 'Signature',
    field_name: 'signature_',
    default_value: '',
  },
  {
    key: 'HyperLink',
    name: 'Web site',
    icon: 'fa fa-link',
    static: true,
    content: 'Placeholder Web site link ...',
    href: 'http://www.example.com'
  },
  {
    key: 'Download',
    name: 'File Attachment',
    icon: 'fa fa-file',
    static: true,
    content: 'Placeholder file name ...',
    field_name: 'download_',
    file_path: '',
    _href: ''
  },
  {
    key: 'Range',
    name: 'Range',
    icon: 'fa fa-sliders-h',
    label: 'Placeholder Label',
    field_name: 'range_',
    step: 1,
    default_value: 3,
    min_value: 1,
    max_value: 5,
    min_label: 'Easy',
    max_label: 'Difficult'
  },
  {
    key: 'Camera',
    name: 'Camera',
    icon: 'fa fa-camera',
    label: 'Placeholder Label',
    field_name: 'camera_'
  }
];

const useStyles = makeStyles({
  container: {
    padding: '30px 0 20px',
    marginLeft: 30,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 5,
  },
  body: {
    flex: 1,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 3px rgba(0,0,0,0.1)',
      backgroundColor: '#F5F5F5',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#cccccc',
      border: '1px solid #dddddd',
      borderRadius: 4,
    },
  }
});

function Toolbox() {

  const classes = useStyles();
  const createElement = useCreateElement();

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <h1>Toolbox</h1>
      </Box>
      <Box className={classes.body}>
        {
          defaultComponents.map(item => (
            <ToolboxItem key={item.key} data={item} onClick={() => createElement({...item})} />
          ))
        }
      </Box>
    </Box>
  );
}

export default Toolbox;
