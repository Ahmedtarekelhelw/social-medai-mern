import { createSlice, createAction } from "@reduxjs/toolkit";

const logout = createAction([`auth/setLogout`]);

const initialState = {
  posts: [],
  loading: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // post loading
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },

    // CRUD Operation in Posts
    addPost: (state, action) => {
      state.posts.unshift(action.payload.post);
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    updatePost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePost;
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.posts = [];
    });
  },
});

export const {
  addPost,
  setPosts,
  updatePost,
  deletePost,
  likePost,
  startLoading,
  endLoading,
} = postSlice.actions;

export default postSlice.reducer;

export const posts = (state) => state.posts;
