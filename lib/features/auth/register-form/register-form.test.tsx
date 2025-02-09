import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./register-form";

describe("<RegisterForm />", () => {
  describe("register with email", () => {
    it("allows the user to register with email", async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");

      await screen.findByText(/success/i);
    });

    it("shows error", async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");

      expect(await screen.findByText(/required/i)).toBeVisible();
    });
  });
});
