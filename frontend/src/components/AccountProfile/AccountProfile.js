import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import { useSelector } from "react-redux";
import fp from "lodash/fp";
import useStyles from "./AccountProfile.style";

const AccountProfile = ({
  profile = {},
  articlesCount = 0,
  feedsCount = 0,
}) => {
  const classes = useStyles();
  const {
    user: { username },
  } = useSelector((rootReducer) => rootReducer.userReducer);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={4} className={classes.left}>
        <Button
          role="figure"
          aria-label="image"
          color="inherit"
          className={classes.imageWrapper}
        >
          {profile.image ? (
            <CardMedia className={classes.cover} image={profile.image} />
          ) : (
            <AccountCircleIcon
              fontSize="large"
              className={classes.cover}
              color="primary"
            />
          )}
        </Button>
      </Grid>
      <Grid item xs={8}>
        <section className={classes.info}>
          <div className={classes.infoTop}>
            <Typography
              variant="h5"
              component="h1"
              role="figure"
              aria-label="username"
            >
              {profile.username}
            </Typography>

            {fp.isEqual(username, profile.username) && (
              <Button
                variant="outlined"
                color="primary"
                className={classes.editProfile}
                aria-label="edit"
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className={classes.active}>
            <Typography
              variant="body1"
              component="h4"
              className={classes.activeDetail}
              role="figure"
              aria-label="article-count"
            >
              <span className={classes.activeDetailHeader}>Articles</span>{" "}
              {articlesCount}
            </Typography>
            {fp.isEqual(username, profile.username) && (
              <Typography
                variant="body1"
                component="h4"
                className={classes.activeDetail}
                role="figure"
                aria-label="feed-count"
              >
                <span className={classes.activeDetailHeader}>Feeds</span>{" "}
                {feedsCount}
              </Typography>
            )}
          </div>
        </section>
      </Grid>
    </Grid>
  );
};

export default AccountProfile;
