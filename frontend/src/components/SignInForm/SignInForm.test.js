import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { Provider } from "react-redux";
import SignInForm from "./SignInForm";
import utils from "../../utils/utils";
import userReducer, { userActions } from "../../reducers/user/userReducer";

describe("[SignInForm]", () => {
  beforeEach(() => {
    const store = createStore(userReducer);

    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
  });

  describe("UI 테스트", () => {
    it("폼 구성요소 테스트", () => {
      expect(screen.getByRole("input", { name: "e-mail" })).toBeInTheDocument();
      expect(
        screen.getByRole("input", { name: "password" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "sign-in" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "sign-up" })
      ).toBeInTheDocument();
    });
  });

  describe("UX 테스트", () => {
    it("최초 렌더링시 email 인풋에 포커싱", () => {
      expect(screen.getByRole("input", { name: "e-mail" })).toHaveFocus();
    });

    it("Sign in 클릭시, validate 함수를 호출한다.", () => {
      const mockCall = jest.spyOn(utils, "validate");

      userEvent.click(screen.getByRole("button", { name: "sign-in" }));
      expect(mockCall).toHaveBeenCalled();
    });
  });

  describe("상태 테스트", () => {
    describe("Sign in 버튼 클릭", () => {
      it("validate를 통과하지 못하면, user/AUTHENTICATION_FAILURE를 호출", () => {
        const mockCall = jest.spyOn(
          userActions,
          "AUTHENTICATION_FAILURE"
        );

        userEvent.click(screen.getByRole("button", { name: "sign-in" }));
        expect(mockCall).toHaveBeenCalled();
      });
    });

        const mockCall = jest.spyOn(userActions, "AUTHENTICATION");
        expect(mockCall).toHaveBeenCalled();
    });
  });
});
