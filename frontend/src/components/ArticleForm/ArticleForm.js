import { Button, Chip, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import fp from "lodash/fp";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import utils from "../../utils/utils";
import { BODY, DESCRIPTION, SUBMIT, TAGS, TITLE } from "../../i18n/constants";
import { articleActions } from "../../reducers/article/articleReducer";
import useStyles from "./ArticleForm.style";

const initFormData = {
  title: "",
  body: "",
  description: "",
  tag: "",
  tagList: [],
};

const ArticleForm = ({ article = initFormData }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ ...article, tag: "" });
  const dispatch = useDispatch();
  const {
    createArticle: { success },
  } = useSelector((rootReducer) => rootReducer.articleReducer);
  const { t } = useTranslation();

  const handleKeyPressTag = (e) => {
    const { tag, tagList } = formData;
    const newTag = fp.trim(tag);

    if (fp.isEqual(e.code, "Enter")) {
      e.preventDefault();
    }

    if (
      fp.isEqual(e.code, "Enter") &&
      !!newTag &&
      !fp.find(fp.isEqual(newTag), formData.tagList)
    ) {
      setFormData((prev) => ({
        ...prev,
        tag: "",
        tagList: [...tagList, newTag],
      }));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnDeleteTag = fp.curry((targetTag, e) => {
    setFormData((prev) => ({
      ...prev,
      tagList: fp.filter(fp.negate(fp.isEqual(targetTag)), prev.tagList),
    }));
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!article.slug) {
      dispatch(
        articleActions.CREATE_ARTICLE({
          articleInfo: formData,
        })
      );
    } else {
      dispatch(
        articleActions.UPDATE_ARTICLE({
          articleInfo: formData,
          slug: article.slug,
        })
      );
    }
  };

  useEffect(() => {
    if (success) {
      setFormData(article);
    }
  }, [success]);

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmitForm}
      aria-label="article"
    >
      <TextField
        inputProps={{ "aria-label": "title", role: "input" }}
        label={t(TITLE)}
        fullWidth
        onChange={utils.handleChangeTextField(setFormData, "title")}
        value={formData.title}
        margin="dense"
      />
      <TextField
        label={t(BODY)}
        multiline
        size="small"
        fullWidth
        rowsMax={4}
        rows={2}
        variant="filled"
        inputProps={{ role: "input", "aria-label": "body" }}
        onChange={utils.handleChangeTextField(setFormData, "body")}
        value={formData.body}
        margin="dense"
      />
      <TextField
        inputProps={{ "aria-label": "description", role: "input" }}
        label={t(DESCRIPTION)}
        fullWidth
        onChange={utils.handleChangeTextField(setFormData, "description")}
        value={formData.description}
        margin="dense"
      />
      <TextField
        inputProps={{ "aria-label": "tag-list", role: "input" }}
        label={t(TAGS)}
        fullWidth
        onChange={utils.handleChangeTextField(setFormData, "tag")}
        value={formData.tag}
        onKeyPress={handleKeyPressTag}
        margin="dense"
      />
      <div role="figure" aria-label="tag-list">
        {fp.map(
          (tag) => (
            <Chip
              key={tag}
              size="small"
              label={`#${tag}`}
              className={classes.margin_2}
              role="figure"
              aria-label="tag"
              onDelete={handleOnDeleteTag(tag)}
              deleteIcon={<CloseIcon role="button" aria-label="tag-delete" />}
            />
          ),
          formData.tagList
        )}
      </div>
      <div>
        <Button
          className={classes.margin}
          type="submit"
          variant="contained"
          color="primary"
          aria-label="submit"
          disabled={fp.some(fp.isEmpty, [
            formData.title,
            formData.body,
            formData.description,
          ])}
        >
          {t(SUBMIT)}
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;
