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
  errorMsg: ""
};

// Thunk per ottenere la lista dei post
export const getAllPosts = createAsyncThunk(
  `${name}/getAllPosts`,
  async ({ category = "", createdBy = "" }, thunkAPI) => {
    if (category === "all") category = "";
    const params = queryString.stringify({
      category,
      createdBy
    });
    const response = await fetch(`${baseApiUrl}/posts?${params}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
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
        if (!response.ok)
          return thunkAPI.rejectWithValue(await response.json())
        return response.json();
    }
)

// Thunk per aggiornare un post
export const updatePost = createAsyncThunk(
  `${name}/updatePost`,
  async (data, thunkAPI) => {
    if (data.category === "") data.category = "Eccolo Qua";
    const user = thunkAPI.getState().auth.user;
    const response = await fetch(`${baseApiUrl}/posts/${data["_id"]}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        text: data.text,
        category: data.category,
      }),
    });
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per cancellare un post
export const deletePost = createAsyncThunk(
    `${name}/deletePost`,
    async ({ id }, thunkAPI) => {
      const user = thunkAPI.getState().auth.user
      
      const response = await fetch(`${baseApiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok)
        return thunkAPI.rejectWithValue(await response.json())
      return response.json();
    }
)

// Thunk per ottenere la lista dei post
export const getPostByID = createAsyncThunk(
  `${name}/getPostByID`,
  async ({ id = "" }, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/posts/${id}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere la lista delle categorie dei post
export const getAllCategories = createAsyncThunk(
  `${name}/getAllCategories`,
  async (_, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/posts?getCategories=true`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
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
        state.posts.unshift(action.payload)
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
      state.pageLoaded = false
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.post = {}
      state.pageLoaded = false
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getPostByID.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
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
