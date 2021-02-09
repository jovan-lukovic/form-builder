import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { atom, useAtom } from "jotai";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useElements } from "../hooks/redux";
import Elements from "./elements";

const isOpenPreviewPanelAtom = atom(false);

const useStyles = makeStyles({
  swipeableDrawer: {
    '& .MuiDrawer-paperAnchorTop': {
      maxHeight: "80%",
      width: 800,
      maxWidth: '90%',
      top: '10%',
      margin: 'auto',
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
  },
  viewer: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  body: {

  },
  footer: {
    paddingTop: 20,
    textAlign: 'right',
    '& button': {
      marginRight: 10,
    },
  },
});

function PreviewPanel({ isOpen, closePanel }) {
  const classes = useStyles();
  const elements = useElements();
  const [openState, setOpenState] = useAtom(isOpenPreviewPanelAtom);

  useEffect(() => {
    setOpenState(isOpen);
  }, [isOpen]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!open) {
      closePanel();
    }
  };


  return (
    <div>
      <SwipeableDrawer
        anchor={'top'}
        open={openState}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        className={classes.swipeableDrawer}
      >
        <div
          className={classes.viewer}
          role="presentation"
        >
          <div className={classes.body}>
            {
              elements.map(item => (
                <Elements key={item.id} item={item} />
              ))
            }
          </div>
          <div className={classes.footer}>
            <Button variant='outlined' onClick={closePanel}>OK</Button>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default PreviewPanel;
