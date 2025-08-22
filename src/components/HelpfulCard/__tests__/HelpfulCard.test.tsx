import { render, screen } from "@testing-library/react";
import { HelpfulCard } from "../HelpfulCard";
import "@testing-library/jest-dom";

describe("HelpfulCard component", () => {
  it("renders title, description and icon", () => {
    render(
      <HelpfulCard
        iconName="arrowRight"
        title="Helpful Title"
        description="Some helpful description"
      />
    );
    expect(screen.getByText("Helpful Title")).toBeInTheDocument();
    expect(screen.getByText("Some helpful description")).toBeInTheDocument();
    const iconContainer = screen.getByText("Helpful Title").previousSibling?.firstChild;
    expect(iconContainer?.nodeName.toLowerCase()).toBe("span");
  });

  it("has correct container styling", () => {
    render(
      <HelpfulCard
        iconName="chartPie"
        title="Test"
        description="Desc"
      />
    );
    const container = screen.getByText("Test").closest("div");
    expect(container).toHaveClass("flex", "flex-col", "items-center", "bg-blue-100", "justify-center", "px-6", "py-10", "rounded-lg", "w-full", "max-w-sm");
  });

  it("renders icon container with correct styling", () => {
    render(
      <HelpfulCard
        iconName="chevronDown"
        title="Test"
        description="Desc"
      />
    );
    const iconDiv = screen.getByText("Test").previousSibling;
    expect(iconDiv).toHaveClass("w-14", "h-14", "bg-blue-200", "rounded-full", "flex", "items-center", "justify-center", "mb-4");
  });

  it("renders title with correct styling", () => {
    render(
      <HelpfulCard
        iconName="close"
        title="Test"
        description="Desc"
      />
    );
    const title = screen.getByText("Test");
    expect(title).toHaveClass("text-lg", "font-semibold", "mb-3");
  });

  it("renders description with correct styling", () => {
    render(
      <HelpfulCard
        iconName="copy"
        title="Test"
        description="Desc"
      />
    );
    const desc = screen.getByText("Desc");
    expect(desc).toHaveClass("text-sm", "text-gray-600", "text-center");
  });
});
