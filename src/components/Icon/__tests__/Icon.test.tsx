import { act, render, screen } from "@testing-library/react";
import Icon, { IconName } from "../Icon";
import "@testing-library/jest-dom";

describe("Icon component", () => {
  it("renders the correct icon for each IconName", () => {
    const iconNames: IconName[] = [
      "plus", "arrowRight", "close", "user", "eye", "copy", "refresh",
      "groupOfUsers", "handTogether", "chartPie", "github", "linkedin",
      "chevronDown", "chevronUp"
    ];
    iconNames.forEach((name) => {
      act(() => {
        render(<Icon name={name} testID={`icon-${name}`} />);
      });
      expect(screen.getByTestId(`icon-${name}`)).toBeInTheDocument();
    });
  });

  it("applies the correct size and color", () => {
    act(() => {
      render(<Icon name="plus" size={32} color="#123456" testID="icon-plus" />);
    })
    const iconWrapper = screen.getByTestId("icon-plus");
    const icon = iconWrapper.firstChild;
    expect(icon).toHaveAttribute("color", "#123456");
    expect(icon).toHaveAttribute("height", "32");
    expect(icon).toHaveAttribute("width", "32");
  });

  it("applies custom className", () => {
    act(() => {
      render(<Icon name="user" className="custom-class" testID="icon-user" />);
    });
    const iconWrapper = screen.getByTestId("icon-user");
    const icon = iconWrapper.firstChild;
    expect(icon).toHaveClass("custom-class");
  });

  it("defaults to size 24 if not provided", () => {
    act(() => {
      render(<Icon name="eye" testID="icon-eye" />);
    });
    const iconWrapper = screen.getByTestId("icon-eye");
    const icon = iconWrapper.firstChild;
    expect(icon).toHaveAttribute("height", "24");
    expect(icon).toHaveAttribute("width", "24");
  });
});
