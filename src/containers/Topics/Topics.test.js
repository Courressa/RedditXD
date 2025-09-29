import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Topics } from './Topics';
import { loadTopics, collectFetchTopic, collectMainTopicClick } from './topicsSlice';
import { Topic } from '../../features/Topic/Topic';
import { Home } from '../../features/svg_icons/Home';
import { Popular } from '../../features/svg_icons/Popular';
import { PointUp } from '../../features/svg_icons/PointUp';
import { TopicsIcons } from '../../features/svg_icons/TopicsIcons';

// Mock the API to prevent real network calls
jest.mock('../../api/api', () => ({
  getTopics: jest.fn().mockResolvedValue([]),
}));

// Mock child components
jest.mock('../../features/Topic/Topic', () => ({
  Topic: jest.fn(() => <div>Mocked Topic</div>),
}));

jest.mock('../../features/svg_icons/Home', () => ({
  Home: jest.fn(() => <div>Mocked Home Icon</div>),
}));

jest.mock('../../features/svg_icons/Popular', () => ({
  Popular: jest.fn(() => <div>Mocked Popular Icon</div>),
}));

jest.mock('../../features/svg_icons/PointUp', () => ({
  PointUp: jest.fn(() => <div>Mocked PointUp Icon</div>),
}));

jest.mock('../../features/svg_icons/TopicsIcons', () => ({
  TopicsIcons: jest.fn(() => <div>Mocked TopicsIcons</div>),
}));

const middlewares = [thunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Topics Component', () => {
  let store;

  const getMockState = (overrides = {}) => ({
    topics: {
      sendTopics: '',
      mainTopicClick: false,
      listTopics: [],
      isLoading: false,
      hasError: false,
      ...overrides.topics,
    },
  });

  beforeEach(() => {
    Topic.mockClear();
    Home.mockClear();
    Popular.mockClear();
    PointUp.mockClear();
    TopicsIcons.mockClear();
  });

  it('renders main topics and dropdown', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Popular')).toBeInTheDocument();
    expect(getByText('Topics')).toBeInTheDocument();
    expect(Home).toHaveBeenCalled();
    expect(Popular).toHaveBeenCalled();
    expect(TopicsIcons).toHaveBeenCalled();
    expect(PointUp).toHaveBeenCalled();
  });

  it('dispatches loadTopics on mount', async () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: 'topics/loadTopics/pending',
      }));
    });
  });

  it('toggles dropdown on click', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    const dropdown = container.querySelector('.topicsDropDown');
    fireEvent.click(dropdown);

    expect(container.querySelector('.mappedMainTopics')).toBeInTheDocument();

    fireEvent.click(dropdown);
    expect(container.querySelector('.mappedMainTopics')).not.toBeInTheDocument();
  });

  it('renders mapped topics when dropdown is open', () => {
    const mockTopics = [
      { data: { display_name: 'Topic1' } },
      { data: { display_name: 'Topic2' } },
    ];
    const mockState = getMockState({ topics: { listTopics: mockTopics } });
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    const dropdown = container.querySelector('.topicsDropDown');
    fireEvent.click(dropdown);

    expect(container.querySelector('.mappedMainTopics')).toBeInTheDocument();
    expect(Topic).toHaveBeenCalledWith(
      expect.objectContaining({ topic: mockTopics[0], shouldDisplayTopic: true }),
      expect.anything()
    );
    expect(Topic).toHaveBeenCalledWith(
      expect.objectContaining({ topic: mockTopics[1], shouldDisplayTopic: true }),
      expect.anything()
    );
  });

  it('handles main topic click for Home', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    fireEvent.click(getByText('Home'));

    const actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: collectFetchTopic.type, payload: '/r/Home/' }),
        expect.objectContaining({ type: collectMainTopicClick.type }),
      ])
    );
  });

  it('handles main topic click for Popular', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={false} />
      </Provider>
    );

    fireEvent.click(getByText('Popular'));

    const actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: collectFetchTopic.type, payload: '/r/Popular/' }),
        expect.objectContaining({ type: collectMainTopicClick.type }),
      ])
    );
  });

  it('applies dark mode classes when darkModeSwitch is true', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Topics darkModeSwitch={true} />
      </Provider>
    );

    expect(container.querySelector('.topicsDarkMode')).toBeInTheDocument();
    expect(container.querySelector('.topicsDropDownDarkMode')).toBeInTheDocument();
  });
});