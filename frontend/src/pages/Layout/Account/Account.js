import { Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountProfile from "../../../components/AccountProfile/AccountProfile";
import { articleActions } from "../../../reducers/article/articleReducer";
import { profileActions } from "../../../reducers/profile/profileReducer";

const Account = ({ username = "" }) => {
  const {
    profileReducer: { profile },
    articleReducer: { articles, articlesCount, feeds, feedsCount },
  } = useSelector((rootReducer) => rootReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(
        profileActions.GET_PROFILE({
          username,
        })
      );
      dispatch(articleActions.FEED_ARTICLES());
      dispatch(
        articleActions.LIST_ARTICLES({ queryParameters: { author: username } })
      );
    }
  }, [username]);

  return (
    <div>
      <AccountProfile
        profile={profile}
        articlesCount={articlesCount}
        feedsCount={feedsCount}
      />
      <Divider />
    </div>
  );
};

export default Account;
