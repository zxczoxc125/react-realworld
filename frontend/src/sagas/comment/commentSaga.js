import { all } from "redux-saga/effects";
import comment_service from "../../apis/comment/comment_service";
import { commentActions } from "../../reducers/comment/commentReducer";
import utils from "../../utils/utils";

export default function* commentSaga() {
  yield all([
    utils.watchSaga(
      commentActions.GET_COMMENTS_FROM_AN_ARTICLE.type,
      comment_service.getCommentsFromAnArticle
    ),
    utils.watchSaga(
      commentActions.ADD_COMMENTS_TO_AN_ARTICLE.type,
      comment_service.addCommentsToAnArticle
    ),
    utils.watchSaga(
      commentActions.DELETE_COMMENTS.type,
      comment_service.deleteComment
    ),
  ]);
}
