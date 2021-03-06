import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: red[500],
  },
  margin_2: {
    margin: 2,
  },
  noPaddingVertical: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  padding_bottom_10: {
    paddingBottom: "10px !important",
  },
  // TODO: 프로필 사진 관련 컴포넌트로 빼기
  // 바깥 영역 너비에 맞게
  cover: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overflowWrap: {
    overflowWrap: "anywhere",
  },
}));

export default useStyles;
