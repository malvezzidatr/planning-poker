import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";
import "@testing-library/jest-dom";

describe("Input component", () => {
  it("renders with label and placeholder", () => {
    render(
      <Input
        value=""
        setValue={() => {}}
        labelText="Nome"
        placeholder="Digite seu nome"
      />
    );
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("calls setValue on change", async () => {
    const user = userEvent.setup();
    const setValue = jest.fn();
    render(
      <Input
        value=""
        setValue={setValue}
        placeholder="Digite"
      />
    );
    const input = screen.getByPlaceholderText("Digite");
    await user.type(input, "abc"); // sem act()
    expect(setValue).toHaveBeenCalledTimes(3);
  });

  it("renders with icon and calls onClickIcon", async () => {
    const user = userEvent.setup();
    const onClickIcon = jest.fn();
    render(
      <Input
        value=""
        setValue={() => {}}
        iconName="copy"
        onClickIcon={onClickIcon}
        placeholder="Com ícone"
      />
    );
    const iconBtn = screen.getByRole("button");
    expect(iconBtn).toBeInTheDocument();
    await user.click(iconBtn); // sem act()
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });

  it("applies full width when full prop is true", () => {
    render(
      <Input
        value=""
        setValue={() => {}}
        full
        placeholder="Full"
      />
    );
    const inputDiv = screen.getByPlaceholderText("Full").closest("div");
    expect(inputDiv).toHaveClass("w-full");
  });

  it("applies default width when full prop is false", () => {
    render(
      <Input
        value=""
        setValue={() => {}}
        placeholder="Default"
      />
    );
    const inputDiv = screen.getByPlaceholderText("Default").closest("div");
    expect(inputDiv).toHaveClass("w-[250px]");
  });

  it("input has correct classes", () => {
    render(
      <Input
        value=""
        setValue={() => {}}
        placeholder="Classe"
      />
    );
    const input = screen.getByPlaceholderText("Classe");
    expect(input).toHaveClass(
      "bg-red",
      "w-10/12",
      "h-full",
      "px-4",
      "placeholder",
      "text-[#9BA3AF]",
      "outline-0",
      "font-bold",
      "text-sm"
    );
  });
});
