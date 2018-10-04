import PropTypes from 'prop-types';

const wordFormShape = PropTypes.shape({
  en: PropTypes.string,
  ua: PropTypes.string,
  transcription: PropTypes.string,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })
  )
});

export { wordFormShape }
