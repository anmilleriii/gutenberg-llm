import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./register-form";

describe("<RegisterForm />", () => {
  describe("register with email", () => {
    it("allows the user to register with their email", async () => {
      render(<RegisterForm />);

      userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");
      await userEvent.click(screen.getByRole("button", { name: "Register" }));

      await screen.findByText(/Please check for a link at test@gmail.com/i);
    });

    it("shows error", async () => {
      render(<RegisterForm />);

      await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");

      expect(await screen.findByText(/required/i)).toBeVisible();
    });
  });
});
