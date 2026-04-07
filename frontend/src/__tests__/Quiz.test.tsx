import { describe, test, expect, beforeEach, beforeAll, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest';
import Quiz from '../pages/quizpage/Quiz';

// 1. Mock the useNavigate hook from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 2. Mock the GraphBackground to avoid rendering complex animations in tests
// Note: In Vitest (ESM), it is safest to explicitly mock the 'default' export
vi.mock("../../components/GraphBackground", () => ({
  default: () => <div data-testid="graph-background" />
}));

describe("Quiz Component", () => {
    beforeAll(() => {
        // Mocks the canvas context to prevent JSDOM crashes
        HTMLCanvasElement.prototype.getContext = vi.fn();
      });
  beforeEach(() => {
    vi.clearAllMocks();
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

/*
  test("advances to the next question when an option is clicked (handleAnswer)", async () => {
    // Enable fake timers to bypass the 350ms setTimeout
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Click an answer option
    const answerButtons = screen.getAllByText("Me identifico");
    fireEvent.click(answerButtons[0]); // Clicks the first one found

    // Fast-forward time by 350ms
    vi.advanceTimersByTime(350);

    // Wait for the UI to update to Question 2
    await waitFor(() => {
      expect(screen.getByText("Pergunta 2 de 10")).toBeInTheDocument();
      expect(
        screen.getByText("Gosto de entender como as interfaces de aplicativos e sites são construídas.")
      ).toBeInTheDocument();
    });

    vi.useRealTimers();
  });*/

  test("navigates to '/' when the back arrow is clicked on the first question (handleBack)", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    const backButton = screen.getAllByText("←");
    fireEvent.click(backButton[0]);

    // Verify navigate was called with the root path
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  /*
  test("toggles the animation paused state", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );
    //teste
    const toggleButton = screen.getAllByText("Desativar animação");

    // Click to pause
    fireEvent.click(toggleButton);
    expect(screen.getByText("Ativar animação")).toBeInTheDocument();

    // Click to unpause
    fireEvent.click(screen.getByText("Ativar animação"));
    expect(screen.getByText("Desativar animação")).toBeInTheDocument();
  });
*/
});
