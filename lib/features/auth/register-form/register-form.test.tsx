import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./register-form";

describe("<RegisterForm />", () => {
  describe("register with email", () => {
    it("allows the user to register with email and password", async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");
      await userEvent.type(screen.getByLabelText("Password"), "password");
      await userEvent.type(
        screen.getByLabelText("Confirm Password"),
        "password"
      );

      await screen.findByText(/success/i);
    });

    it("shows error on missing password", async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");

      expect(await screen.findByText(/required/i)).toBeVisible();
    });
  });
});
