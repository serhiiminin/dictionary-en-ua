import React, { ComponentType, createContext, useState } from 'react';
import { withSnackbar } from 'notistack';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import { parseSearch } from 'url-joiner';
import { createApiWord, apiGif } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import { AI, withAuth } from './auth';
import { FI, withFetcher } from './fetcher';
import { QueryParams, SearchParams, Word } from '../types';

const INITIAL_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const getWordsSearchParams = (search: string): SearchParams => {
  const { sortBy, sortDirection, page, countPerPage } = INITIAL_SORT_DATA;
  const parsedParams = parseSearch(search);

  return {
    sortBy: parsedParams.sortBy || sortBy,
    sortDirection: parsedParams.sortDirection || sortDirection,
    page: Number(parsedParams.page) || page,
    countPerPage: Number(parsedParams.countPerPage) || countPerPage,
  };
};

const generateQuery = ({ page, countPerPage, sortDirection, sortBy }: SearchParams): QueryParams => ({
  skip: (page - 1) * countPerPage,
  limit: Number(countPerPage),
  sortDirection: sortDirection === 'descend' ? -1 : 1,
  sortBy,
});

interface Gif {
  images: {
    downsized_large: {
      url: string;
    };
  };
}

const getRandlomGif = (gifs: Gif[] = []): string => {
  const gifData = gifs || [];
  const downsizedGifs = gifData.map((gif: Gif): string => gif.images.downsized_large.url);

  return downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];
};

interface OwnProps {
  children: JSX.Element;
  enqueueSnackbar(n: string, p: object): void;
}

type Props = RouteComponentProps & FI & AI & OwnProps;

const { Provider, Consumer } = createContext({});

const WordsProviderCmp = (props: Props): JSX.Element => {
  const { handleFetch, location, tokenData, enqueueSnackbar, children } = props;
  const { token, _id: ownerId } = tokenData;
  const apiWord = createApiWord(token);
  const [wordsList, setWordsList] = useState<Word[]>([]);
  const [wordItem, setWordItem] = useState<Word>({});
  const [wordsCount, setWordsCount] = useState<number>(0);

  const cleanWordsList = (): void => setWordsList([]);

  const cleanWord = (): void => setWordItem({});

  const handleFetchWord = (wordId: string): Promise<object | void> =>
    handleFetch(LN.words.fetch)(
      async (): Promise<void> => {
        cleanWord();
        const word = await apiWord.get(wordId);
        setWordItem(word);
      }
    );

  const handleFetchWordsList = (): Promise<object | void> => {
    const query = generateQuery(getWordsSearchParams(location.search));

    return handleFetch(LN.words.list)(
      async (): Promise<void> => {
        const { items, count } = await apiWord.getList({ query, ownerId });
        setWordsList(items);
        setWordsCount(count);
      }
    );
  };

  const handleCreateWord = (): Promise<object | void> =>
    handleFetch(LN.words.save)(
      async (): Promise<void> => {
        const { _id } = await apiWord.create({ ...wordItem, ownerId });
        await handleFetchWord(_id);
        enqueueSnackbar('The word has been saved successfully', { variant: NT.success });
      }
    );

  const handleEditWord = (word: Word): Promise<object | void> =>
    handleFetch(LN.words.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiWord.update(word);
        await handleFetchWord(_id);
        enqueueSnackbar('The word has been updated successfully', { variant: NT.success });
      }
    );

  const handleDeleteWord = (id: string): Promise<object | void> =>
    handleFetch(LN.words.delete)(
      async (): Promise<void> => {
        await apiWord.delete(id);
        await handleFetchWordsList();
        enqueueSnackbar('The word has been deleted successfully', { variant: NT.success });
      }
    );

  const handleSearchWord = (word: string): Promise<object | void> =>
    handleFetch(LN.words.search)(
      async (): Promise<void> => {
        cleanWord();
        const foundWord = await apiWord.search({ word });
        const gifs = await apiGif.get({ q: foundWord.word });
        const randomGif = gifs && getRandlomGif(gifs.data);
        const wordData = JSON.parse(JSON.stringify(foundWord));

        if (randomGif) {
          wordData.gif = randomGif;
        }
        setWordItem(wordData);
      }
    );

  const handleFetchWordsToLearn = (): Promise<object | void> =>
    handleFetch(LN.words.learn)(
      async (): Promise<void> => {
        const { items, count } = await apiWord.getListToLearn({ ownerId });
        setWordsList(items);
        setWordsCount(count);
      }
    );

  const handleLearnWord = (wordId: string): Promise<object | void> =>
    handleFetch(LN.words.learn)(
      async (): Promise<void> => {
        await apiWord.learn(wordId);
        setWordsList((prevState): Word[] => [...prevState.filter(({ _id }: Word): boolean => _id !== wordId)]);
      }
    );

  const handleRelearnWord = (wordId: string): void => {
    setWordsList((prevState): Word[] => {
      const wordToRelearn = prevState.find(({ _id }: Word): boolean => _id === wordId) || {};
      const { _id: wordToRelearnId } = wordToRelearn;

      return [...prevState.filter(({ _id }: Word): boolean => _id !== wordToRelearnId), wordToRelearn];
    });
  };

  return (
    <Provider
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
    </Provider>
  );
};

const WordsProvider = compose<Props, {}>(
  withRouter,
  withFetcher,
  withAuth,
  withSnackbar
)(WordsProviderCmp);

export interface WI {
  wordItem: Word;
  wordsList: Word[];
  wordsCount: number;
  cleanWord(): void;
  cleanWordsList(): void;
  handleFetchWord(id: string): Promise<object | void>;
  handleFetchWordsList(): Promise<object | void>;
  handleFetchWordsToLearn(): Promise<object | void>;
  handleEditWord(w: Word): Promise<object | void>;
  handleDeleteWord(id: string): Promise<object | void>;
  handleLearnWord(): Promise<object | void>;
  handleRelearnWord(id: string): void;
  handleCreateWord(): void;
  handleSearchWord(): void;
}

const withWords = <T extends {}>(Cmp: ComponentType<T>): ((props: T & WI) => JSX.Element) => (
  props: T & WI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { WordsProvider, withWords };
