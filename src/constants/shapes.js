const wordShape = PropTypes => PropTypes.shape({
  _id: PropTypes.string,
  en: PropTypes.string,
  ua: PropTypes.string,
  transcription: PropTypes.string,
  partOfSpeech: PropTypes.arrayOf(PropTypes.object),
  synonyms: PropTypes.arrayOf(PropTypes.object),
  examples: PropTypes.arrayOf(PropTypes.object)
});

export default wordShape;
