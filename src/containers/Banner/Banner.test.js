import bannerSliceReducer, { collectUserSearch, collectUserSearchClick } from './bannerSlice';
import { render, screen, cleanup, waitFor } from '@testing-library/react';


afterEach(cleanup);

it('should handle initial state', () => {
    
    expect(bannerSliceReducer(undefined, { type: 'unknown' })).toEqual({
        userSearch: "",
        userSearchClick: false,
        darkMode: false,
    });
    
    
});

it('should handle collectUserSearch', () => {
    const initialState = {
        userSearch: "",
        userSearchClick: false,
        darkMode: false,
    };
    let state;
    state = bannerSliceReducer(initialState, {type:'banner/collectUserSearch', payload:'bts'});
    expect(state.userSearch).toEqual('bts');
})

it('should handle userSearchClick', () => {
    const initialState = {
        userSearch: "",
        userSearchClick: false,
        darkMode: false,
    };
    let state;
    state = bannerSliceReducer(initialState, {type:'banner/collectUserSearchClick'});
    expect(state.userSearchClick).toEqual(true);
})