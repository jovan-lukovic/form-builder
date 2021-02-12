import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import { Responsive as ResponsiveGridLayout, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { atom, useAtom } from "jotai";

import { useCreateElement } from "../hooks/redux";

// components
import ToolboxItem from "./TooboxItem";

const ResponsiveReactGridLayout = WidthProvider(ResponsiveGridLayout);

export const defaultComponents = [
  {
    key: 'Header',
    name: 'Header Text',
    icon: 'fa fa-heading',
    content: 'Placeholder Text...'
  },
  {
    key: 'Label',
    name: 'Label',
    icon: 'fa fa-font',
    content: 'Placeholder Text...'
  },
  {
    key: 'Paragraph',
    name: 'Paragraph',
    icon: 'fa fa-paragraph',
    content: 'Placeholder Text...'
  },
  {
    key: 'LineBreak',
    name: 'LineBreak Break',
    icon: 'fa fa-arrows-alt-h'
  },
  {
    key: 'Dropdown',
    name: 'Dropdown',
    icon: 'fa fa-caret-square-down',
    label: 'Placeholder Label',
    field_name: 'dropdown_',
    default_value: '',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'Tags',
    name: 'Tags',
    icon: 'fa fa-tags',
    label: 'Placeholder Label',
    field_name: 'tags_',
    default_value: [],
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'Checkboxes',
    name: 'Checkboxes',
    icon: 'fa fa-check-square',
    label: 'Placeholder Label',
    field_name: 'checkboxes_',
    default_value: [],
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'RadioButtons',
    name: 'Multiple Choice',
    icon: 'fa fa-dot-circle',
    label: 'Placeholder Label',
    field_name: 'radio_buttons_',
    default_value: '',
    options: [
      { text: 'option 1', value: 1 },
      { text: 'option 2', value: 2 },
      { text: 'option 3', value: 3 },
    ]
  },
  {
    key: 'TextInput',
    name: 'Text Input',
    label: 'Placeholder Label',
    icon: 'fa fa-font',
    field_name: 'text_input_',
    default_value: '',
  },
  {
    key: 'NumberInput',
    name: 'Number Input',
    label: 'Placeholder Label',
    icon: 'fa fa-plus',
    field_name: 'number_input_',
    default_value: '',
  },
  {
    key: 'TextArea',
    name: 'Multi-line Input',
    label: 'Placeholder Label',
    icon: 'fa fa-text-height',
    field_name: 'text_area_',
    default_value: '',
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
    name: 'Rating',
    label: 'Placeholder Label',
    icon: 'fa fa-star',
    field_name: 'rating_',
    default_value: '',
  },
  {
    key: 'DatePicker',
    canDefaultToday: true,
    name: 'Date',
    icon: 'fa fa-calendar',
    label: 'Placeholder Label',
    field_name: 'date_picker_',
    default_value: new Date(),
  },
  {
    key: 'Signature',
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
    content: 'Placeholder Web site link ...',
    href: 'http://www.example.com'
  },
  {
    key: 'Download',
    name: 'File Attachment',
    icon: 'fa fa-file',
    content: 'Placeholder file name ...',
    field_name: 'download_',
    file_path: '',
    href: ''
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
    field_name: 'camera_',
    img_src: ''
  }
];

const layoutsAtom = atom([]);

const useStyles = makeStyles({
  container: {
    padding: '30px 0 20px',
    marginLeft: 30,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    '@media(max-width: 991px)': {
      width: '100%',
      marginLeft: 0,
    },
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
  const [layouts, setLayouts] = useAtom(layoutsAtom);

  useEffect(() => {
    setLayouts(defaultComponents.map(component => {
      return {
        x: 0,
        y: 0,
        w: 12,
        h: 0.45,
        i: component.key,
        static: false,
        isResizable: false,
      }
    }));
  }, [defaultComponents]);

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <h1>Toolbox</h1>
      </Box>
      <Box className={classes.body}>
        <ResponsiveReactGridLayout
          layouts={{lg: layouts}}
          useCSSTransforms={Boolean(layouts)}
          measureBeforeMount={false}
          compactType={'vertical'}
          preventCollision={false}
        >
          {
            defaultComponents.map(item => (
              <div key={item.key}>
                <ToolboxItem data={item} onClick={() => createElement({...item})}/>
              </div>
            ))
          }
        </ResponsiveReactGridLayout>
      </Box>
    </Box>
  );
}

export default Toolbox;
