import PropTypes from 'prop-types';

const foundWordShape = PropTypes.shape({
  en: PropTypes.string,
  ua: PropTypes.string,
  transcription: PropTypes.string,
  partOfSpeech: PropTypes.arrayOf(PropTypes.string),
  antonyms: PropTypes.arrayOf(PropTypes.string),
  synonyms: PropTypes.arrayOf(PropTypes.string),
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })
  )
});

export { foundWordShape };
