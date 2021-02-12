import React, { useState, useEffect } from 'react';
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

    '& .input-container': {
      position: 'relative',

      '& input': {
        position: 'relative',
        opacity: 0,
        zIndex: 2,
        height: '50px',
      },
      '& .input-control': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,

        '& button': {
          color: '#333',
          border: '1px solid #ccc',
          padding: '6px 12px',
          borderRadius: 5,
        }
      }
    },
    '& .image-container': {
      '& .image-upload-preview': {
        height: 100,
      },
      '& button': {
        color: '#333',
        border: '1px solid #ccc',
        padding: '6px 12px',
        borderRadius: 5,
        display: 'block',
      }
    }
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    top: 0,
  }
});

const Camera = ({ data, mutable, onEdit, onDelete }) => {
  const classes = useStyles({ mutable });
  const [img, setImg] = useState('');
  useEffect(() => {
    setImg(data.img_src);
  }, [data.img_src]);

  const displayImage = (e) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        setImg(reader.result);
      }
    }
  };

  const clearImage = () => {
    setImg(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <label dangerouslySetInnerHTML={{__html: data.label}}></label>
        {
          !img ?
            <div className='input-container'>
              <input type='file' accept='image/*' capture='camera' onChange={displayImage} />
              <div className='input-control'>
                <button>
                  <i className='fa fa-camera'></i> Upload Photo
                </button>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>
            :
            <div className='image-container'>
              <img src={img} className='image-upload-preview' alt=""/>
              <button onClick={clearImage}>
                <i className="fa fa-times"></i> Clear Photo
              </button>
            </div>
        }
        {mutable && <div className={classes.overlay}></div>}
      </div>
    </div>
  );
}

Camera.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

Camera.defaultProps = {
  data: {},
  mutable: false,
};

export default Camera;
