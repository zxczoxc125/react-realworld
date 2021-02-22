import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInForm from "./SignInForm";

describe("[SignInForm]", () => {
  it("id, password input이 존재", () => {
    const { unmount, getByRole } = render(<SignInForm />);
    expect(getByRole("input", { name: "e-mail" })).toBeInTheDocument();
    expect(getByRole("input", { name: "password" })).toBeInTheDocument();
    expect(getByRole("button", { name: "sign-in" })).toBeInTheDocument();
    expect(getByRole("button", { name: "sign-up" })).toBeInTheDocument();
    unmount();
  });
});