import postsReducer from './postsSlice';
import { cleanup } from '@testing-library/react';


afterEach(cleanup);

it('should handle initial state', () => {
    expect(postsReducer(undefined, { type: 'unknown' })).toEqual({
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
    });
});

it('should handle loadPopular isLoading', () => {
    const initialState = {
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
    };
    let state;
    state = postsReducer(initialState, {type:'posts/loadPopular/pending',meta:{requestId:'1k5CGzrP0DBKIlwLBVuUH',requestStatus:'pending'}});
    expect(state.isLoading).toEqual(true);

});

it('should handle loadPopular hasError', () => {
    const initialState = {
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
    };
    let state;
    state = postsReducer(initialState, {type:'posts/loadPopular/rejected',meta:{requestId:'1k5CGzrP0DBKIlwLBVuUH',requestStatus:'rejected'}});
    expect(state.hasError).toEqual(true);
});

it ('mock data', () => {
    const initialState = {
        posts: [],
        isLoading: false,
        hasError: false,
        comments: {},
        commentsIsLoading: false,
        commentsHasError: false,
    };
    const mockData = {
            data:{
                author: "Nyx",
                id: "12345",
                post_hint:'image',
                media: {
                    reddit_video: {
                        bitrate_kbps: 2400,
                        fallback_url: "https://v.redd.it/g7w6upw509be1/DASH_720.mp4?source=fallback",
                        has_audio: true,
                        height: 1280,
                        width: 720,
                        scrubber_media_url: "https://v.redd.it/g7w6upw509be1/DASH_96.mp4",
                        dash_url: "https://v.redd.it/g7w6upw509be1/DASHPlaylist.mpd?a=1738715536%2CYzVjMWI3MjRjNDZkMjFkY2JkZDg2OTY2Y2E4YTM4NmZjMWY4MDE0YWI2YzU4M2QwNDViNWYyYmYxNGIyYTUxNw%3D%3D&amp;v=1&amp;f=sd",
                        duration: 8,
                        hls_url: "https://v.redd.it/g7w6upw509be1/HLSPlaylist.m3u8?a=1738715536%2CNzU4NGU3ZTM1YjM0NWJmOWUzNWU0YWM0ODZhOTdlYzc1ZGJhMzg3OWJhMTY3ZDM3OWMwNzIzMjRmMTIwOTFhZg%3D%3D&amp;v=1&amp;f=sd",
                        is_gif: false,
                        transcoding_status: "completed"
                    }
                },
                url: "https://v.redd.it/g7w6upw509be1",
                thumbnail: "https://external-preview.redd.it/aGRjYjFudTUwOWJlMROtOU_6Eys-jDLpxJ_EB_Bnu8LSL2n6xufyN2eZfV_5.png?width=140&amp;height=140&amp;crop=140:140,smart&amp;format=jpg&amp;v=enabled&amp;lthumb=true&amp;s=d70d38be5ee034909e84377dbb797edd36bf9627",
                selftext: "",
                created_utc: 1736114636,
                subreddit_name_prefixed: "r/Damnthatsinteresting",
                score: 10726,
                title: "The fake 'snow' used in Dawson's Creek",
                num_comments: 318,
            }

        }

    let state;
    state = postsReducer(initialState, {type:'posts/loadPopular/fulfilled',payload:mockData,meta:{requestId:'C9IEUxi5qRmL79QGSN4Dy',requestStatus:'fulfilled'}});
    expect(state.posts).toEqual(mockData);

    


})