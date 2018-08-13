import PropTypes from 'prop-types';

const exampleShape = PropTypes.shape({
  example: PropTypes.string,
  id: PropTypes.string,
});

const wordShape = PropTypes.shape({
  en: PropTypes.string,
  ru: PropTypes.string,
  transcription: PropTypes.string,
  dateCreated: PropTypes.string,
  dateLastUpdated: PropTypes.string,
  examples: PropTypes.arrayOf(exampleShape),
});

const wordsListShape = PropTypes.arrayOf(wordShape);

export { wordShape, wordsListShape, exampleShape };
