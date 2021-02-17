import React from "react";
import { Editor } from "react-draft-wysiwyg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import StarRating from "../elements/StarRating";

import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles = makeStyles({
  heading: {
    padding: '0 10px',
  },
  content: {
    flex: 1,
    padding: '0 10px',
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
    flexWrap: 'wrap',
    '& .inputs': {
      display: 'flex',
    },
    '@media(max-width: 768px)': {
      position: 'relative',
      paddingLeft: 50,

      '& input': {
        marginBottom: 10,
      },
      '& .inputs': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      '& .MuiRadio-root': {
        position: 'absolute',
        left: 0,
        top: 0,
      }
    },
    '& .actions': {
      '& button': {
        marginLeft: 10,
      },
      '@media(max-width: 768px)': {
        '& button': {
          padding: 5,
          marginLeft: 0,
          marginBottom: 10,
        },
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
    '& textarea': {
      marginLeft: 15,
      flex: 1,
      display: 'block',
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: 1.4,
      marginRight: 10,
      border: '1px solid #ccc',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
      transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    },
    '& label': {
      minWidth: 40,
    },
    '& .rating': {
      marginLeft: 10,
      '& input': {
        display: 'none',
      }
    },
    '& .upload-container': {
      position: 'relative',

      '& input': {
        position: 'relative',
        opacity: 0,
        zIndex: 2,
        height: '50px',
      },
      '& img': {
        height: 100,
        width: 150,
      },
      '& .input-control': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10,

        '& button': {
          color: '#333',
          border: '1px solid #ccc',
          padding: '6px 12px',
          marginRight: 10,
          borderRadius: 5,
        }
      }
    },
    '& .date-picker': {
      '& input': {
        border: 0,
        boxShadow: 'none',
      }
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
    setHref,
    imgSrc,
    setImgSrc,
    filePath,
    setFilePath
  }) => {

  const classes = useStyles();

  const changeImageSrc = (e) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        setImgSrc(reader.result);
      }
    }
  };

  const changeDefaultValue = (e, ratingCache) => {
    if (columns[activeComponentNo].key === 'Range') {
      setDefaultValue(parseFloat(e.target.value));
    } else if (columns[activeComponentNo].key === 'RadioButtons' || columns[activeComponentNo].key === 'Dropdown') {
      if (e.target.checked) {
        setDefaultValue(parseFloat(e.target.value));
      } else {
        setDefaultValue('');
      }
    } else if (columns[activeComponentNo].key === 'Checkboxes' || columns[activeComponentNo].key === 'Tags') {
      if (e.target.checked) {
        setDefaultValue([...defaultValue, parseFloat(e.target.value)])
      } else {
        setDefaultValue(defaultValue.filter(v => v !== parseFloat(e.target.value)));
      }
    } else if (columns[activeComponentNo].key === 'TextInput' || columns[activeComponentNo].key === 'TextArea') {
      setDefaultValue(e.target.value);
    } else if (columns[activeComponentNo].key === 'NumberInput') {
      setDefaultValue(parseFloat(e.target.value));
    } else if (columns[activeComponentNo].key === 'Rating') {
      setDefaultValue(ratingCache.rating);
    } else if (columns[activeComponentNo].key === 'DatePicker') {
      setDefaultValue(e);
    }
  };

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
                {columns[activeComponentNo].key === 'RadioButtons' ?
                  <Radio
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color='default'
                    value={option.value}
                    checked={defaultValue === option.value}
                    onChange={(e) => changeDefaultValue(e)}
                  />
                  :
                  <Checkbox
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color='default'
                    value={option.value}
                    checked={
                      (columns[activeComponentNo].key === 'Checkboxes' || columns[activeComponentNo].key === 'Tags') ?
                        (Boolean(defaultValue?.find(v => v === option.value))) : (defaultValue === option.value)
                    }
                    onChange={(e) => changeDefaultValue(e)}
                  />
                }
                <div className='inputs'>
                  <input type='text' placeholder='Option text' value={option.text}
                         onChange={(e) => handleOptionTextChange(e, index)}/>
                  <input type='text' value={option.value} onChange={(e) => handleOptionValueChange(e, index)}/>
                </div>
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
              <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))}/>
            </div>
            <div className={classes.formControl}>
              <label>Height:</label>
              <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))}/>
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
            <input type="number" value={defaultValue} min={minValue} max={maxValue} onChange={(e) => changeDefaultValue(e)} />
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
        {columns[activeComponentNo].hasOwnProperty('img_src') &&
          <div className={classes.formControl}>
            <label>Image:</label>
            <div className='upload-container'>
              <input type='file' accept='image/*' capture='camera' onChange={changeImageSrc} />
              <div className='input-control'>
                <button>
                  <i className='fa fa-camera'></i> Upload Photo
                </button>
                {imgSrc && <img src={imgSrc} alt=""/>}
              </div>
            </div>
          </div>
        }
        {columns[activeComponentNo].key === 'TextInput' &&
          <div className={classes.formControl}>
            <label>Default value:</label>
            <input type="text" value={defaultValue} onChange={changeDefaultValue} />
          </div>
        }
        {columns[activeComponentNo].key === 'NumberInput' &&
        <div className={classes.formControl}>
          <label>Default value:</label>
          <input type="number" value={defaultValue} onChange={changeDefaultValue} />
        </div>
        }
        {columns[activeComponentNo].key === 'TextArea' &&
        <div className={classes.formControl}>
          <label>Default value:</label>
          <textarea value={defaultValue} onChange={changeDefaultValue}></textarea>
        </div>
        }
        {columns[activeComponentNo].key === 'Rating' &&
        <div className={classes.formControl}>
          <label>Default value:</label>
          <div className='rating'>
            <StarRating name={columns[activeComponentNo].name} rating={defaultValue} onRatingClick={changeDefaultValue} />
          </div>
        </div>
        }
        {columns[activeComponentNo].key === 'DatePicker' &&
        <div className={classes.formControl}>
          <label>Default date:</label>
          <div className='date-picker'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                format="MM/dd/yyyy"
                value={defaultValue ? defaultValue : undefined}
                onChange={changeDefaultValue}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        }
        {columns[activeComponentNo].hasOwnProperty('file_path') &&
        <div className={classes.formControl}>
          <label>File path:</label>
          <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)}  />
        </div>
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
  imgSrc: PropTypes.string,
  setImgSrc: PropTypes.func,
  filePath: PropTypes.string,
  setFilePath: PropTypes.func,
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
  imgSrc: '',
  setImgSrc: () => {},
  filePath: '',
  setFilePath: () => {},
};

export default EditorPanel;
