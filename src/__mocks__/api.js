export const getPopular = jest.fn().mockResolvedValue([]);
export const getPostBasedOnTopic = jest.fn().mockResolvedValue([]);
export const getSearch = jest.fn().mockResolvedValue([]);
export const getCommentListForPost = jest.fn().mockResolvedValue({ postId: '1', comments: [] });
export const getTopics = jest.fn().mockResolvedValue([
  { data: { display_name: 'Home' } },
  { data: { display_name: 'Popular' } },
]);