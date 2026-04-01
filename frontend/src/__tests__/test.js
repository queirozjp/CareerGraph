import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quiz from "./Quiz";

// 1. Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// 2. Mock the GraphBackground to avoid rendering complex animations in tests
jest.mock("../../components/GraphBackground", () => () => <div data-testid="graph-background" />);

describe("Quiz Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the first question correctly on load", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Verify initial state
    expect(screen.getByText("Pergunta 1 de 10")).toBeInTheDocument();
    expect(
      screen.getByText("Tenho facilidade em resolver problemas usando lógica e raciocínio abstrato.")
    ).toBeInTheDocument();
    expect(screen.getByText("Super me identifico")).toBeInTheDocument();
  });

  test("advances to the next question when an option is clicked (handleAnswer)", async () => {
    // Enable fake timers to bypass the 350ms setTimeout
    jest.useFakeTimers();

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Click an answer option
    const answerButton = screen.getByText("Me identifico");
    fireEvent.click(answerButton);

    // Fast-forward time by 350ms
    jest.advanceTimersByTime(350);

    // Wait for the UI to update to Question 2
    await waitFor(() => {
      expect(screen.getByText("Pergunta 2 de 10")).toBeInTheDocument();
      expect(
        screen.getByText("Gosto de entender como as interfaces de aplicativos e sites são construídas.")
      ).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test("navigates to '/' when the back arrow is clicked on the first question (handleBack)", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    const backButton = screen.getByText("←");
    fireEvent.click(backButton);

    // Verify navigate was called with the root path
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test("toggles the animation paused state", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    const toggleButton = screen.getByText("Desativar animação");

    // Click to pause
    fireEvent.click(toggleButton);
    expect(screen.getByText("Ativar animação")).toBeInTheDocument();

    // Click to unpause
    fireEvent.click(screen.getByText("Ativar animação"));
    expect(screen.getByText("Desativar animação")).toBeInTheDocument();
  });
});