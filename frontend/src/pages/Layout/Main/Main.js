import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fp from "lodash/fp";
import ArticleForm from "../../../components/ArticleForm/ArticleForm";
import { articleActions } from "../../../reducers/article/articleReducer";
import IntersectionObserver from "../../../components/IntersectionObserver/IntersectionObserver";
import ArticleList from "../../../components/ArticleList/ArticleList";
import useStyles from "./Main.style";

const LIMIT = 5;

const Main = () => {
  const dispatch = useDispatch();
  const { articles, articlesCount } = useSelector(
    (rootReducer) => rootReducer.articleReducer
  );
  const classes = useStyles();
  const [offset, setOffset] = useState(-1);

  const dispatchListArticle = (articlesLength) => {
    const nextOffset = offset + 1;

    dispatch(
      articleActions.LIST_ARTICLES({
        queryParameters: {
          limit: LIMIT,
          offset: articlesLength,
        },
      })
    );
    setOffset(nextOffset);
  };

  useEffect(() => {
    dispatchListArticle(0);

    return () => {
      dispatch(articleActions.LIST_ARTICLES_INIT());
    };
  }, []);

  return (
    <div className={classes.root}>
      <ArticleForm />

      <ArticleList articles={articles} />

      {!fp.isEmpty(articles) && articlesCount > articles.length && (
        <IntersectionObserver
          next={() => dispatchListArticle(articles.length)}
        />
      )}
    </div>
  );
};

export default Main;
