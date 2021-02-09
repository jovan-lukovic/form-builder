import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    margin: '0 10px',
    minWidth: 100,
  },
});

const Header = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h3 dangerouslySetInnerHTML={{__html: data.content}}></h3>
    </div>
  );
}

Header.propTypes = {
  data: PropTypes.object.isRequired,
};

Header.defaultProps = {
  data: {},
};

export default Header;
