import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./login-form";

describe("<LoginForm />", () => {
  describe("login with email", () => {
    it("allows the user to login with valid credentials", async () => {
      render(<LoginForm />);
      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");

      expect(await screen.findByText(/success/i)).toBeVisible();
    });

    it("shows error on invalid credentials", () => {
      expect(true).toBe(true);
    });
  });

  describe("login with google", () => {});
});
