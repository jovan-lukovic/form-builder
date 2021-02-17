import React, { useState } from "react";
import PropTypes from "prop-types";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from "@material-ui/core/styles";

import { defaultComponents } from "../Toobox";

import Header from "./Header";
import Parapraph from "./Paragraph";
import Label from "./Label";
import LineBreak from "./LineBreak";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";
import Image from "./Image";
import Rating from "./Rating";
import Range from "./Range";
import Tags from "./Tags";
import Checkboxes from "./Checkboxes";
import RadioButtons from "./RadioButtons";
import DatePicker from "./DatePicker";
import Signature from "./Signature";
import Download from "./Download";
import HyperLink from "./HyperLink";
import Camera from "./Camera";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  container: props => ({
    padding: '1rem 10px',
    marginBottom: 10,
    position: 'relative',
    boxShadow: props.hover ? '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)' : 'none',
    background: props.hover ? '#ffffff' : 'none',

    '& p': {
      margin: 0,
    },

    '&:hover': props.mutable ? {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
      background: '#ffffff',

      '& .actions': {
        display: 'flex',
      }
    } : {},

    '& .actions': {
      display: props.hover ? 'flex' : 'none',
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#fff',
      zIndex: 10,
      borderRadius: 5,
      '@media(max-width: 992px)': {
        display: 'flex',
        backgroundColor: 'transparent',
      },
    },
  }),
  button: {
    padding: 5,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 18,
    height: 18,
  },
  components: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  }
});

const Elements = ({item, editElement, deleteElement, insertElement, mutable}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles({ mutable, hover: Boolean(anchorEl) });

  const handleInsert = (component) => {
    setAnchorEl(null);
    insertElement(item.id, component);
  };

  const getComponent = (component, index) => {
    switch (component.key) {
      case 'Header':
        return <Header key={index} data={component} />
      case 'Paragraph':
        return <Parapraph key={index} data={component} />
      case 'Label':
        return <Label key={index} data={component} />
      case 'LineBreak':
        return <LineBreak key={index} />
      case 'TextInput':
        return <TextInput key={index} mutable={mutable} data={component} />
      case 'TextArea':
        return <TextArea key={index} mutable={mutable} data={component} />
      case 'Dropdown':
        return <Dropdown key={index} mutable={mutable} data={component} />
      case 'NumberInput':
        return <NumberInput key={index} mutable={mutable} data={component} />
      case 'Image':
        return <Image key={index} data={component} />
      case 'Rating':
        return <Rating key={index} mutable={mutable} data={component} />
      case 'Range':
        return <Range key={index} mutable={mutable} data={component} />
      case 'Tags':
        return <Tags key={index} mutable={mutable} data={component} />
      case 'Checkboxes':
        return <Checkboxes key={index} mutable={mutable} data={component} />
      case 'RadioButtons':
        return <RadioButtons key={index} mutable={mutable} data={component} />
      case 'DatePicker':
        return <DatePicker key={index} mutable={mutable} data={component} />
      case 'Signature':
        return <Signature key={index} mutable={mutable} data={component} />
      case 'Download':
        return <Download key={index} mutable={mutable} data={component} />
      case 'HyperLink':
        return <HyperLink key={index} mutable={mutable} data={component} />
      case 'Camera':
        return <Camera key={index} mutable={mutable} data={component} />
      default:
        return;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.components}>
        {
          item.components.map((component, index) => {
            return getComponent(component, index);
          })
        }
      </div>
      {
        mutable && <div className='actions'>
          {item.components[0]?.key !== 'LineBreak' &&
          <IconButton className={classes.button} aria-label='edit' onClick={() => editElement(item.id)}>
            <EditIcon className={classes.icon}/>
          </IconButton>
          }
          <IconButton className={classes.button} aria-label='delete' onClick={() => deleteElement(item.id)}>
            <DeleteIcon className={classes.icon}/>
          </IconButton>
          <IconButton className={classes.button} aria-label='insert' onClick={(e) => setAnchorEl(e.currentTarget)}>
            <AddIcon className={classes.icon}/>
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            {
              defaultComponents.map(component => (
                <MenuItem key={component.key} onClick={() => handleInsert(component)}>
                  {component.name}
                </MenuItem>
              ))
            }
          </Menu>
        </div>
      }
    </div>
  );
};

Elements.propTypes = {
  item: PropTypes.object.isRequired,
  editElement: PropTypes.func,
  deleteElement: PropTypes.func,
  insertElement: PropTypes.func,
  mutable: PropTypes.bool,
};

Elements.defaultProps = {
  item: {},
  editElement: () => {},
  deleteElement: () => {},
  insertElement: () => {},
  mutable: false,
};

export default Elements;
