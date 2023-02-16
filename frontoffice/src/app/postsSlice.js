import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";

const name = "posts";

// Stato iniziale dei post
const initialState = {
  posts: [],
  loadingPosts: false,
  pageLoaded: false,
  post: {},
  loadingPost: false,
  categories: [],
  loadingCategories: false,
};

// Thunk per ottenere la lista dei post
export const getAllPosts = createAsyncThunk(
  `${name}/getAllPosts`,
  async ({ category = "" }) => {
    if (category === "all") category = "";
    const params = queryString.stringify({
      category,
    });
    const response = await fetch(`${baseApiUrl}/posts?${params}`);
    return await response.json();
  }
);

export const createPost = createAsyncThunk(
    `${name}/createPost`,
    async (data, thunkAPI) => {
        const user = thunkAPI.getState().auth.user;
        const response = await fetch(`${baseApiUrl}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
)

// Thunk per aggiornare un post
export const updatePost = createAsyncThunk(
  `${name}/updatePost`,
  async (data) => {
    // data =
    /* 
      {
        _id: ,
        text: ,
        category: ,
        createdAt: ,
        createdBy: ,
      }
       */
    if (data.category === "") data.category = "Eccolo Qua";
    const response = await fetch(`${baseApiUrl}/posts/${data["_id"]}`, {
      method: "POST",
      body: JSON.stringify({
        text: data.text,
        category: data.category,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
      }),
    });
    return await response.json();
  }
);

// Thunk per cancellare un post
export const deletePost = createAsyncThunk(
    `${name}/deletePost`,
    async ({ id }) => {
      const response = await fetch(`${baseApiUrl}/posts/${id}`, {
        method: "DELETE"
      });
      return await response.json();
    }
)

// Thunk per ottenere la lista dei post
export const getPostByID = createAsyncThunk(
  `${name}/getPostByID`,
  async ({ id = "" }) => {
    const response = await fetch(`${baseApiUrl}/posts/${id}`);
    return await response.json();
  }
);

// Thunk per ottenere la lista delle categorie dei post
export const getAllCategories = createAsyncThunk(
  `${name}/getAllCategories`,
  async () => {
    const response = await fetch(`${baseApiUrl}/posts?getCategories=true`);
    return await response.json();
  }
);

const postsSlice = createSlice({
  name,
  initialState,
  reducers: {
    firstLoad: (state) => {
      state.pageLoaded = true;
    },
    waitingGetAllPosts: (state) => {
      state.loadingPosts = true;
    },
    waitingGetAllCategories: (state) => {
      state.loadingCategories = true;
    },
    waitingGetPostById: (state) => {
      state.loadingPost = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loadingPosts = false;
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
        state.loadingPost = false
        state.posts.push(action.payload)
    })
    builder.addCase(getPostByID.fulfilled, (state, action) => {
      state.loadingPost = false;
      state.post = action.payload;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loadingCategories = false;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log("Post rimosso");
    });
  },
});

export const {
  waitingGetAllPosts,
  waitingGetAllCategories,
  waitingGetPostById,
  firstLoad,
} = postsSlice.actions;

export const posts = postsSlice.reducer;
