import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import "@testing-library/jest-dom";


jest.mock("../../Icon/Icon", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}));

describe("Button component", () => {
  it("renders with text", () => {
    render(<Button text="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    await user.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon when iconName is provided", () => {
    render(<Button text="With Icon" iconName="arrowRight" onClick={() => {}} />);
    expect(screen.getByTestId("icon")).toHaveTextContent("arrowRight");
  });

  it("applies outlined, full and textCenter classes", () => {
    render(
      <Button
        text="Styled"
        outlined
        full
        textCenter
        onClick={() => {}}
      />
    );
    const btn = screen.getByText("Styled").closest("button");
    expect(btn).toHaveClass("w-full");
    expect(btn).toHaveClass("justify-center");
    expect(btn).toHaveClass("border-2");
  });

  it("applies disabled class and prevents click", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button text="Disabled" disabled onClick={handleClick} />);
    const btn = screen.getByText("Disabled").closest("button");
    expect(btn).toHaveClass("cursor-not-allowed");
    await user.click(btn!);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
