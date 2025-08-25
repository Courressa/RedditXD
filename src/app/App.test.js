import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { selectModeState } from '../features/ModeSetter/modeSetterSlice';
import { selectMenuDropdownClick, selectUserSearch, selectUserSearchClick, collectUserSearch, collectUserSearchClick, collectmenuDropdownClick } from '../containers/Banner/bannerSlice';
import { selectTopics, selectMainTopicsClick, selectListTopics, loadTopics, collectFetchTopic, collectMainTopicClick } from '../containers/Topics/topicsSlice';
import { selectPost, loadingPopular, errorFound, loadPopular, loadSelectedTopicPost, loadUserSearch, loadComments } from '../containers/Posts/postsSlice';

// Create a mock store with thunk middleware
const mockStore = configureStore([thunk]);

// Mock selectors and actions
jest.mock('../features/ModeSetter/modeSetterSlice', () => ({
  selectModeState: jest.fn(),
}));

jest.mock('../containers/Banner/bannerSlice', () => ({
  selectMenuDropdownClick: jest.fn(),
  selectUserSearch: jest.fn(),
  selectUserSearchClick: jest.fn(),
  collectUserSearch: jest.fn(),
  collectUserSearchClick: jest.fn(),
  collectmenuDropdownClick: jest.fn(),
}));

jest.mock('../containers/Topics/topicsSlice', () => ({
  selectTopics: jest.fn(),
  selectMainTopicsClick: jest.fn(),
  selectListTopics: jest.fn(),
  loadTopics: jest.fn(),
  collectFetchTopic: jest.fn(),
  collectMainTopicClick: jest.fn(),
}));

jest.mock('../containers/Posts/postsSlice', () => ({
  selectPost: jest.fn(),
  loadingPopular: jest.fn(),
  errorFound: jest.fn(),
  loadPopular: jest.fn(),
  loadSelectedTopicPost: jest.fn(),
  loadUserSearch: jest.fn(),
  loadComments: jest.fn(),
}));

describe('App Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      modeSetter: {
        modeState: false,
      },
      banner: {
        userSearch: '',
        userSearchClick: false,
        menuDropdownClick: false,
      },
      topics: {
        listTopics: [],
        fetchTopic: '',
        mainTopicClick: false,
      },
      posts: {
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
      },
    };
    store = mockStore(initialState);
    selectModeState.mockClear();
    selectMenuDropdownClick.mockClear();
    selectUserSearch.mockClear();
    selectUserSearchClick.mockClear();
    selectTopics.mockClear();
    selectMainTopicsClick.mockClear();
    selectListTopics.mockClear();
    selectPost.mockClear();
    loadingPopular.mockClear();
    errorFound.mockClear();

    // Default returns
    selectModeState.mockReturnValue(false);
    selectMenuDropdownClick.mockReturnValue(false);
    selectUserSearch.mockReturnValue('');
    selectUserSearchClick.mockReturnValue(false);
    selectTopics.mockReturnValue('');
    selectMainTopicsClick.mockReturnValue(false);
    selectListTopics.mockReturnValue([]);
    selectPost.mockReturnValue([]);
    loadingPopular.mockReturnValue(false);
    errorFound.mockReturnValue(false);

    // Mock async thunks to return thunks
    loadTopics.mockImplementation(() => (dispatch) => {});
    loadPopular.mockImplementation(() => (dispatch) => {});
    loadSelectedTopicPost.mockImplementation(() => (dispatch) => {});
    loadUserSearch.mockImplementation(() => (dispatch) => {});
    loadComments.mockImplementation(() => (dispatch) => {});
  });

  it('renders Banner, Topics, and Posts components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByTestId('topics')).toBeInTheDocument();
    expect(screen.getAllByTestId('posts').length).toBe(2);
  });

  it('applies app class when darkModeState is false', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const appDiv = container.firstChild;
    expect(appDiv).toHaveAttribute('class', expect.stringContaining('app'));
  });

  it('applies appDarkMode class when darkModeState is true', () => {
    selectModeState.mockReturnValue(true);

    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const appDiv = container.firstChild;
    expect(appDiv).toHaveAttribute('class', expect.stringContaining('appDarkMode'));
  });

  it('does not render MenuDropdown when menuDropdownState is false', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.queryByTestId('menu-dropdown')).not.toBeInTheDocument();
  });

  it('renders MenuDropdown when menuDropdownState is true', () => {
    selectMenuDropdownClick.mockReturnValue(true);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('menu-dropdown')).toBeInTheDocument();
  });

  it('passes darkModeSwitch prop to Banner, Topics, and MenuDropdown', () => {
    selectModeState.mockReturnValue(true);
    selectMenuDropdownClick.mockReturnValue(true);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const banner = screen.getByTestId('banner');
    const topics = screen.getByTestId('topics');
    const menuDropdown = screen.getByTestId('menu-dropdown');

    expect(banner).toHaveAttribute('class', expect.stringContaining('bannerDarkMode'));
    expect(topics).toHaveAttribute('class', expect.stringContaining('topicsDarkMode'));
    expect(menuDropdown).toHaveAttribute('class', expect.stringContaining('menuDarkMode'));
  });

  it('passes menuDropdownSwitch prop to MenuDropdown', () => {
    selectMenuDropdownClick.mockReturnValue(true);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const menuDropdown = screen.getByTestId('menu-dropdown');
    expect(menuDropdown).toHaveAttribute('class', expect.stringContaining('menu'));
  });
});