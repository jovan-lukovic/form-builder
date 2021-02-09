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
    '& img': {

    },
    '& .no-image': {
      background: '#eee',
      border: '1px solid #ddd',
      width: 100,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

const Image = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {
          data.src ?
            <img src={data.src} alt='image' width={data.width ? data.width : ''} height={data.height ? data.height : ''} /> :
            <div className='no-image'>
              No Image
            </div>
        }
      </div>
    </div>
  );
}

Image.propTypes = {
  data: PropTypes.object.isRequired,
};

Image.defaultProps = {
  data: {},
};

export default Image;
