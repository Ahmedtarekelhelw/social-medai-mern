import { createSlice, createAction } from "@reduxjs/toolkit";

const login = createAction([`auth/setLogin`]);
const logout = createAction([`auth/setLogout`]);

const initialState = {
  user: null,
  searchUsers: [],
  friends: [],
  loadFriends: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    // loading
    startLoadFriends: (state) => {
      state.loadFriends = true;
    },
    endLoadFriends: (state) => {
      state.loadFriends = false;
    },

    // add and remove friend
    setUserFriends: (state, action) => {
      state.friends = action.payload;
    },

    // this make to solve problem in profile page to add or remove myself from  Users Frined List
    removeUserFriends: (state, action) => {
      state.friends = state.friends.filter((f) => f._id !== action.payload);
    },

    addUserFriends: (state, action) => {
      state.friends.push(action.payload);
    },

    // this  to add or remove frined to my friendlist
    setFriends: (state, action) => {
      if (state.user.friends.includes(action.payload)) {
        state.user.friends = state.user.friends.filter(
          (f) => f !== action.payload
        );
      } else {
        state.user.friends.push(action.payload);
      }
    },

    //Search
    setSearchUser: (state, action) => {
      state.searchUsers = action.payload.users;
    },

    //Update User Info
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout, (state) => {
        state.user = null;
        state.friends = [];
      });
  },
});

export const {
  setSearchUser,
  setFriends,
  updateUserInfo,
  startLoadFriends,
  endLoadFriends,
  setUserFriends,
  removeUserFriends,
  addUserFriends,
} = userSlice.actions;

export default userSlice.reducer;

export const users = (state) => state.users;
