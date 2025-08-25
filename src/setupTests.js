// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
jest.mock('hls.js', () => ({
  isSupported: jest.fn().mockReturnValue(false),
}));
jest.mock('./api/api', () => ({
  getPopular: jest.fn().mockResolvedValue([]),
  getPostBasedOnTopic: jest.fn().mockResolvedValue([]),
  getSearch: jest.fn().mockResolvedValue([]),
  getCommentListForPost: jest.fn().mockResolvedValue({ postId: '1', comments: [] }),
  getTopics: jest.fn().mockResolvedValue([
    { data: { display_name: 'Home' } },
    { data: { display_name: 'Popular' } },
  ]),
}));