import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: '0 10px',
    minWidth: 100,
  },
  main: {
    position: 'relative',
    '& label': {
      display: 'block',
      marginBottom: 5,
    },
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  }
});

const Download = ({ data, download_path, mutable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <a href={download_path + '?id=' + data.file_path} dangerouslySetInnerHTML={{__html: data.content}}></a>
        {mutable && <div className={classes.overlay}></div>}
      </div>
    </div>
  );
}

Download.propTypes = {
  data: PropTypes.object.isRequired,
  download_path: PropTypes.string,
  mutable: PropTypes.bool,
};

Download.defaultProps = {
  data: {},
  download_path: '',
  mutable: false,
};

export default Download;
