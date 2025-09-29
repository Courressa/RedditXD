import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Banner } from './Banner';
import { collectUserSearch, collectUserSearchClick, collectmenuDropdownClick } from './bannerSlice';
import { SearchBar } from '../../features/SearchBar/SearchBar';
import { ModeSetter } from '../../features/ModeSetter/ModeSetter';
import { Menu } from '../../features/svg_icons/Menu';

// Mock child components
jest.mock('../../features/SearchBar/SearchBar', () => ({
  SearchBar: jest.fn(() => <div>Mocked SearchBar</div>),
}));

jest.mock('../../features/ModeSetter/ModeSetter', () => ({
  ModeSetter: jest.fn(() => <div>Mocked ModeSetter</div>),
}));

jest.mock('../../features/svg_icons/Menu', () => ({
  Menu: jest.fn(() => <div>Mocked Menu</div>),
}));

const middlewares = [thunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Banner Component', () => {
  let store;

  const getMockState = (overrides = {}) => ({
    banner: {
      userSearch: '',
      userSearchClick: false,
      menuDropdown: false,
      ...overrides.banner,
    },
  });

  beforeEach(() => {
    SearchBar.mockClear();
    ModeSetter.mockClear();
    Menu.mockClear();
  });

  it('renders logo, search bar, mode setter, and menu', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <Banner darkModeSwitch={false} />
      </Provider>
    );

    expect(getByAltText('RedditXD Logo')).toBeInTheDocument();
    expect(getByText('Reddit')).toBeInTheDocument();
    expect(getByText('XD')).toBeInTheDocument();
    expect(SearchBar).toHaveBeenCalled();
    expect(ModeSetter).toHaveBeenCalled();
    expect(Menu).toHaveBeenCalled();
  });

  it('applies dark mode class when darkModeSwitch is true', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Banner darkModeSwitch={true} />
      </Provider>
    );

    expect(container.querySelector('.bannerDarkMode')).toBeInTheDocument();
  });

  it('passes userSearch and userSearchClick to SearchBar', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Banner darkModeSwitch={false} />
      </Provider>
    );

    expect(SearchBar).toHaveBeenCalledWith(
      expect.objectContaining({
        userSearchCollected: expect.any(Function),
        userSearchClickCollected: expect.any(Function),
      }),
      expect.anything()
    );
  });

  it('dispatches collectUserSearch when userSearch is called', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Banner darkModeSwitch={false} />
      </Provider>
    );

    const userSearchFunc = SearchBar.mock.calls[0][0].userSearchCollected;
    userSearchFunc('test search');

    const actions = store.getActions();
    expect(actions[0]).toEqual(collectUserSearch('test search'));
  });

  it('dispatches collectUserSearchClick when userSearchClick is called', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Banner darkModeSwitch={false} />
      </Provider>
    );

    const userSearchClickFunc = SearchBar.mock.calls[0][0].userSearchClickCollected;
    userSearchClickFunc();

    const actions = store.getActions();
    expect(actions[0]).toEqual(collectUserSearchClick());
  });

  it('dispatches collectmenuDropdownClick on menu click', () => {
    const mockState = getMockState();
    store = mockStoreCreator(mockState);
    const { container } = render(
      <Provider store={store}>
        <Banner darkModeSwitch={false} />
      </Provider>
    );

    const menu = container.querySelector('.menu');
    fireEvent.click(menu);

    const actions = store.getActions();
    expect(actions[0]).toEqual(collectmenuDropdownClick());
  });

  it('passes darkModeSwitch and menuDropdownState to Menu', () => {
    const mockState = getMockState({ banner: { menuDropdown: true } });
    store = mockStoreCreator(mockState);
    render(
      <Provider store={store}>
        <Banner darkModeSwitch={true} />
      </Provider>
    );

    expect(Menu).toHaveBeenCalledWith(
      expect.objectContaining({
        darkModeSwitch: true,
        menuDropdownState: true,
      }),
      expect.anything()
    );
  });
});