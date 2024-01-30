import { render, screen } from "@testing-library/react";
import Inicio from "./init/index";

test("renders menu home", () => {
    render(<Inicio />);
    const linkElement = screen.getByText("Contato");
    expect(linkElement).toBeInTheDocument();
});
