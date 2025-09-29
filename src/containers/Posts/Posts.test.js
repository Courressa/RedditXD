import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Posts } from './Posts';
import { loadPopular, loadSelectedTopicPost, loadUserSearch, loadComments } from './postsSlice';
import { Post } from '../../features/Post/Post';
import { LoadingIcon } from '../../features/LoadingIcon/LoadingIcon';

// Mock the API to prevent real network calls
jest.mock('../../api/api', () => ({
  getPopular: jest.fn().mockResolvedValue([]),
  getPostBasedOnTopic: jest.fn().mockResolvedValue([]),
  getSearch: jest.fn().mockResolvedValue([]),
  getCommentListForPost: jest.fn().mockResolvedValue({ postId: 'test', comments: [] }),
}));

// Mock child components
jest.mock('../../features/Post/Post', () => ({
  Post: jest.fn(() => <div>Mocked Post</div>),
}));

jest.mock('../../features/LoadingIcon/LoadingIcon', () => ({
  LoadingIcon: jest.fn(() => <div>Mocked LoadingIcon</div>),
}));

const middlewares = [thunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Posts Component', () => {
  let store;

  const getMockState = (overrides = {}) => ({
    posts: {
      posts: [],
      isLoading: false,
      hasError: false,
      comments: {},
      commentsIsLoading: false,
      commentsHasError: false,
      ...overrides.posts,
    },
    topics: {
      sendTopics: null,
      mainTopicsClick: false,
      ...overrides.topics,
    },
    banner: {
      userSearch: '',
      userSearchClick: 0,
      ...overrides.banner,
    },
  });

  beforeEach(() => {
    Post.mockClear();
    LoadingIcon.mockClear();
  });

  it('renders loading icon when posts are loading', () => {
    const mockState = getMockState({ posts: { isLoading: true } });
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    expect(LoadingIcon).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.loadingOrError')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const mockState = getMockState({ posts: { hasError: true } });
    store = mockStoreCreator(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    expect(getByText('Oops! We ran into an issue with loading this data.')).toBeInTheDocument();
    expect(getByText('Please refresh the page or try again later.')).toBeInTheDocument();
  });

  it('renders error message when postData is not an array', () => {
    const mockState = getMockState({ posts: { posts: null } });
    store = mockStoreCreator(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    expect(getByText('Oops! We ran into an issue with loading this data.')).toBeInTheDocument();
  });

  it('renders posts when data is available', () => {
    const mockPosts = [
      { data: { id: '1' } },
      { data: { id: '2' } },
    ];
    const mockState = getMockState({ posts: { posts: mockPosts } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    expect(Post).toHaveBeenCalledTimes(2);
    expect(Post).toHaveBeenCalledWith(
      expect.objectContaining({ post: mockPosts[0] }),
      expect.anything()
    );
  });

  it('dispatches loadPopular on mount when no data, no topic, no search', async () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: 'posts/loadPopular/pending',
      }));
    });
  });

  it('dispatches loadSelectedTopicPost when sendTopics is provided', async () => {
    const mockTopic = 'testTopic';
    const mockState = getMockState({ topics: { sendTopics: mockTopic } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: 'topics/loadSelectedTopicPost/pending',
        meta: expect.objectContaining({ arg: mockTopic }),
      }));
    });
  });

  it('dispatches loadUserSearch when sendUserSearch is provided and not empty', async () => {
    const mockSearch = 'test search';
    const mockState = getMockState({ banner: { userSearch: mockSearch, userSearchClick: 1 } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: 'topics/loadUserSearch/pending',
        meta: expect.objectContaining({ arg: mockSearch }),
      }));
    });
  });

  it('does not dispatch loadPopular when postData is already populated', async () => {
    const mockPosts = [{ data: { id: '1' } }];
    const mockState = getMockState({ posts: { posts: mockPosts } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).not.toEqual(expect.arrayContaining([
        expect.objectContaining({ type: 'posts/loadPopular/pending' })
      ]));
    });
  });

  it('collectPostIdAndSubreddit dispatches loadComments', async () => {
    const mockPosts = [{ data: { id: '1' } }];
    const mockState = getMockState({ posts: { posts: mockPosts } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Posts />
      </Provider>
    );

    // Since Post is mocked, inspect calls to verify the passed function
    await waitFor(() => {
      const collectFunc = Post.mock.calls[0][0].collectPostIdAndSubreddit;
      collectFunc('testSubreddit', 'testPostId');
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: 'topics/loadComments/pending',
        meta: expect.objectContaining({
          arg: { subreddit: 'testSubreddit', postId: 'testPostId' }
        })
      }));
    });
  });
});