import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import fp from "lodash/fp";
import rootReducer from "../../reducers/rootReducer";
import Profile from "./Profile";

describe("[Profile]", () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <Profile
          open={true}
          setOpen={fp.noop}
          anchorEl={document.createElement("button")}
        />
      </Provider>
    );
  });

  describe("UI 테스트", () => {
    it("구성요소 테스트", () => {
      expect(screen.getByRole("figure", { name: "email" })).toBeInTheDocument();
      expect(
        screen.getByRole("figure", { name: "username" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "sign-out" })
      ).toBeInTheDocument();
    });
  });
});
