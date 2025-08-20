import { render, screen } from "@testing-library/react";
import { Footer } from "../footer";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 Planning Poker App. All rights reserved.")).toBeInTheDocument();
  });

  it("renders github and linkedin links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it("has correct styling classes", () => {
    render(<Footer />);
    const footer = screen.getByText("© 2025 Planning Poker App. All rights reserved.").closest("div");
    expect(footer).toHaveClass("bg-[#F3F8FE]");
    expect(footer).toHaveClass("px-20");
    expect(footer).toHaveClass("flex");
    expect(footer).toHaveClass("justify-between");
    expect(footer).toHaveClass("items-center");
    expect(footer).toHaveClass("py-6");
    expect(footer).toHaveClass("border-t");
    expect(footer).toHaveClass("border-gray-200");
  });

  it("renders copyright text with correct styling", () => {
    render(<Footer />);
    const copyrightText = screen.getByText("© 2025 Planning Poker App. All rights reserved.");
    expect(copyrightText).toHaveClass("text-gray-600");
    expect(copyrightText).toHaveClass("text-sm");
  });

  it("renders social links container with correct styling", () => {
    render(<Footer />);
    const socialContainer = screen.getAllByRole("link")[0].parentElement;
    expect(socialContainer).toHaveClass("flex");
    expect(socialContainer).toHaveClass("gap-4");
  });

  it("renders links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://github.com/malvezzidatr");
    expect(links[1]).toHaveAttribute("href", "https://www.linkedin.com/in/caiomalvezzi/");
  });
});
