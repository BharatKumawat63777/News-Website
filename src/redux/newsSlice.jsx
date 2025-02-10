import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Key
const API_KEY = import.meta.env.VITE_API_KEY;

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (params, { getState }) => {
    const { country, category, pageSize, page } = getState().news;
    console.log("Before url fatching data: ", API_KEY);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("after fetching data: ", url, response.data);

    return response.data;
  }
);

// Create slice for news
const newsSlice = createSlice({
  name: "news",
  initialState: {
    country: "us",
    category: "science",
    pageSize: 6,
    page: 1,
    articles: [],
    totalResults: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCountry, setCategory, setPageSize, setPage } =
  newsSlice.actions;
export default newsSlice.reducer;
