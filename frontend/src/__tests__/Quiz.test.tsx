import { describe, test, expect, beforeEach, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest';
import Quiz from '../pages/quizpage/Quiz';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the GraphBackground to avoid rendering complex animations in tests
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

  test("renders the first question with all answer options", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Verify the question counter is displayed
    expect(screen.getByText("Pergunta 1 de 15")).toBeInTheDocument();

    // Verify all 5 answer options are rendered
    expect(screen.getByText("Super me identifico")).toBeInTheDocument();
    expect(screen.getByText("Me identifico")).toBeInTheDocument();
    expect(screen.getByText("Neutro")).toBeInTheDocument();
    expect(screen.getByText("Não me identifico")).toBeInTheDocument();
    expect(screen.getByText("Não me identifico de jeito nenhum")).toBeInTheDocument();
  });

  test("navigates back when back button is clicked", () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Find and click the back arrow button
    const backButton = screen.getAllByText("←")[0];
    fireEvent.click(backButton);

    // Verify navigate was called with the home path
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
