import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { ContentState, EditorState, convertToRaw,  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { atom, useAtom } from 'jotai';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useSelectedElement, useUpdateElements, useToggleElement, useElements } from '../../hooks/redux';
import ColumnsPanel from './ColumnsPanel';
import EditorPanel from './EditerPanel';

const useStyles = makeStyles({
  swipeableDrawer: {
    '& .MuiDrawer-paperAnchorRight': {
      minHeight: 500,
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
  footer: {
    marginTop: 30,
    '& button': {
      marginRight: 10,
    },
  },
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
const srcAtom = atom('');
const widthAtom = atom(0);
const heightAtom = atom(0);
const stepAtom = atom(0);
const minValueAtom = atom(0);
const maxValueAtom = atom(0);
const minLabelAtom = atom('');
const maxLabelAtom = atom('');
const defaultValueAtom = atom('');
const hrefAtom = atom('');

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
  const [src, setSrc] = useAtom(srcAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const [height, setHeight] = useAtom(heightAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [minValue, setMinValue] = useAtom(minValueAtom);
  const [maxValue, setMaxValue] = useAtom(maxValueAtom);
  const [minLabel, setMinLabel] = useAtom(minLabelAtom);
  const [maxLabel, setMaxLabel] = useAtom(maxLabelAtom);
  const [defaultValue, setDefaultValue] = useAtom(defaultValueAtom);
  const [href, setHref] = useAtom(hrefAtom);

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
        setOptions([]);
      }
      if (columns[activeComponentNo].hasOwnProperty('src')) {
        setSrc(columns[activeComponentNo].src);
      } else {
        setSrc('');
      }
      if (columns[activeComponentNo].hasOwnProperty('width')) {
        setWidth(columns[activeComponentNo].width);
      } else {
        setWidth(0);
      }
      if (columns[activeComponentNo].hasOwnProperty('height')) {
        setHeight(columns[activeComponentNo].height);
      } else {
        setHeight(0);
      }
      if (columns[activeComponentNo].hasOwnProperty('step')) {
        setStep(columns[activeComponentNo].step);
        setMinValue(columns[activeComponentNo].min_value);
        setMinLabel(columns[activeComponentNo].min_label);
        setMaxValue(columns[activeComponentNo].max_value);
        setMaxLabel(columns[activeComponentNo].max_label);
        setDefaultValue(columns[activeComponentNo].default_value);
      } else {
        setStep(0);
        setMinValue(0);
        setMinLabel('');
        setMaxValue(0);
        setMaxLabel('');
        setDefaultValue(0);
      }
      if (columns[activeComponentNo].hasOwnProperty('href')) {
        setHref(columns[activeComponentNo].href);
      } else {
        setHref('');
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
          if (column.hasOwnProperty('src')) {
            column.src = src;
            column.width = width;
            column.height = height;
          }
          if (column.hasOwnProperty('step')) {
            column.step = step;
            column.min_value = minValue;
            column.min_label = minLabel;
            column.max_value = maxValue;
            column.max_label = maxLabel;
            column.default_value = defaultValue;
          }
          if (column.hasOwnProperty('href')) {
            column.href = href;
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

  const handleCancel = () => {
    if (activeComponentNo !== null && activeComponentNo > -1) {
      setActiveComponentNo(null);
    } else {
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
    setColumns([...columns.slice(0, index + 1), {}, ...columns.slice(index + 1, columns.length)]);
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
            <ColumnsPanel
              editColumn={editColumn}
              removeColumn={removeColumn}
              addColumn={addColumn}
              selectColumnType={selectColumnType}
              columns={columns} />
            :
            <EditorPanel
              columns={columns}
              options={options}
              activeComponentNo={activeComponentNo}
              addOption={addOption}
              editorState={editorState}
              handleOptionTextChange={handleOptionTextChange}
              handleOptionValueChange={handleOptionValueChange}
              removeOption={removeOption}
              setEditorState={setEditorState}
              src={src}
              setSrc={setSrc}
              width={width}
              height={height}
              setWidth={setWidth}
              setHeight={setHeight}
              step={step}
              setStep={setStep}
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              minLabel={minLabel}
              setMinLabel={setMinLabel}
              maxLabel={maxLabel}
              setMaxLabel={setMaxLabel}
              defaultValue={defaultValue}
              setDefaultValue={setDefaultValue}
              href={href}
              setHref={setHref}
            />
          }
          <div className={classes.footer}>
            <Button onClick={handleCancel}>CANCEL</Button>
            <Button onClick={handleDone}>DONE</Button>
          </div>
        </div>
        }
      </SwipeableDrawer>
    </div>
  );
}

export default EditDrawer;
