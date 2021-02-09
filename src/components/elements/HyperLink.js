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

const HyperLink = ({ data, mutable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <a target='_blank' href={data.href} dangerouslySetInnerHTML={{__html: data.content}}></a>
        {mutable && <div className={classes.overlay}></div>}
      </div>
    </div>
  );
}

HyperLink.propTypes = {
  data: PropTypes.object.isRequired,
  mutable: PropTypes.bool,
};

HyperLink.defaultProps = {
  data: {},
  mutable: false,
};

export default HyperLink;
