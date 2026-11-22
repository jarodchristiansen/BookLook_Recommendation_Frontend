import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicDataDisplay from "@/components/cards/DynamicDataDisplay";
import { install as installFetchOverlay } from "@/test/mocks/fetchOverlay";
import { recommendedBooks } from "@/test/fixtures/books";

describe("DynamicDataDisplay Component", () => {
  beforeEach(() => {
    installFetchOverlay();
  });

  const defaultProps = {
    endpoint: "/api/recommendations?work_id=OL1W",
    type: "book-recommendations" as const,
    selectedItems: [],
    onSelectItems: jest.fn(),
    onClearSelection: jest.fn(),
  };

  it("fetches and renders RecommendCardGrid when type is book-recommendations", async () => {
    render(<DynamicDataDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });
    expect(screen.getByText("Book Two")).toBeInTheDocument();
  });

  it("shows a loading spinner while fetching", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ recommendations: recommendedBooks, fallback_used: false }),
              }),
            50,
          ),
        ),
    );

    render(<DynamicDataDisplay {...defaultProps} />);

    expect(
      screen.getByText(/Finding books that match your taste/i),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });
  });

  it("renders RecommendCardGrid when type is recommendations", async () => {
    const props = { ...defaultProps, type: "recommendations" as const };

    render(<DynamicDataDisplay {...props} />);

    await waitFor(() => {
      expect(screen.getByText("Author One")).toBeInTheDocument();
    });
  });

  it("handles error state", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Failed to fetch data" }),
    });

    render(<DynamicDataDisplay {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    });
    expect(
      screen.queryByText(/Finding books that match your taste/i),
    ).not.toBeInTheDocument();
  });

  it("handles item click and selection", async () => {
    const mockOnSelectItems = jest.fn();

    render(
      <DynamicDataDisplay
        {...defaultProps}
        onSelectItems={mockOnSelectItems}
        selectedItems={[]}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Book One")).toBeInTheDocument();
    });

    const bookOne = screen.getByText("Book One").closest("button");
    fireEvent.click(bookOne!);

    expect(mockOnSelectItems).toHaveBeenCalled();
  });

  it("displays Clear Selection button when there are selected items", async () => {
    const selectedItems = [
      { work_id: "1", title: "Book One", author_name: "Author One" },
    ];

    render(
      <DynamicDataDisplay
        {...defaultProps}
        selectedItems={selectedItems}
        onClearSelection={defaultProps.onClearSelection}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Clear Selection")).toBeInTheDocument();
    });

    const clearButton = screen.getByText("Clear Selection");
    fireEvent.click(clearButton);

    expect(defaultProps.onClearSelection).toHaveBeenCalled();
  });

  it.each([
    [{ tier: 1, fallback_used: false }, false],
    // Tier 2 is a vector search on a fresh embedding, not a broadened match.
    [{ tier: 2, fallback_used: true }, false],
    [{ tier: 3, fallback_used: true }, true],
    [{ fallback_used: true }, true],
  ])("reports a broadened match from the tier: %j", async (meta, broadened) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ recommendations: recommendedBooks, ...meta }),
    });
    const setFallbackUsed = jest.fn();

    render(<DynamicDataDisplay {...defaultProps} setFallbackUsed={setFallbackUsed} />);

    await waitFor(() => expect(setFallbackUsed).toHaveBeenCalledWith(broadened));
  });

  it("shows the API's similarity as the match score", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ recommendations: [{ ...recommendedBooks[0], similarity: 0.874 }], tier: 1 }),
    });

    render(<DynamicDataDisplay {...defaultProps} />);

    expect(await screen.findByText("87% match")).toBeInTheDocument();
  });
});
