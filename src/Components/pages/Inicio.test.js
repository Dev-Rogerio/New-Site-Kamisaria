import { render, screen } from "@testing-library/react";
import Inicio from "./inicio/index";

test("renders menu home", () => {
  render(<Inicio />);
  const linkElement = screen.getByText("Home");
  expect(linkElement).toBeInTheDocument();
});