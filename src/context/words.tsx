import React, { createContext, useState, useContext } from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { compose } from 'recompose';
import { createApiWord, apiGif } from '../api';
import LN from '../constants/loading-names';
import { AuthContext } from './auth';
import { FetcherContext } from './fetcher';
import { Word, Gif } from '../types';
import { SearchParamsContext } from './search-params';

interface WI {
  wordItem: Word;
  wordsList: Word[];
  wordsCount: number;
  cleanWord(): void;
  cleanWordsList(): void;
  handleFetchWord(id: string): void;
  handleFetchWordsList(): void;
  handleFetchWordsToLearn(): void;
  handleEditWord(w: Word): void;
  handleDeleteWord(id: string): void;
  handleLearnWord(id: string): void;
  handleRelearnWord(id: string): void;
  handleCreateWord(): void;
  handleSearchWord(word: string): void;
}

const WordsContext = createContext({} as WI);

const getRandomGif = (gifList: Gif[] = []): string => {
  const gifData = gifList || [];
  const downsizedGifList = gifData.map((gif: Gif): string => gif.images.downsized_large.url);

  return downsizedGifList[Math.round(Math.random() * downsizedGifList.length)];
};

interface OwnProps {
  children: JSX.Element;
}

type Props = WithSnackbarProps & OwnProps;

const initialWord = {
  _id: '',
  created: '',
  updated: '',
};

const WordsProviderCmp = (props: Props): JSX.Element => {
  const { enqueueSnackbar, children } = props;
  const { tokenData } = useContext(AuthContext);
  const { query } = useContext(SearchParamsContext);
  const { handleFetch } = useContext(FetcherContext);
  const { token, _id: ownerId } = tokenData;
  const apiWord = createApiWord(token);
  const [wordsList, setWordsList] = useState<Word[]>([]);
  const [wordItem, setWordItem] = useState<Word>(initialWord);
  const [wordsCount, setWordsCount] = useState<number>(0);

  const cleanWordsList = (): void => setWordsList([]);

  const cleanWord = (): void => setWordItem(initialWord);

  const handleFetchWord = (wordId: string): void => {
    handleFetch(LN.words.fetch)(
      async (): Promise<void> => {
        cleanWord();
        const word = await apiWord.get<Word>(wordId);
        setWordItem(word);
      }
    );
  };

  const handleFetchWordsList = (): void => {
    handleFetch(LN.words.list)(
      async (): Promise<void> => {
        const { filter, ...sortParams } = query;
        const { items, count } = await apiWord.getList({
          query: filter ? { word: { $regex: filter } } : {},
          ...sortParams,
          ownerId,
        });
        setWordsList(items);
        setWordsCount(count);
      }
    );
  };

  const handleCreateWord = (): void => {
    handleFetch(LN.words.save)(
      async (): Promise<void> => {
        await apiWord.create({ ...wordItem, ownerId });
        enqueueSnackbar('The word has been saved successfully', { variant: 'success' });
      }
    );
  };

  const handleEditWord = (word: Word): void => {
    handleFetch(LN.words.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiWord.update(word);
        await handleFetchWord(_id);
        enqueueSnackbar('The word has been updated successfully', { variant: 'success' });
      }
    );
  };

  const handleDeleteWord = (id: string): void => {
    handleFetch(LN.words.delete)(
      async (): Promise<void> => {
        await apiWord.delete(id);
        await handleFetchWordsList();
        enqueueSnackbar('The word has been deleted successfully', { variant: 'success' });
      }
    );
  };

  const handleSearchWord = (word: string): void => {
    handleFetch(LN.words.search)(
      async (): Promise<void> => {
        cleanWord();
        const foundWord = await apiWord.search<Word>({ word });
        const gifList = await apiGif.get<{ data: Gif[] }>({ q: foundWord.word });
        const randomGif = gifList && getRandomGif(gifList.data);
        const wordData = JSON.parse(JSON.stringify(foundWord));

        if (randomGif) {
          wordData.gif = randomGif;
        }
        setWordItem(wordData);
      }
    );
  };

  const handleFetchWordsToLearn = (): void => {
    handleFetch(LN.words.learn)(
      async (): Promise<void> => {
        const { items, count } = await apiWord.getListToLearn({ ownerId });
        setWordsList(items);
        setWordsCount(count);
      }
    );
  };

  const handleLearnWord = (wordId: string): void => {
    handleFetch(LN.words.learn)(
      async (): Promise<void> => {
        await apiWord.learn(wordId);
        setWordsList((prevState): Word[] => [...prevState.filter(({ _id }: Word): boolean => _id !== wordId)]);
      }
    );
  };

  const handleRelearnWord = (wordId: string): void => {
    setWordsList((prevState): Word[] => {
      const wordToRelearn = prevState.find(({ _id }: Word): boolean => _id === wordId) || initialWord;
      const { _id: wordToRelearnId } = wordToRelearn;

      return [...prevState.filter(({ _id }: Word): boolean => _id !== wordToRelearnId), wordToRelearn];
    });
  };

  return (
    <WordsContext.Provider
      value={{
        wordItem,
        wordsList,
        wordsCount,
        cleanWord,
        cleanWordsList,
        handleFetchWord,
        handleFetchWordsList,
        handleFetchWordsToLearn,
        handleEditWord,
        handleDeleteWord,
        handleLearnWord,
        handleRelearnWord,
        handleCreateWord,
        handleSearchWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

const WordsProvider = compose<Props, OwnProps>(withSnackbar)(WordsProviderCmp);

export { WordsProvider, WordsContext };
