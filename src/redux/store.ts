import { configureStore } from '@reduxjs/toolkit';

import teamReducer from './team-slice';

const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});

export default store;
