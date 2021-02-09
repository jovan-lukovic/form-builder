import React from "react";
import { Editor } from "react-draft-wysiwyg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  content: {
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
  },
  editor: {
    height: 120,
    padding: '0px 10px',
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
  options: {
    padding: '20px 10px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    '& .actions': {
      '& button': {
        marginLeft: 10,
      },
    },
  },
  formControl: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    padding: '0 10px',
    '& input': {
      marginLeft: 15,
      flex: 1,
    },
    '& label': {
      minWidth: 40,
    }
  }
});

const EditorPanel = (
  {
    columns,
    activeComponentNo,
    editorState,
    setEditorState,
    options,
    handleOptionTextChange,
    handleOptionValueChange,
    addOption,
    removeOption,
    src,
    setSrc,
    width,
    height,
    setWidth,
    setHeight,
    step,
    setStep,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    minLabel,
    setMinLabel,
    maxLabel,
    setMaxLabel,
    defaultValue,
    setDefaultValue,
    href,
    setHref
  }) => {

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.heading}>
        <h1>{columns[activeComponentNo]?.name} Editor</h1>
      </div>
      <div className={classes.content}>
        {(columns[activeComponentNo]?.hasOwnProperty('label') || columns[activeComponentNo]?.hasOwnProperty('content')) &&
        <div>
          <label>Label:</label>
          <Editor
            editorState={editorState}
            editorClassName={classes.editor}
            onEditorStateChange={(es) => setEditorState(es)}
          />
        </div>
        }
        {columns[activeComponentNo].hasOwnProperty('options') &&
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
        {columns[activeComponentNo].hasOwnProperty('src') &&
        <>
          <div className={classes.formControl}>
            <label>Link to:</label>
            <input type="text" value={src} onChange={(e) => setSrc(e.target.value)}/>
          </div>
          <div className={classes.formControl}>
            <div className={classes.formControl}>
              <label>Width:</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}/>
            </div>
            <div className={classes.formControl}>
              <label>Height:</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}/>
            </div>
          </div>
        </>
        }
        {columns[activeComponentNo].hasOwnProperty('step') &&
        <>
          <div className={classes.formControl}>
            <label>Step:</label>
            <input type="number" value={step} max={maxValue} onChange={(e) => setStep(parseFloat(e.target.value))} />
          </div>
          <div className={classes.formControl}>
            <label>Min:</label>
            <input type="number" value={minValue} max={maxValue} onChange={(e) => setMinValue(parseFloat(e.target.value))} />
            <input type="text" value={minLabel} onChange={(e) => setMinLabel(e.target.value)} />
          </div>
          <div className={classes.formControl}>
            <label>Max:</label>
            <input type="number" value={maxValue} min={minValue} onChange={(e) => setMaxValue(parseFloat(e.target.value))} />
            <input type="text" value={maxLabel} onChange={(e) => setMaxLabel(e.target.value)} />
          </div>
          <div className={classes.formControl}>
            <label>Default Value:</label>
            <input type="number" value={defaultValue} min={minValue} max={maxValue} onChange={(e) => setDefaultValue(parseFloat(e.target.value))} />
          </div>
        </>
        }
        {columns[activeComponentNo].hasOwnProperty('href') &&
        <>
          <div className={classes.formControl}>
            <label>Href:</label>
            <input type="text" value={href} onChange={(e) => setHref(e.target.value)} />
          </div>
        </>
        }
      </div>
    </React.Fragment>
  );
};

EditorPanel.propTypes = {
  columns: PropTypes.array,
  activeComponentNo: PropTypes.number,
  editorState: PropTypes.any,
  options: PropTypes.array,
  setEditorState: PropTypes.func,
  handleOptionTextChange: PropTypes.func,
  handleOptionValueChange: PropTypes.func,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
  src: PropTypes.string,
  setSrc: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  setWidth: PropTypes.func,
  setHeight: PropTypes.func,
  step: PropTypes.number,
  setStep: PropTypes.func,
  minValue: PropTypes.number,
  setMinValue: PropTypes.func,
  maxValue: PropTypes.number,
  setMaxValue: PropTypes.func,
  minLabel: PropTypes.string,
  setMinLabel: PropTypes.func,
  maxLabel: PropTypes.string,
  setMaxLabel: PropTypes.func,
  defaultValue: PropTypes.any,
  setDefaultValue: PropTypes.func,
  href: PropTypes.string,
  setHref: PropTypes.func,
};

EditorPanel.defaultProps = {
  columns: [],
  activeComponentNo: null,
  editorState: null,
  options: [],
  setEditorState: () => {},
  handleOptionTextChange: () => {},
  handleOptionValueChange: () => {},
  addOption: () => {},
  removeOption: () => {},
  src: '',
  setSrc: () => {},
  width: 0,
  height: 0,
  setWidth: () => {},
  setHeight: () => {},
  step: 0,
  setStep: () => {},
  minValue: 0,
  setMinValue: () => {},
  maxValue: 0,
  setMaxValue: () => {},
  minLabel: '',
  setMinLabel: () => {},
  maxLabel: '',
  setMaxLabel: () => {},
  defaultValue: 0,
  setDefaultValue: () => {},
  href: '',
  setHref: () => {},
};

export default EditorPanel;
