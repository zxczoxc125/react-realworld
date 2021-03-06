import { createSlice } from "@reduxjs/toolkit";
import fp from "lodash/fp";

const initialState = {
  articles: [],
  articlesCount: 0,
  feeds: [],

  // [요청 관련상태]
  createArticle: { request: false, success: false, failure: "" },
  listArticles: { request: false, success: false, failure: "" },
  favoriteArticle: { request: false, success: false, failure: "" },
  unfavoriteArticle: { request: false, success: false, failure: "" },
  updateArticle: { request: false, success: false, failure: "" },
  deleteArticle: { request: false, success: false, failure: "" },
  feedArticles: { request: false, success: false, failure: "" },
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    CREATE_ARTICLE(state) {
      state.createArticle = { request: true, success: false, failure: "" };
    },
    CREATE_ARTICLE_SUCCESS(state, { payload: { article } }) {
      state.articlesCount++;
      state.articles = [article, ...state.articles];
      state.createArticle = { request: false, success: true, failure: "" };
    },
    CREATE_ARTICLE_FAILURE(state, { payload: { errors } }) {
      state.createArticle = {
        request: false,
        success: false,
        failure: errors,
      };
    },

    LIST_ARTICLES(state) {
      state.listArticles = { request: true, success: false, failure: "" };
    },
    LIST_ARTICLES_SUCCESS(state, { payload: { articles, articlesCount } }) {
      state.articles = [...state.articles, ...articles];
      state.articlesCount = articlesCount;
      state.listArticles = { request: false, success: true, failure: "" };
    },
    LIST_ARTICLES_FAILURE(state, { payload: { errors } }) {
      state.listArticles = {
        request: false,
        success: false,
        failure: errors,
      };
    },
    LIST_ARTICLES_INIT(state) {
      state.articles = [];
      state.articlesCount = 0;
    },

    FAVORITE_ARTICLE(state) {
      state.favoriteArticle = { request: true, success: false, failure: "" };
    },
    FAVORITE_ARTICLE_SUCCESS(state) {
      state.favoriteArticle = { request: false, success: true, failure: "" };
    },
    FAVORITE_ARTICLE_FAILURE(state, { payload: { errors } }) {
      state.favoriteArticle = {
        request: false,
        success: false,
        failure: errors,
      };
    },

    UNFAVORITE_ARTICLE(state) {
      state.unfavoriteArticle = { request: true, success: false, failure: "" };
    },
    UNFAVORITE_ARTICLE_SUCCESS(state) {
      state.unfavoriteArticle = { request: false, success: true, failure: "" };
    },
    UNFAVORITE_ARTICLE_FAILURE(state, { payload: { errors } }) {
      state.unfavoriteArticle = {
        request: false,
        success: false,
        failure: errors,
      };
    },

    UPDATE_ARTICLE(state) {
      state.updateArticle = { request: true, success: false, failure: "" };
    },
    UPDATE_ARTICLE_SUCCESS(state, { payload: { article } }) {
      state.articles = fp.map(
        (item) => (fp.isEqual(article.slug, item.slug) ? article : item),
        state.articles
      );
      state.updateArticle = {
        request: false,
        success: true,
        failure: "",
      };
    },
    UPDATE_ARTICLE_FAILURE(state, { payload: { errors } }) {
      state.updateArticle = {
        request: false,
        success: false,
        failure: errors,
      };
    },

    DELETE_ARTICLE(state) {
      state.deleteArticle = { request: true, success: false, failure: "" };
    },
    DELETE_ARTICLE_SUCCESS(state, { orgPayload: { slug } }) {
      state.articles = fp.filter(
        (item) => !fp.isEqual(slug, item.slug),
        state.articles
      );
      state.articlesCount--;
      state.deleteArticle = {
        request: false,
        success: true,
        failure: "",
      };
    },
    DELETE_ARTICLE_FAILURE(state, { payload: { errors } }) {
      state.deleteArticle = {
        request: false,
        success: false,
        failure: errors,
      };
    },

    FEED_ARTICLES(state) {
      state.feedArticles = { request: true, success: false, failure: "" };
    },
    FEED_ARTICLES_SUCCESS(state, { payload: { articles, articlesCount } }) {
      state.feeds = [...state.feeds, ...articles];
      state.feedsCount = articlesCount;
      state.feedArticles = { request: false, success: true, failure: "" };
    },
    FEED_ARTICLES_FAILURE(state, { payload: { errors } }) {
      state.feedArticles = {
        request: false,
        success: false,
        failure: errors,
      };
    },
    FEED_ARTICLES_INIT(state) {
      state.feeds = [];
      state.feedsCount = 0;
    },
  },
});

export const articleActions = articleSlice.actions;
export default articleSlice.reducer;
