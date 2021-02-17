import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { defaultComponents } from "../Toobox";

const useStyles = makeStyles({
  columnsContainer: {
    padding: '0 15px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    '@media(max-width: 992px)': {
      padding: '0 20px',
    }
  },
  columns: {
    padding: '10px 0',
    overflow: 'auto',
    flex: 1,
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
  column: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& span': {
      fontSize: 16,
      whiteSpace: 'nowrap',
    },
  },
  formControl: {
    minWidth: 150,
    marginLeft: 10,
    marginRight: 30,
    '& label': {
      backgroundColor: '#fff',
      padding: '0 10px',
    },
    '@media(max-width: 992px)': {
      marginRight: 5,
      minWidth: 80,
      maxWidth: 150,
      flex: 1,
    }
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    '& button': {
      marginLeft: 15,
      padding: 5,
      '@media(max-width: 992px)': {
        marginLeft: 5,
      }
    }
  }
});

const ColumnsPanel = ({ columns, selectColumnType, addColumn, removeColumn, editColumn }) => {
  const classes = useStyles();

  return (
    <div className={classes.columnsContainer}>
      <h1>Columns</h1>
      <div className={classes.columns}>
        {
          columns.map((column, index) => (
            <div key={index} className={classes.column}>
              <span>Column {index + 1}:</span>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id={`column-type-select-label-${index}`}>Type</InputLabel>
                <Select
                  labelId={`column-type-select-label-${index}`}
                  id={`column-type-select-${index}`}
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
              <div className={classes.buttons}>
                <IconButton variant='contained' onClick={() => addColumn(index)}><AddIcon/></IconButton>
                {index !== 0 &&
                <IconButton variant='contained' onClick={() => removeColumn(index)}><RemoveIcon/></IconButton>}
                {column.hasOwnProperty('key') &&
                <IconButton variant='contained' onClick={() => editColumn(index)}><EditIcon/></IconButton>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

ColumnsPanel.propTypes = {
  columns: PropTypes.array,
  selectColumnType: PropTypes.func,
  addColumn: PropTypes.func,
  removeColumn: PropTypes.func,
  editColumn: PropTypes.func,
};

ColumnsPanel.defaultProps = {
  columns: [],
  selectColumnType: () => {},
  addColumn: () => {},
  removeColumn: () => {},
  editColumn: () => {},
};

export default ColumnsPanel;
