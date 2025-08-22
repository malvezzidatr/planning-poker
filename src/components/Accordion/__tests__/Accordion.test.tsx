import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "../Accordion";
import "@testing-library/jest-dom";
import { act } from "react";

describe("Accordion component", () => {
  const question = "What is Planning Poker?";
  const answer = "Planning Poker is an agile estimation technique.";

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("renders question", () => {
    render(<Accordion question={question} answer={answer} />);
    expect(screen.getByText(question)).toBeInTheDocument();
  });

  it("does not show answer by default", () => {
    render(<Accordion question={question} answer={answer} />);
    const answerEl = screen.queryByText(answer);
    expect(answerEl).not.toBeInTheDocument();
  });

  it("shows answer when clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion question={question} answer={answer} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText(answer)).toBeInTheDocument();
  });

  it("hides answer when clicked twice", async () => {
    const user = userEvent.setup();
    render(<Accordion question={question} answer={answer} />);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(screen.getByText(answer)).toBeInTheDocument();
    await act(async () => {
      await user.click(btn);
      await new Promise((r) => setTimeout(r, 250));
    });
    expect(screen.queryByText(answer)).not.toBeInTheDocument();
  });

  it("button has correct styling", () => {
    render(<Accordion question={question} answer={answer} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("w-full", "p-4", "flex", "justify-between", "items-center", "cursor-pointer", "transition", "hover:bg-blue-200");
  });

  it("container has correct styling", () => {
    render(<Accordion question={question} answer={answer} />);
    const container = screen.getByRole("button").parentElement;
    expect(container).toHaveClass("w-full", "bg-blue-100", "rounded-lg", "overflow-hidden");
  });

  it("renders Icon inside button", () => {
    render(<Accordion question={question} answer={answer} />);
    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
