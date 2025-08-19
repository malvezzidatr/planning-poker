import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateRoomModal } from "../CreateRoomModal";
import "@testing-library/jest-dom";

describe("CreateRoomModal component", () => {
  const defaultProps = {
    headerTitle: "Create New Room",
    headerDescription: "Set up your planning poker session",
    isOpen: true,
    onClose: jest.fn(),
    handlePress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when isOpen is true", () => {
    render(<CreateRoomModal {...defaultProps} />);
    expect(screen.getByText("Create New Room")).toBeInTheDocument();
    expect(screen.getByText("Set up your planning poker session")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<CreateRoomModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Create New Room")).not.toBeInTheDocument();
  });

  it("renders without description when not provided", () => {
    render(<CreateRoomModal {...defaultProps} headerDescription={undefined} />);
    expect(screen.getByText("Create New Room")).toBeInTheDocument();
    expect(screen.queryByText("Set up your planning poker session")).not.toBeInTheDocument();
  });

  it("calls onClose when close icon is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    await user.click(screen.getByTestId("icon-close"));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    await user.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("updates name input value", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText("Enter your name");
    await user.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");
  });

  it("renders with player role selected by default", () => {
    render(<CreateRoomModal {...defaultProps} />);
    const playerCard = screen.getByTestId("role-card-player");
    const spectatorCard = screen.getByTestId("role-card-spectator");
    expect(playerCard).toHaveAttribute("data-active", "true");
    expect(spectatorCard).toHaveAttribute("data-active", "false");
  });

  it("switches to spectator role when spectator card is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    const spectatorCard = screen.getByTestId("role-card-spectator");
    await user.click(spectatorCard);
    
    const playerCard = screen.getByTestId("role-card-player");
    expect(playerCard).toHaveAttribute("data-active", "false");
    expect(spectatorCard).toHaveAttribute("data-active", "true");
  });

  it("switches back to player role when player card is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    
    // First switch to spectator
    const spectatorCard = screen.getByTestId("role-card-spectator");
    await user.click(spectatorCard);
    
    // Then switch back to player
    const playerCard = screen.getByTestId("role-card-player");
    await user.click(playerCard);
    
    expect(playerCard).toHaveAttribute("data-active", "true");
    expect(spectatorCard).toHaveAttribute("data-active", "false");
  });

  it("calls handlePress with correct parameters when Create Room is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText("Enter your name");
    await user.type(nameInput, "John Doe");
    
    await user.click(screen.getByText("Create Room"));
    
    expect(defaultProps.handlePress).toHaveBeenCalledWith("John Doe", "player");
  });

  it("calls handlePress with spectator role when spectator is selected", async () => {
    const user = userEvent.setup();
    render(<CreateRoomModal {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText("Enter your name");
    await user.type(nameInput, "Jane Doe");
    
    const spectatorCard = screen.getByTestId("role-card-spectator");
    await user.click(spectatorCard);
    
    await user.click(screen.getByText("Create Room"));
    
    expect(defaultProps.handlePress).toHaveBeenCalledWith("Jane Doe", "spectator");
  });

  it("renders voting card type section", () => {
    render(<CreateRoomModal {...defaultProps} />);
    expect(screen.getByText("Voting Cards Type *")).toBeInTheDocument();
    expect(screen.getByTestId("voting-card-type")).toBeInTheDocument();
  });

  it("renders role selection section", () => {
    render(<CreateRoomModal {...defaultProps} />);
    expect(screen.getByText("Your role *")).toBeInTheDocument();
    expect(screen.getByTestId("role-card-player")).toBeInTheDocument();
    expect(screen.getByTestId("role-card-spectator")).toBeInTheDocument();
  });
});
