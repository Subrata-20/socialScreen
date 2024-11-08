import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import achievementsSlice from './achievements/achievementsSlice';
import rewardsSlice from './rewards/rewardsSlice';
import screen_time_recommendationsSlice from './screen_time_recommendations/screen_time_recommendationsSlice';
import sentiment_check_insSlice from './sentiment_check_ins/sentiment_check_insSlice';
import tasksSlice from './tasks/tasksSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    achievements: achievementsSlice,
    rewards: rewardsSlice,
    screen_time_recommendations: screen_time_recommendationsSlice,
    sentiment_check_ins: sentiment_check_insSlice,
    tasks: tasksSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
