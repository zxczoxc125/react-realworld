import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("[LoginForm]", () => {
  it("id, password input이 존재", () => {
    const { container, unmount, getByRole } = render(<LoginForm />);
    expect(getByRole("input", { name: 'email' })).toBeInTheDocument();
    expect(getByRole("input", { name: 'password' })).toBeInTheDocument();
    unmount();
  });
});
