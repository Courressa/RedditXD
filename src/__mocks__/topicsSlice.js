export const selectTopics = jest.fn().mockImplementation((state) => state.topics.sendTopics);
export const selectMainTopicsClick = jest.fn().mockImplementation((state) => state.topics.mainTopicClick);
export const selectListTopics = jest.fn().mockImplementation((state) => state.topics.listTopics || []);
export const loadTopics = jest.fn().mockReturnValue({ type: 'topics/loadTopics' });
export const collectFetchTopic = jest.fn().mockReturnValue({ type: 'topics/collectFetchTopic' });
export const collectMainTopicClick = jest.fn().mockReturnValue({ type: 'topics/collectMainTopicClick' });
