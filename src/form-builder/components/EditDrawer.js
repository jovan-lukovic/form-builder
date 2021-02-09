import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles({
  swipeableDrawer: {
    '& .MuiDrawer-paperAnchorRight': {
      height: 600,
      top: '15%',
      right: '10%',
    },
  },
  viewer: {
    width: 800,
    maxWidth: '80%',
    height: 600,
  },
});

function EditDrawer() {
  const classes = useStyles();
  const [openState, setOpenState] = React.useState(false);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenState(open);
  };

  const handleEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Edit View</Button>
      <SwipeableDrawer
        anchor={'right'}
        open={openState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={classes.swipeableDrawer}
      >
        <div
          className={classes.viewer}
          role="presentation"
        >
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorStateChange}
          />
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default EditDrawer;
