import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("User", () => {
  // test("renders heading", async () => {
  //   render(<App />);
  //   expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
  // });
  // test("renders a list of users", async () => {
  //   render(<App />);
  //   const users = await screen.findAllByRole("listitem");
  //   expect(users).toHaveLength(2);
  // });
  // --------------Login Page-----------------

  test("render login form", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("show error when fields are empty", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  test("show error when invalid email format", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "hhhd@fff",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: {
        value: "password123",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
  });

  test("show email when short password", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "abc@grr.la",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: {
        value: "pass",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("successfull login", () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "abc@grr.la",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: {
        value: "password",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
  });
});
