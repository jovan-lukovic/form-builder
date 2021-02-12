import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { atom, useAtom } from "jotai";
import { Responsive as ResponsiveGridLayout, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import {
  useElements,
  useDeleteElement,
  useToggleElement,
  useInsertElement,
  useCreateForm,
  useToggleForm,
  useSelectedForm,
  useUpdateForm,
  useUpdateElements
} from '../hooks/redux';

import PreviewPanel from "./PreviewPanel";
import Elements from "./elements";
const ResponsiveReactGridLayout = WidthProvider(ResponsiveGridLayout);

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 0 20px',
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  buttonsWrapper: {
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'nowrap',

    '& button': {
      marginLeft: 15,
    }
  },
  body: {
    backgroundColor: '#fafafa',
    flex: 1,
    padding: '50px 30px',
    textAlign: 'left',
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
  },
  alert: {
    padding: 10,
    color: 'gray',
    margin: 0,
    fontSize: 17,
  },
  backButton: {
    width: 40,
    height: 40,

    '& i': {
      fontSize: 18,
    },
  }
});

const isOpenPreviewPanelAtom = atom(false);
const layoutsAtom = atom([]);

function MainViewer({ history }) {
  const classes = useStyles();
  const elements = useElements();
  const editElement = useToggleElement();
  const deleteElement = useDeleteElement();
  const updateElements = useUpdateElements();
  const toggleForm = useToggleForm();
  const createForm = useCreateForm();
  const selectedForm = useSelectedForm();
  const updateForm = useUpdateForm();
  const insertElement = useInsertElement();

  const [isOpenPreviewPanel, setIsOpenPreviewPanel] = useAtom(isOpenPreviewPanelAtom);

  const [layouts, setLayouts] = useAtom(layoutsAtom);

  useEffect(() => {
    updateElements(selectedForm ? selectedForm.elements : []);
  }, [selectedForm]);

  let elementCount = 0;
  useEffect(() => {
    if (elementCount !== elements.length) {
      setLayouts(elements.map(element => {
        return {
          x: 0,
          y: 0,
          w: 12,
          h: 1,
          i: element.id,
          static: false,
          isResizable: false,
        };
      }));
      elementCount = elements.length;
    }
  }, [elements]);

  const handleSave = () => {
    if (!selectedForm) {
      createForm(elements);
    } else {
      updateForm({
        id: selectedForm.id,
        elements
      });
    }

    toggleForm(null);
    history.push('/');
  };

  const handlePreview = () => {
    setIsOpenPreviewPanel(true);
  };

  const handleBack = () => {
    toggleForm(null);
    history.go(-1);
  };

  const onLayoutChange = (layout) => {
    const updatedElements = layout.sort((a, b) => a.y - b.y).map(item => {
      return elements.find(element => element.id === item.i);
    });

    updateElements(updatedElements);
  };

  return (
    <Box className={classes.container}>
      <IconButton className={classes.backButton} onClick={handleBack}>
        <i className='fa fa-reply'></i>
      </IconButton>
      <Box className={classes.header}>
        <h1>Form Builder</h1>
        <Box className={classes.buttonsWrapper}>
          <Button variant='contained'>Export</Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
          <Button variant='contained' onClick={handlePreview}>Preview</Button>
        </Box>
      </Box>

      <Box className={classes.body}>
        {
          elements.length > 0 ?
            <ResponsiveReactGridLayout
              layouts={{lg: layouts}}
              onLayoutChange={onLayoutChange}
              useCSSTransforms={Boolean(layouts)}
              measureBeforeMount={false}
              compactType={'vertical'}
            >
              {
                elements.map((item) => (
                  <div key={item.id}>
                    <Elements item={item} editElement={editElement} deleteElement={deleteElement} insertElement={insertElement} mutable={true} />
                  </div>
                ))
              }
            </ResponsiveReactGridLayout>
            :
            <p className={classes.alert}>Select an item from toolbox...</p>
        }
      </Box>

      <PreviewPanel isOpen={isOpenPreviewPanel} closePanel={() => setIsOpenPreviewPanel(false)} />
    </Box>
  );
}

MainViewer.propTypes = {
  history: PropTypes.object.isRequired,
};


export default MainViewer;
