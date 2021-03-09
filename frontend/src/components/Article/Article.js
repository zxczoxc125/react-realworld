import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Button, Chip, TextField } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./Article.style";

const Article = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          //  <Avatar aria-label="recipe" className={classes.avatar}>
          //    R
          //  </Avatar>
          <Button
            aria-label="author"
            color="inherit"
            // onClick={handleClickSignOutIcon}
          >
            <AccountCircleIcon fontSize="large" />
          </Button>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        aria-label="info"
        role="header"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          role="figure"
          aria-label="body"
        >
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardContent className={classes.noPaddingVertical}>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          role="figure"
          aria-label="description"
        >
          this is description
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.noPaddingVertical}>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <CardContent className={classes.noPaddingVertical}>
        <Typography
          variant="body2"
          component="p"
          role="figure"
          aria-label="number-of-likes"
        >
          likes 111
        </Typography>
      </CardContent>
      <CardContent role="figure" aria-label="tags">
        <Chip size="small" label="#Basic" className={classes.margin_1} />
      </CardContent>
      <CardContent
        role="figure"
        aria-label="comments"
        className={classes.noPaddingVertical}
      >
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </Typography>
      </CardContent>
      <CardContent>
        <TextField
          label="Add a comment.."
          multiline
          size="small"
          fullWidth
          rowsMax={4}
          variant="filled"
          inputProps={{ role: "input", "aria-label": "add-comment" }}
        />
      </CardContent>
    </Card>
  );
};

export default Article;