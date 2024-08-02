import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  selectedTeam: {
    label: Cookies.get('next-auth.session-name') || 'Fecstastic',
    picture: null,
    value: 'personal',
    role: 'USER',
  },
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setSelectedTeam: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedTeam = action.payload;
    },
  },
});

export const { setSelectedTeam } = teamSlice.actions;
export default teamSlice.reducer;
