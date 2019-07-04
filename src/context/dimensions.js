import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { withFetcher } from './fetcher';
import { withCookies } from './cookies';

const getWindowDimensions = () => ({ width: window.innerWidth, height: window.innerHeight });

const { Provider, Consumer } = createContext(getWindowDimensions());

const DimensionsProviderCmp = ({ children }) => {
  const [dimensions, setDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Provider value={{ dimensions }}>{children}</Provider>;
};

DimensionsProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
};

const DimensionsProvider = compose(
  withCookies,
  withRouter,
  withFetcher,
  withSnackbar
)(DimensionsProviderCmp);

const withDimensions = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { DimensionsProvider, withDimensions };
