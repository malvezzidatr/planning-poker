import { render, screen } from "@testing-library/react";

it("jsdom is working", () => {
  render(<div>jsdom ok</div>);
  expect(screen.getByText("jsdom ok")).toBeInTheDocument();
});
