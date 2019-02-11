import uuid from 'uuid';

const mergeArrays = (data, field) =>
  Array.from(
    new Set(
      data.reduce(
        (res, val) => (val[field] ? [...res, ...val[field]] : [...res]),
        []
      )
    )
  );

const addIdForArrayItems = items =>
  items.map(item => ({ value: item, id: uuid() }));

const normalizeWord = (wordData = {}) => {
  const { results = [], ...rest } = wordData;

  return {
    examples: addIdForArrayItems(mergeArrays(results, 'examples')),
    definitions: addIdForArrayItems(results.map(item => item.definition)),
    similarTo: addIdForArrayItems(mergeArrays(results, 'similarTo')),
    synonyms: addIdForArrayItems(mergeArrays(results, 'synonyms')),
    antonyms: addIdForArrayItems(mergeArrays(results, 'antonyms')),
    partOfSpeech: addIdForArrayItems(
      Array.from(new Set(results.map(item => item.partOfSpeech)))
    ),
    ...rest,
  };
};

const denormalizeWord = ({ _id, ...wordWithoutId }) => wordWithoutId;

export { mergeArrays, addIdForArrayItems, normalizeWord, denormalizeWord };
