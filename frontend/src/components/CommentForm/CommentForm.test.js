import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { commentActions } from "../../reducers/comment/commentReducer";
import CommentForm from "./CommentForm";
import rootReducer from "../../reducers/rootReducer";

describe("[CommentForm]", () => {
  beforeEach(() => {
    render(
      <Provider store={createStore(rootReducer)}>
        <CommentForm article={{}} />
      </Provider>
    );
  });

  describe("UI 테스트", () => {
    it("body input과 submit 버튼이 존재한다.", () => {
      expect(screen.getByRole("input", { name: "body" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "submit" })
      ).toBeInTheDocument();
    });
  });

  describe("UX 테스트", () => {
    it("body 내용이 없으면(기본상태) submit 버튼은 비활성화", () => {
      expect(screen.getByRole("button", { name: "submit" })).toBeDisabled();
    });

    it("body 내용이 있으면 submit 버튼은 활성화", () => {
      fireEvent.change(screen.getByRole("input", { name: "body" }), {
        target: { value: "test-comment" },
      });
      expect(screen.getByRole("button", { name: "submit" })).toBeEnabled();
    });
  });

  describe("상태 테스트", () => {
    it(`폼이 제출되면 ${commentActions.ADD_COMMENTS_TO_AN_ARTICLE.type}이 호출된다.`, () => {
      const mockCall = jest.spyOn(commentActions, "ADD_COMMENTS_TO_AN_ARTICLE");

      fireEvent.change(screen.getByRole("input", { name: "body" }), {
        target: { value: "test-comment" },
      });
      userEvent.click(screen.getByRole("button", { name: "submit" }));
      expect(mockCall).toHaveBeenCalled();
    });
  });
});
