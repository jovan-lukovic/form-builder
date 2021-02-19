import React, { useEffect, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import { defaultComponents } from "./Toobox";
import MenuItem from "@material-ui/core/MenuItem";
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
  useUpdateElements,
  useCreateElement
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
    display: 'flex',
    flexWrap: 'nowrap',
    flex: 1,
    justifyContent: 'flex-end',

    '& button': {
      marginBottom: 10,
      marginLeft: 15,
      '@media(max-width: 576px)': {
        '&:first-child': {
          marginLeft: 0,
        },
        marginLeft: 10,
      },
      '@media(max-width: 420px)': {
        marginLeft: 7,
      },
    }
  },
  body: {
    backgroundColor: '#fafafa',
    flex: 1,
    display: 'flex',
    textAlign: 'left',
    overflow: 'hidden',
    position: 'relative',
  },
  componentPanel: {
    flex: 1,
    overflow: 'auto',
    padding: '50px 30px',

    '@media(max-width: 992px)': {
      padding: '30px 10px',
    },

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
  addButton: {
    marginBottom: 10,
    whiteSpace: 'nowrap',
    '@media(min-width: 992px)': {
      display: 'none',
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
  },
  dropdownMenu: {
    '& .MuiPaper-root': {
      width: '100%',
    },
  }
});

const isOpenPreviewPanelAtom = atom(false);
const layoutsAtom = atom([]);
const anchorElAtom = atom(null);
const isMobileAtom = atom(false);

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
  const createElement = useCreateElement();

  const [isOpenPreviewPanel, setIsOpenPreviewPanel] = useAtom(isOpenPreviewPanelAtom);
  const [layouts, setLayouts] = useAtom(layoutsAtom);
  const [anchorEl, setAnchorEl] = useAtom(anchorElAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

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

  const handleCreate = (component) => {
    setAnchorEl(null);
    createElement(component);
  };

  return (
    <Box className={classes.container}>
      <IconButton className={classes.backButton} onClick={handleBack}>
        <i className='fa fa-reply'></i>
      </IconButton>
      <Box className={classes.header}>
        <h1>Form Builder</h1>
        <Box className={classes.buttonsWrapper}>
          <Button className={classes.addButton} variant='contained' onClick={(e) => setAnchorEl(e.currentTarget)}>
            Add
          </Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
          <Button variant='contained' onClick={handlePreview}>Preview</Button>
        </Box>
      </Box>

      <Box className={classes.body}>
        <Menu
          className={classes.dropdownMenu}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {
            defaultComponents.map(component => (
              <MenuItem key={component.key} onClick={() => handleCreate(component)}>
                {component.name}
              </MenuItem>
            ))
          }
        </Menu>
        <div className={classes.componentPanel}>
          {
            elements.length > 0 ?
              <>
                {!isMobile ?
                  <ResponsiveReactGridLayout
                    layouts={{lg: layouts}}
                    rowHeight={190}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    onLayoutChange={onLayoutChange}
                    useCSSTransforms={Boolean(layouts)}
                    measureBeforeMount={false}
                    compactType={'vertical'}
                  >
                    {
                      elements.map((item) => (
                        <div key={item.id}>
                          <Elements item={item} editElement={editElement} deleteElement={deleteElement}
                                    insertElement={insertElement} mutable={true}/>
                        </div>
                      ))
                    }
                  </ResponsiveReactGridLayout>
                  :
                  <div>
                    {
                      elements.map((item) => (
                        <div key={item.id}>
                          <Elements item={item} editElement={editElement} deleteElement={deleteElement}
                                    insertElement={insertElement} mutable={true}/>
                        </div>
                      ))
                    }
                  </div>
                }
              </>
              :
              <p className={classes.alert}>Select an item from toolbox...</p>
          }
        </div>
      </Box>

      <PreviewPanel isOpen={isOpenPreviewPanel} closePanel={() => setIsOpenPreviewPanel(false)}/>
    </Box>
  );
}

MainViewer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MainViewer;
