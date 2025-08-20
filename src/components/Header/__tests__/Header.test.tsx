import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import "@testing-library/jest-dom";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders header title", () => {
    render(<Header />);
    expect(screen.getByText("Planning Poker")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Terms of Use")).toBeInTheDocument();
  });

  it("navigates to home when title is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByText("Planning Poker"));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it("navigates to home when Home link is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByText("Home"));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it("does not navigate when Terms of Use is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByText("Terms of Use"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("has correct header styling", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed");
    expect(header).toHaveClass("left-0");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("w-full");
    expect(header).toHaveClass("py-5");
    expect(header).toHaveClass("px-24");
    expect(header).toHaveClass("bg-[#f9FAFB]");
    expect(header).toHaveClass("shadow-md");
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("z-50");
    expect(header).toHaveClass("items-center");
    expect(header).toHaveClass("justify-between");
  });

  it("title has correct styling and cursor", () => {
    render(<Header />);
    const title = screen.getByText("Planning Poker");
    expect(title).toHaveClass("text-[#004593]");
    expect(title).toHaveClass("font-bold");
    expect(title).toHaveClass("text-xl");
    expect(title).toHaveClass("cursor-pointer");
  });

  it("navigation container has correct styling", () => {
    render(<Header />);
    const navContainer = screen.getByText("Home").parentElement;
    expect(navContainer).toHaveClass("text-black");
    expect(navContainer).toHaveClass("flex");
    expect(navContainer).toHaveClass("gap-8");
  });

  it("Home link has cursor pointer styling", () => {
    render(<Header />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("cursor-pointer");
  });

  it("Terms of Use does not have cursor pointer styling", () => {
    render(<Header />);
    const termsLink = screen.getByText("Terms of Use");
    expect(termsLink).not.toHaveClass("cursor-pointer");
  });
});
