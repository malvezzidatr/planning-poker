import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "../Card";
import "@testing-library/jest-dom";

describe("Card component", () => {
  it("renders with value", () => {
    render(<Card value="5" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Card value="8" onClick={handleClick} />);
    await user.click(screen.getByText("8"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when no onClick is provided", async () => {
    const user = userEvent.setup();
    render(<Card value="13" />);
    await user.click(screen.getByText("13"));
  });

  it("applies selected styles when card is selected", () => {
    render(<Card value="3" selectedCard="3" />);
    const cardDiv = screen.getByText("3").closest("div");
    expect(cardDiv).toHaveClass("bg-blue-50");
    expect(cardDiv).toHaveClass("border-blue-500");
    
    const text = screen.getByText("3");
    expect(text).toHaveClass("text-blue-500");
  });

  it("applies unselected styles when card is not selected", () => {
    render(<Card value="5" selectedCard="8" />);
    const cardDiv = screen.getByText("5").closest("div");
    expect(cardDiv).toHaveClass("bg-white");
    expect(cardDiv).toHaveClass("border-gray-200");
    expect(cardDiv).toHaveClass("hover:bg-blue-50");
    expect(cardDiv).toHaveClass("hover:border-blue-500");
    
    const text = screen.getByText("5");
    expect(text).toHaveClass("group-hover:text-blue-500");
  });

  it("applies default styles when no selectedCard is provided", () => {
    render(<Card value="1" />);
    const cardDiv = screen.getByText("1").closest("div");
    expect(cardDiv).toHaveClass("bg-white");
    expect(cardDiv).toHaveClass("border-gray-200");
    expect(cardDiv).toHaveClass("hover:bg-blue-50");
    expect(cardDiv).toHaveClass("hover:border-blue-500");
  });

  it("has correct base styling classes", () => {
    render(<Card value="21" />);
    const cardDiv = screen.getByText("21").closest("div");
    expect(cardDiv).toHaveClass("group");
    expect(cardDiv).toHaveClass("cursor-pointer");
    expect(cardDiv).toHaveClass("transition");
    expect(cardDiv).toHaveClass("w-24");
    expect(cardDiv).toHaveClass("h-32");
    expect(cardDiv).toHaveClass("rounded-lg");
    expect(cardDiv).toHaveClass("shadow-md");
    expect(cardDiv).toHaveClass("flex");
    expect(cardDiv).toHaveClass("items-center");
    expect(cardDiv).toHaveClass("justify-center");
    expect(cardDiv).toHaveClass("border-2");
  });

  it("renders text with correct styling", () => {
    render(<Card value="?" />);
    const text = screen.getByText("?");
    expect(text).toHaveClass("text-3xl");
    expect(text).toHaveClass("font-bold");
  });
});
