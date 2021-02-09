import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { ContentState, EditorState, convertToRaw,  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { atom, useAtom } from 'jotai';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { defaultComponents } from './Toobox';
import { useSelectedElement, useUpdateElements, useToggleElement, useElements } from '../hooks/redux';

const useStyles = makeStyles({
  swipeableDrawer: {
    '& .MuiDrawer-paperAnchorRight': {
      minHeight: 600,
      maxHeight: '80%',
      height: 'unset',
      top: '10%',
      right: '10%',
    },
  },
  viewer: {
    width: 800,
    flex: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
  editor: {
    height: 120,
    padding: '0px 10px',
  },
  footer: {
    '& button': {
      marginRight: 10,
    },
  },
  options: {
    padding: '20px 10px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    '& input': {
      display: 'block',
      height: 34,
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: 1.4,
      marginRight: 10,
      border: '1px solid #ccc',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
      transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    },
    '& .actions': {
      '& button': {
        marginLeft: 10,
      },
    },
  },
  columns: {
    padding: '0 15px',
    flex: 1,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& span': {
      fontSize: 16,
    },
    '& button': {
      marginLeft: 15,
    }
  },
  formControl: {
    minWidth: 150,
    marginLeft: 10,
    marginRight: 30,
    '& label': {
      backgroundColor: '#fff',
      padding: '0 10px',
    }
  }
});

const isOpenEditDrawerAtom = atom(false);
const activeComponentNoAtom = atom(null);
const editorStateAtom = atom(EditorState.createEmpty());
const changeEditorStateAtom = atom(
  get => get(editorStateAtom),
  (get, set, newState) => set(editorStateAtom, newState),
);
const optionsAtom = atom([]);
const columnsAtom = atom([]);

function EditDrawer() {
  const classes = useStyles();
  const selectedElement = useSelectedElement();
  const toggleElement = useToggleElement();
  const updateElements = useUpdateElements();
  const elements = useElements();

  const [openState, setOpenState] = useAtom(isOpenEditDrawerAtom);
  const [editorState, setEditorState] = useAtom(changeEditorStateAtom);
  const [options, setOptions] = useAtom(optionsAtom);
  const [activeComponentNo, setActiveComponentNo] = useAtom(activeComponentNoAtom);
  const [columns, setColumns] = useAtom(columnsAtom);

  useEffect(() => {
    setOpenState(!!selectedElement);
    if (!!selectedElement) {
      setActiveComponentNo(null);
      setColumns(selectedElement.components);
    }
  }, [selectedElement]);

  useEffect(() => {
    if (activeComponentNo > -1 && columns[activeComponentNo]) {
      let text;
      if (columns[activeComponentNo].hasOwnProperty('content')) {
        text = columns[activeComponentNo].content;
      } else if (columns[activeComponentNo].hasOwnProperty('label')) {
        text = columns[activeComponentNo].label;
      }

      setEditorState(
        EditorState.push(
          editorState,
          ContentState.createFromBlockArray(
            htmlToDraft(text || ''),
          ),
        ),
      );
      if (columns[activeComponentNo].hasOwnProperty('options')) {
        setOptions(columns[activeComponentNo].options);
      } else {
        setOptions(null);
      }
    }
  }, [activeComponentNo]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!open) {
      toggleElement(null);
    }
  };

  const handleDone = () => {
    if (activeComponentNo !== null && activeComponentNo > -1) {
      setColumns(columns.map((column, index) => {
        if (index === activeComponentNo) {
          if (column.hasOwnProperty('content')) {
            column.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
          } else if (column.hasOwnProperty('label')) {
            column.label = draftToHtml(convertToRaw(editorState.getCurrentContent()));
          }

          if (column.hasOwnProperty('options')) {
            column.options = options;
          }
        }
        return column;
      }));
      setActiveComponentNo(null);
    } else {
      const updatedElements = [...elements].map(item => {
        if (item.id === selectedElement.id) {
          item.components = columns;
        }
        return item;
      });

      updateElements(updatedElements);
      toggleElement(null);
    }
  };

  const addOption = (index) => {
    setOptions([...options.slice(0, index + 1), {text: '', value: ''}, ...options.slice(index + 1, options.length)]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  }

  const handleOptionTextChange = (e, index) => {
    setOptions(options.map((option, i) => {
      if (index === i) {
        option.text = e.target.value;
      }
      return option;
    }));
  };

  const handleOptionValueChange = (e, index) => {
    setOptions(options.map((option, i) => {
      if (index === i) {
        option.value = e.target.value;
      }
      return option;
    }));
  };

  const addColumn = (index) => {
    setColumns([...columns.slice(0, index + 1), undefined, ...columns.slice(index + 1, columns.length)]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => index !== i));
  };

  const editColumn = (index) => {
    setActiveComponentNo(index);
  };

  const selectColumnType = (e, index) => {
    setColumns(columns.map((column, i) => {
      if (i === index) {
        column = e.target.value;
      }
      return column;
    }));
  }

  return (
    <div>
      <SwipeableDrawer
        anchor={'right'}
        open={openState}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        className={classes.swipeableDrawer}
      >
        {selectedElement &&
        <div
          className={classes.viewer}
          role='presentation'
        >
          {(!activeComponentNo && activeComponentNo !== 0) ?
            <div className={classes.columns}>
              <h1>Columns</h1>
              {
                columns.map((column, index) => (
                  <div key={index} className={classes.column}>
                    <span>Column {index + 1}:</span>
                    <FormControl variant='outlined' className={classes.formControl}>
                      <InputLabel id='column-type-select-label'>Type</InputLabel>
                      <Select
                        labelId='column-type-select-label'
                        id='column-type-select'
                        value={column}
                        onChange={(e) => selectColumnType(e, index)}
                        renderValue={(value) => value.name}
                      >
                        {
                          defaultComponents.map(component => (
                            <MenuItem key={component.key} value={component}>{component.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <IconButton variant='contained' onClick={() => addColumn(index)}><AddIcon/></IconButton>
                    {index !== 0 &&
                    <IconButton variant='contained' onClick={() => removeColumn(index)}><RemoveIcon/></IconButton>}
                    {column &&
                    <IconButton variant='contained' onClick={() => editColumn(index)}><EditIcon/></IconButton>}
                  </div>
                ))
              }
            </div>
            :
            <>
              <div className={classes.heading}>
                <h1>{columns[activeComponentNo]?.name} Editor</h1>
              </div>
              <div className={classes.content}>
                <label>Label:</label>
                <Editor
                  editorState={editorState}
                  editorClassName={classes.editor}
                  onEditorStateChange={(es) => setEditorState(es)}
                />
                {
                  options &&
                  <div className={classes.options}>
                    <h3>Options</h3>
                    {
                      options.map((option, index) => (
                        <div key={index} className={classes.option}>
                          <input type='text' placeholder='Option text' value={option.text}
                                 onChange={(e) => handleOptionTextChange(e, index)}/>
                          <input type='text' value={option.value} onChange={(e) => handleOptionValueChange(e, index)}/>
                          <div className='actions'>
                            <IconButton onClick={() => addOption(index)}><AddIcon/></IconButton>
                            {index !== 0 && <IconButton onClick={() => removeOption(index)}><RemoveIcon/></IconButton>}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                }
              </div>
            </>
          }
          <div className={classes.footer}>
            <Button onClick={toggleDrawer(false)}>CANCEL</Button>
            <Button onClick={handleDone}>DONE</Button>
          </div>
        </div>
        }
      </SwipeableDrawer>
    </div>
  );
}

export default EditDrawer;
